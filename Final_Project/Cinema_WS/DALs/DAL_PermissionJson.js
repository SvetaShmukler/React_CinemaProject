const jFile = require('jsonfile')
const path = __dirname + '/UserPermissions.json'//__dirname --> for finding "UsersJson" only(must be in the same folder with json file)

//Read json file function:
const readPermissionsJson = () => jFile.readFile(path)

//Write json file function:
const writePermissionsJson = (newArr) => jFile.writeFile(path, newArr)

module.exports = { readPermissionsJson, writePermissionsJson }