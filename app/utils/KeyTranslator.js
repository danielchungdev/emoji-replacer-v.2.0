
const isAlpha = (letter) => {
    return letter.length === 1 && letter.match(/[a-z]/i);
}

const returnPressedKey = (arr) => {
    return arr.filter( (word) => word.length === 1 )[0]
}

const filterKeys = (keys) => {
    return Object.fromEntries(
        Object.entries(keys).filter(
            ([_, value]) => value === true
        )
    )
}

const translateShiftNumbers = (number) => {
    const mappings = {
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7":" &",
        "8": "*",
        "9": "(",
        "0": ")"
    }
    return mappings[number].trim()
}


const translateKey = (keys) => {
    let allKeys = Object.getOwnPropertyNames(keys)

    let isShift = allKeys.includes('RIGHT SHIFT') || allKeys.includes('LEFT SHIFT')
    let isCaplock = allKeys.includes('CAPS_LOCK')
    let isEnter = allKeys.includes('RETURN')
    let isBackSpace = allKeys.includes('BACKSPACE')
    let isBackSlash = allKeys.includes('BACKSLASH')
    let isForwardSlash = allKeys.includes('FORWARD SLASH')
    let isDot = allKeys.includes('DOT')
    let isComma = allKeys.includes('COMMA')
    let isUpArrow = allKeys.includes('UP ARROW')
    let isLeftArrow = allKeys.includes('LEFT ARROW')
    let isRightArrow = allKeys.includes('RIGHT ARROW')
    let isDownArrow = allKeys.includes('DOWN ARROW')
    let isMinus = allKeys.includes('MINUS')
    let isEquals = allKeys.includes('EQUALS')
    let isMeta = allKeys.includes('RIGHT META') || allKeys.includes('LEFT META')
    let isAlt = allKeys.includes('RIGHT ALT') || allKeys.includes('LEFT ALT')
    let isCtrl = allKeys.includes('LEFT CTRL') || allKeys.includes('RIGHT CTRL')
    let isTab = allKeys.includes('TAB')
    let isBacktick = allKeys.includes('BACKTICK')
    let isEsc = allKeys.includes('ESCAPE')
    let isSquareBracketOpen = allKeys.includes('SQUARE BRACKET CLOSE') //[
    let isSquareBracketClose = allKeys.includes('SQUARE BRACKET OPEN') //]
    let isQuote = allKeys.includes('QUOTE')
    let isSpace = allKeys.includes('SPACE')
    let isSemicolon = allKeys.includes('SEMICOLON')

    let pressedKey = returnPressedKey(allKeys)

    //If it's just shift + letters or if it has capslock on
    if ((isShift || isCaplock) && pressedKey && isAlpha(pressedKey)){
        return pressedKey.toUpperCase()
    }
    //If it's just normal letters
    if (!isShift && pressedKey && isAlpha(pressedKey)){
        return pressedKey.toLowerCase()
    }
    //If it's shit + a number
    if (isShift && pressedKey && !isAlpha(pressedKey)){
        return translateShiftNumbers(pressedKey)
    }
    //Useless keys that won't do anything
    if (isCtrl || isAlt || isMeta || isTab || isEsc || isUpArrow || isLeftArrow || isRightArrow || isDownArrow || isEnter){
        return 
    }
    
    if (isShift && isEquals){
        return "+"
    }

    if (!isShift && isEquals){
        return "="
    }

    if (isShift && isMinus){
        return "_"
    }

    if (!isShift && isMinus){
        return "-"
    }

    if (isShift && isSquareBracketOpen){
        return "}"
    }

    if (!isShift && isSquareBracketOpen){
        return "]"
    }

    if (isShift && isSquareBracketClose){
        return "{"
    }

    if (!isShift && isSquareBracketClose){
        return "["
    }

    if (isSpace){
        return " "
    }

    if (!isShift && isBackSlash){
        return "\\"
    }

    if (isShift && isBackSlash){
        return "|"
    }

    if (isShift && isQuote){
        return "\""
    }

    if (!isShift && isQuote){
        return "'"
    }

    if (isShift && isDot){
        return ">"
    }

    if (!isShift && isDot){
        return "."
    }

    if (isShift && isComma){
        return "<"
    }
    
    if (!isShift && isComma){
        return ","
    }

    if (!isShift && isForwardSlash){
        return "/"
    }

    if (isShift && isForwardSlash){
        return "?"
    }

    if (isShift && isBacktick){
        return "`"
    }

    if (!isShift && isBacktick){
        return "~"
    }

    if (isShift && isSemicolon){
        return ":"
    }

    if (!isShift && isSemicolon){
        return ";"
    }

    if (isBackSpace){
        return "BACKSPACE"
    }
}

const keyTranslator = (keys) => {
    let currentKeys = filterKeys(keys)
    return translateKey(currentKeys)
}

module.exports = {
    keyTranslator
}