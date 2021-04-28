require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
const headers = require('./middleware/headers')

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
app.listen(process.env.PORT, () => {
    console.log(`[Server]: App is listening on ${process.env.PORT}.`)
});
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`)
});
console.log("here")
app.use(Express.json());
app.use(headers);

const controllers = require("./controllers");

app.use('/test', (req, res) => {
    res.send('Please work')
})

app.use("/user", controllers.userController);
app.use("/list", controllers.listController);
app.use("/search", controllers.searchController);

// dbConnection.sync({
//         force: true
//     });