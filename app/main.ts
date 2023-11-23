const GlobalKeyboardListener = require('node-global-key-listener')
const v = new GlobalKeyboardListener.GlobalKeyboardListener();
const KeyTranslator = require("#appUtils/KeyTranslator.ts")

const DELIMITER = ":";
let start = false;

//Log every key that's pressed.
v.addListener( (e, down) => {
    KeyTranslator.keyTranslator(down)
    console.log(
        `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey._nameRaw}]`
    );
});

//Capture Windows + Space on Windows and Command + Space on Mac
v.addListener( (e, down) => {
    if (e.state == "DOWN" && e.name == "SPACE" && (down["LEFT META"] || down["RIGHT META"])) {
        //call your function
        console.log("open up the safe bithces got a lot to say")
        return true;
    }
});

//Capture ALT + F
v.addListener((e, down) => {
    if (e.state == "DOWN" && e.name == "F" && (down["LEFT ALT"] || down["RIGHT ALT"])) {
        //call your function
        return true;
    }
});
