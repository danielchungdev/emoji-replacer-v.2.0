const GlobalKeyboardListener = require('node-global-key-listener')
const v = new GlobalKeyboardListener.GlobalKeyboardListener();
const KeyTranslator = require("#appUtils/KeyTranslator.js")
const ConfigReader = require("#appUtils/ConfigReader.js")

const config = ConfigReader.configReader()

const DELIMITER = config.delimiter;
let listening = false;
let word = []
let lenght = 0

//Log every key that's pressed.
v.addListener((e, down) => {
    if (e.state === 'DOWN') {


        let key = KeyTranslator.keyTranslator(down)

        if (listening) {

            if (key === DELIMITER) {
                console.log("End")
                let endingWord = word.join("")
                console.log(endingWord)
                listening = false
            }

            if (key === 'BACKSPACE') {
                lenght -= 1
                word.pop()
            }

            if (key !== 'BACKSPACE' && key !== undefined && key !== DELIMITER) {
                console.log(key + " here")
                word.push(key.toString())
            }

        }
        else if (key === DELIMITER && !listening) {
            console.log("start")
            word = []
            listening = true
        }

    }
});

//Capture Windows + Space on Windows and Command + Space on Mac
v.addListener((e, down) => {
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
