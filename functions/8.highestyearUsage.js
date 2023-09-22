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
.then(() => client.query(`

    SELECT
    p.years,
    numberofposts,
    numberofcomments,
    numberofvotes,
    (numberofposts + numberofcomments + numberofvotes) AS total
    FROM
    (SELECT
        EXTRACT(YEAR FROM posts.creationdate) AS years,
        COUNT(*) AS numberOfPosts
    FROM
        posts
    GROUP BY
        years) AS p

    INNER JOIN
    (SELECT
        EXTRACT(YEAR FROM c.creationdate) AS years,
        COUNT(*) AS numberOfComments
    FROM
        comments c
    GROUP BY
        years) AS c
    ON
    c.years = p.years

    INNER JOIN
    (SELECT
        EXTRACT(YEAR FROM v.creationdate) AS years,
        COUNT(*) AS numberOfVotes
    FROM
        votes v
    GROUP BY
        years) AS v
    ON
    v.years = p.years

    ORDER BY
    total DESC limit 1


`))
.then ((result) => {
    console.log(result.rows)
})
.catch(error => console.log(error))
.finally(() => client.end())





