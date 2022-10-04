use serde::{Deserialize, Serialize};
use sudachi::dic::dictionary::JapaneseDictionary;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}

#[wasm_bindgen]
pub fn run_example(_input: String) -> Result<JsValue, JsValue> {
    let _dict = create_dictionary();
    let result = ExampleResult(vec![]);
    Ok(serde_wasm_bindgen::to_value(&result)?)
}

#[derive(Serialize, Deserialize)]
struct ExampleResult(Vec<Morpheme>);

#[derive(Serialize, Deserialize)]
pub struct Morpheme {
    pub surface: String,
    pub part_of_speech: Vec<String>,
    pub normalized_form: String,
}

pub fn create_dictionary() -> JapaneseDictionary {
    todo!()
}
