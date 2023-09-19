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
    return client.query(`SELECT v.postid, COUNT(v.votetypeid)
    FROM (
        SELECT postid, votetypeid
        FROM votes
        WHERE votetypeid = 2
    ) AS v
    INNER JOIN (
        SELECT id
        FROM posts
        WHERE EXTRACT(YEAR FROM creationdate) = 2015
    ) AS p ON v.postid = p.id
    GROUP BY v.postid
    ORDER BY COUNT(v.votetypeid) DESC
    LIMIT 10;    
    `)
})
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())