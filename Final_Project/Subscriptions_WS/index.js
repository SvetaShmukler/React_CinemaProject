const express = require('express');//express package
const cors = require('cors');//cors package

require('./DB/db');//connecting to DB

const membersRouter = require('./Routers/MembersRouter')//linking the member router to the file
const moviesRouter = require('./Routers/MoviesRouter')//linking the movie router to the file
const subscriptionsRouter = require('./Routers/SubscriptionRouter')//linking the subscription router to the file

const {putMembersInDB} = require('./BLs/BL_Members')//Function that gets 10 first members.
const {putMoviesInDB} = require('./BLs/BL_Movies')//Function that get the first 240 movies.
const {deleteAllSubscriptionsFromDB} = require('./BLs/BL_Subscriptions');//Functoin that deletes all the subscriptions from the website

const app = express();//middleware
const port = 8001;//Declering the port number

app.use((cors()));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/members',membersRouter)// connecting the path to the members router
app.use('/movies',moviesRouter)// connecting the path to the movies router
app.use('/subscriptions',subscriptionsRouter)// connecting the path to the subscriptions router

//Geting functions:
putMembersInDB()
putMoviesInDB()
deleteAllSubscriptionsFromDB()

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})
