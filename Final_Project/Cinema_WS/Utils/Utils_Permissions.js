const {writePermissionsJson,readPermissionsJson} = require("../DALs/DAL_PermissionJson") //Import functions from DAL permissions of Json file

//Get permissions of all users:
const getAllUsersPermissions =()=>
{
    const allPermissions = readPermissionsJson()
    return allPermissions
}
//getAllUsersPermissions().then(console.log)

//Geting permissions of specific user by id:
const getPermissionByUserId = async(id)=>
{
    const allPermissions = await readPermissionsJson()
    //after geting all permissions of all users - using metod filter to find permissions of user with specific id:
    const UserPermission = allPermissions.find((user)=>user.id===id)
    return UserPermission
}
//getPermissionByUserId("61dc325ca893bc67e468f533").then(console.log)

//Adding new user permissions(object):
const addPermissions = async(newUser, id) =>
{
    const allPermissions = await readPermissionsJson()
    //Added user creating:
    const addedPermissions = {
        id: id,
        permissions: newUser.permissions
    }
    //Adding a naw user permission object to array:
    allPermissions.push(addedPermissions)
    await writePermissionsJson(allPermissions)//setPermissions - from DAL
}
//const permissionsUser1 = {id:"1","Permissions":["View Subscriptions","Create Subscriptions"]}
//addPermissions(permissionsUser1)

//Updating permissions of specific user by id:
const updatePermissions = async(updatedUser, id) =>
{
    const allPermissions = await readPermissionsJson()
    const updatedPermissions = {
        id: id,
        permissions: updatedUser.permissions.permissions
    }
    const i = allPermissions.findIndex((user)=>user.id===id)//Finding i (index) of user with specific id
    //Updating users permissions in json file:
    allPermissions.splice(i, 1, updatedPermissions)
    await writePermissionsJson(allPermissions)
}

//updatePermissions("1",["Delete Subscriptions","View Movies"])


//Delete permissions object:
const deletePermissions = async(id) =>
{
    const allPermissions = await readPermissionsJson()
    const i = allPermissions.findIndex((user)=>user.id===id)//Finding i (index) of permissions obj with specific user id
    //Deleting permissions obj with index - i:
    allPermissions.splice(i,1)
    writePermissionsJson(allPermissions)
}
//deletePermissions("1")

module.exports={getAllUsersPermissions,getPermissionByUserId,addPermissions,updatePermissions,deletePermissions}