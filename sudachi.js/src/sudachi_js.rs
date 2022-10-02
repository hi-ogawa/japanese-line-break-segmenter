use std::path::PathBuf;

use napi::bindgen_prelude::{Error, Result, Status};
use napi_derive::napi;
use sudachi::analysis::stateful_tokenizer::StatefulTokenizer;
use sudachi::config::Config;
use sudachi::dic::dictionary::JapaneseDictionary;
use sudachi::prelude::Mode;

#[napi]
pub struct SudachiJs {
    analyzer: StatefulTokenizer<JapaneseDictionary>,
}

#[napi]
impl SudachiJs {
    #[napi(factory)]
    pub fn create(
        config_file: Option<String>,
        resource_dir: Option<String>,
        dictionary_path: Option<String>,
        mode: Option<String>,
    ) -> Result<Self> {
        //
        // initialize dictionary
        //
        let config = Config::new(
            config_file.map(PathBuf::from),
            resource_dir.map(PathBuf::from),
            dictionary_path.map(PathBuf::from),
        )
        .map_err(to_generic_failure)?;

        let dict = JapaneseDictionary::from_cfg(&config).map_err(to_generic_failure)?;

        //
        // initialize analyzer
        //
        let split_mode: Mode = mode
            .unwrap_or("C".to_string())
            .parse()
            .map_err(to_generic_failure)?;
        let analyzer = StatefulTokenizer::create(dict, false, split_mode);

        Ok(Self { analyzer })
    }

    #[napi]
    pub fn run(&mut self, input: String) -> Result<String> {
        self.analyzer.reset().push_str(&input);
        self.analyzer.do_tokenize().map_err(to_generic_failure)?;
        todo!()
    }

    #[napi]
    pub fn destroy(&self) {
        todo!()
    }
}

//
// napi utils
//

fn to_generic_failure<T: ToString>(e: T) -> Error {
    Error::new(Status::GenericFailure, e.to_string())
}
