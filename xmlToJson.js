const fs = require('fs')
const {parseString} = require('xml2js')
const jsonTocsv = require('json-2-csv')
fs.readFile('./arduino.stackexchange.com/Comments.xml','utf-8', (error,data) => {
    if(error){
        console.log(error)
        return
    }
    parseString(data,async (error,result) => {
        if(error){
            console.log(error)
            return
        }
        let requiredData =  JSON.stringify(result, null, 2)
        fs.writeFileSync('./jsonData/Comments.json',requiredData,(error) => {
            console.log(error)
        })
        requiredData = JSON.parse(requiredData).comments.row
        const csvData = await jsonTocsv.json2csv(requiredData)
        fs.writeFileSync('./csv/Comments.csv',csvData,(error)=>{
            console.log(error)
        })
    })
})
