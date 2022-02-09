const jFile = require('jsonfile');//library 'jsonfile'import

const jFilePathPermissions = __dirname + '/UserPermissions.json'//__dirname --> for finding "UsersJson" only(must be in the same folder with json file)

//Add new permissions(array) to user:
const setPermissions= (permissionsArr)=>{
    return new Promise ((resolve,reject)=>{
        jFile.writeFile(jFilePathPermissions,permissionsArr,(err)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("User was seted")
            }
        })
    })
}

//Get all permissions of jsonFile:
const readPermissions = ()=>{
    return new Promise ((resolve,reject)=>{
        jFile.readFile(jFilePathPermissions,(err,data)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}

module.exports = {setPermissions,readPermissions}