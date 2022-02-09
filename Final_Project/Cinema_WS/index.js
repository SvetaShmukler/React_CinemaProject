const express = require('express');//express package
const cors = require('cors');//cors package
require('./DB/db');//link the DB to the file

//link to routers:
const cinemaRouter = require('./Routers/Cinema_Router')
const membersRouter = require('./Routers/Members_Router')
const moviesRouter = require('./Routers/Movies_Router')
const subscriptionRouter = require('./Routers/Subscriptions_Router')

const port = 8002;

//middleware
const app = express();
app.use((cors()));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',cinemaRouter)
app.use('/members',membersRouter)
app.use('/movies',moviesRouter)
app.use('/subscriptions',subscriptionRouter)

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})
