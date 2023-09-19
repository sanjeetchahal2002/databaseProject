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
.then(() =>{
    return client.query('select * from tags order by tagscount DESC limit 5;')
})
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())