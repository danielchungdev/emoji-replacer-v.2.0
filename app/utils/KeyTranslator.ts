
const filterKeys = (keys) => {
    return Object.fromEntries(
        Object.entries(keys).filter(
            ([_, value]) => value === true
        )
    )
}

const keyTranslator = (keys) => {
    let currentKeys = filterKeys(keys)
    console.log(currentKeys)
}

module.exports = {
    keyTranslator
}