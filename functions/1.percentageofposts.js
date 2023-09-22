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
.then(async () =>{
    return client.query(`SELECT 
    ((COUNT(*) FILTER (WHERE posttypeid = 1 AND answercount >= 1) * 100) /
        COUNT(*) FILTER (WHERE posttypeid = 1 )) AS percentage
        FROM posts;
    `)
})
.then ((result) => {
    console.log(result.rows[0].percentage)
})
.catch(error => console.log(error))
.finally(() => client.end())