




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
.then(()=>{
    return client.query(`
        SELECT to_char(p2.creationdate,'day')as nameofday ,Count(*) from posts p1, posts p2
        where p1.posttypeid = 2
        AND p1.parentid = p2.id
        AND age (p1.creationDate,p2.creationdate) <= interval '1 hour'
        Group by nameofday 
        ORDER BY COUNT DESC limit 1
    `)
})
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())



