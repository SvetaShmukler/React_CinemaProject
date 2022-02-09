const jFile = require('jsonfile')
const path = __dirname + '/Users.json'//__dirname --> for finding "UsersJson" only(must be in the same folder with json file)

//Read json file function:

const readUsersJson = () => jFile.readFile(path)

//Write json file function:

const writeUsersJson = (newArr) => jFile.writeFile(path,newArr)

module.exports = { readUsersJson, writeUsersJson }



//readUsersJson().then(console.log)
/*const newArr1 = [{
    "id":"61dd471f293701fa8d5a00fe",
    "firstName":"Sveta",
    "lastName":"Shmukler",
    "createdDate":"12/12/2021",
    "sessionTimeOut":"30"
},
{
    "id":"61e7c8425be160aea269c9d3",
    "firstName":"Moshe",
    "lastName":"Cohen",
    "createdDate":"11/11/2011",
    "sessionTimeOut":"15"
},
{
    "id":"1",
    "firstName":"Dana",
    "lastName":"Levi",
    "createdDate":"01/01/2000",
    "sessionTimeOut":"30"
}]*/

//writeUsersJson(newArr1)

