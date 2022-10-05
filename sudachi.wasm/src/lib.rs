use serde::{Deserialize, Serialize};
use sudachi::analysis::Tokenize;
use sudachi::config::Config;
use sudachi::dic::character_category::CharacterCategory;
use sudachi::dic::lexicon_set::LexiconSet;
use sudachi::dic::storage::{Storage, SudachiDicData};
use sudachi::dic::{DictionaryLoader, LoadedDictionary};
use sudachi::plugin::Plugins;
use sudachi::prelude::SudachiError;
use sudachi::{
    analysis::stateless_tokenizer::StatelessTokenizer, dic::dictionary::JapaneseDictionary,
    prelude::Mode,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn tokenize(input: String) -> Result<JsValue, JsValue> {
    // initialize dictionary
    let dict = create_dictionary().map_err(serde_wasm_bindgen::Error::new)?;

    // tokenize
    let tokenizer = StatelessTokenizer::new(&dict);
    let morphemes = tokenizer
        .tokenize(&input, Mode::C, false)
        .map_err(serde_wasm_bindgen::Error::new)?;

    // covert to js value
    let result: Vec<MorphemeJs> = morphemes
        .iter()
        .map(|m| MorphemeJs {
            surface: m.surface().to_string(),
            part_of_speech: m.part_of_speech().iter().map(|v| v.to_string()).collect(),
            normalized_form: m.normalized_form().to_string(),
        })
        .collect();
    Ok(serde_wasm_bindgen::to_value(&result)?)
}

#[derive(Serialize, Deserialize)]
pub struct MorphemeJs {
    pub surface: String,
    pub part_of_speech: Vec<String>,
    pub normalized_form: String,
}

// TODO: make it loadable from js (hopefully without copy)
const SYSTEM_DICT_DATA: &[u8] = include_bytes!("../../sudachi.js/resources/system.dic");
const CHARACTER_DEFINITION_DATA: &[u8] = include_bytes!("../../sudachi.js/resources/char.def");

// create dictionary without accessing file system
fn create_dictionary() -> Result<JapaneseDictionary, SudachiError> {
    let storage = SudachiDicData::new(Storage::Borrowed(SYSTEM_DICT_DATA));
    let dict_data = unsafe { storage.system_static_slice() }; // get along with sudachi.rs's borrow hack
    let character_category_data = CHARACTER_DEFINITION_DATA;

    // https://github.com/hi-ogawa/sudachi.rs/blob/f24627e74e79f597e3596cd148567c968cfa0230/sudachi/src/dic/mod.rs#L55
    let mut loaeded_dictionary = {
        let dictionary_loader = DictionaryLoader::read_system_dictionary(dict_data)?;
        let character_category = CharacterCategory::from_reader(character_category_data)?;

        let mut grammar = dictionary_loader
            .grammar
            .ok_or(SudachiError::InvalidDictionaryGrammar)?;
        grammar.set_character_category(character_category);

        let num_system_pos = grammar.pos_list.len();
        let loaeded_dictionary = LoadedDictionary {
            grammar,
            lexicon_set: LexiconSet::new(dictionary_loader.lexicon, num_system_pos),
        };
        loaeded_dictionary
    };

    // https://github.com/hi-ogawa/sudachi.rs/blob/f24627e74e79f597e3596cd148567c968cfa0230/sudachi/src/config.rs#L268
    let config = {
        let mut config = Config::default();
        config.oov_provider_plugins = vec![serde_json::json!(
            {
            "class": "com.worksap.nlp.sudachi.SimpleOovPlugin",
            "oovPOS": ["名詞", "普通名詞", "一般", "*", "*", "*"],
            "leftId": 0,
            "rightId": 0,
            "cost": 30000
            }
        )];
        config
    };

    // https://github.com/hi-ogawa/sudachi.rs/blob/f24627e74e79f597e3596cd148567c968cfa0230/sudachi/src/dic/dictionary.rs#L79
    let plugins = Plugins::load(&config, &mut loaeded_dictionary.grammar)?;

    if plugins.oov.is_empty() {
        return Err(SudachiError::NoOOVPluginProvided);
    }

    for plugin in plugins.connect_cost.plugins() {
        plugin.edit(&mut loaeded_dictionary.grammar);
    }

    let dict = JapaneseDictionary {
        storage,
        plugins,
        _grammar: loaeded_dictionary.grammar,
        _lexicon: loaeded_dictionary.lexicon_set,
    };

    Ok(dict)
}
