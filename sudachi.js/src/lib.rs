use napi_derive;

// for quick testing of napi workflow
#[napi_derive::napi]
pub fn add(x: i32, y: i32) -> i32 {
    x + y
}

pub mod sudachi_js;
