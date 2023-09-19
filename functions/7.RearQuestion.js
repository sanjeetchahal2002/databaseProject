




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
    Select p.id,p.tags,t.tagname,t.tagscount from (select tagname,tagscount from tags order by tagscount) as t
    right join (select id,tags from posts where extract(year from creationdate) = 2014 
    AND posttypeID = 1) as p
    on (p.tags LIKE '%' || t.tagname || '%') order by t.tagscount limit 3
  
    `)
})
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())



