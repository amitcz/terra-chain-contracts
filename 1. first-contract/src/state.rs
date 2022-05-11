use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::Addr;
use cw_storage_plus::Item;


/**
   1. Enables serialization and deserialization.
   2. Enables struct Copyable.
   3. Debig enables the struct to be printed to string.
   4. PartialEq provides equality comparison.
   5. JsonSchema auto generates jsonSchema.
  
 */
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub count: i32,
    pub owner: Addr,
}

pub const STATE: Item<State> = Item::new("state");
