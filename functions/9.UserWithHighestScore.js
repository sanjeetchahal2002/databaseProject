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
    SELECT id,displayname, (upvotes + downvotes+p.yo*10+c.comment_count*3)AS score 
    FROM users u 
    INNER JOIN   
    (SELECT  Count(owneruserid) AS yo,owneruserid
    FROM posts group by owneruserid)
    p On u.id = p.owneruserid 
    INNER JOIN (
        SELECT userid, COUNT(userid) AS comment_count
        FROM comments 
        GROUP BY userid
    ) AS c ON u.id = c.userid
    ORDER BY score DESC limit 5;
    `)
})
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())