const {Client} = require('pg')

const client = new Client({
    user : "postgres",
    password:"2002",
    host : "LocalHost",
    port:5432,
    database : "DataBase_Project"
})

client.connect()
.then(() => console.log('Connected Succesfully'))
.then(() => {
    const CountArray = client.query('select extract(year from creationdate) as years, Count(*) from posts where posttypeid =1 group by years ;')
    return CountArray
})
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())



