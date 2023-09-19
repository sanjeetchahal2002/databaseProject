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
    const postGreaterThanOne = await client.query(`select COUNT(*) from posts where posttypeid = 1 AND answercount >=1;`)
    const postLessThanOne = await client.query('select COUNT(*) from posts where posttypeid = 1;')
    console.log((Number(postGreaterThanOne.rows[0].count)/Number(postLessThanOne.rows[0].count))*100)
})
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())