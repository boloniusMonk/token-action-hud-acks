import { MODULE_ID, SYSTEM_ID } from "./constants.js";
import "./action-handler.js";
import "./roll-handler.js";

Hooks.once("init", () => {
  console.log(`${MODULE_ID} | Initializing`);
});

Hooks.once("ready", () => {
  console.log(`${MODULE_ID} | Ready`);
  if (game.system.id !== SYSTEM_ID) {
    console.warn(`${MODULE_ID} | Expected system '${SYSTEM_ID}' but found '${game.system.id}'`);
  }
});
