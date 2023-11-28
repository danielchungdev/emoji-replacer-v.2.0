const fs = require('node:fs')

const getDelimiter = () => {
    try{
        let delimiter = ""
        const fileData = fs.readFileSync('./app/config/emojireplacer.config', 'utf8');
        fileData.split(/\r?\n/).forEach( (line, index) => {
            if (index === 0){
                delimiter = line.split("=")[1]
            }
        })
        return delimiter
    }
    catch(err){
        console.log(err)
    }
}

const configReader = () => {
    let delimiter = getDelimiter()
    return {
        delimiter: delimiter,
    }

}

module.exports = {
    configReader
}