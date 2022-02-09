require('../DB/db')
const memberModel = require('../Models/Members_Schema')
const { getAllUsers } = require('../DALs/MembersDAL')

//Get All Members Data from DB:
const getAllMembers = () => {
    return new Promise((resolve, reject) => {
        memberModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
//getAllMembers().then(console.log)


//Get a member by it's ID using the memeberModel:
const getMemberById = (id) => {
    return new Promise((resolve, reject) => {
        memberModel.findById(id, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }
        })
    })
}
//getMemberById("61e5c4aaeb318f9042251616").then(console.log)

//Add a member to the DB using the memeberModel:
const addMember = (newMember) => {
    return new Promise((resolve, reject) => {
        const member = new memberModel(newMember)
        member.save((err) => {
            if (err)
                reject(err)
            else
                resolve("Member was added successfully")
        })
    })
}
//addMember({name: 'Sveta',email: 'sveta@gmail',city: 'Rishon'})

//Update a member in the DB by it's ID using the memebersModel:
const updateMember = (id, updatedMember) => {
    return new Promise((resolve, reject) => {
        memberModel.findByIdAndUpdate(id, updatedMember, (err) => {
            if (err)
                reject(err)
            else
                resolve("Member was updated successfully")
        })
    })
}
//updateMember("61e5c67c44159a2d3a771cbe",{name: 'Sveta Shmukler',email: 'sveta@gmail',city: 'Rishon'})

//Delete a member by it's ID using the memebersModel
const deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        memberModel.findByIdAndDelete(id, (err) => {
            if (err)
                reject(err)
            else
                resolve("Member was deleted successfully")
        })
    })
}
//deleteMember("61e5c4aaeb318f9042251616")


//Sending members to DB:
const putMembersInDB = async()=>
{
    const members = await getAllMembers()
    //If DB is empty ---> import all members from WS to DB
    if (members.length==0)
    {
        const allMembers = await (await getAllUsers()).data //getAllUsers - from DAL
        allMembers.forEach(user => {
            //forEach ---> creates member by Schema
            const memberObj ={
                name: user.name,
                email: user.email,
                city: user.address.city
            }            
            //add member:
            const newMember = new memberModel(memberObj)
            newMember.save()
        });
    }
}

//putMembersInDB()

module.exports = {getAllMembers, getMemberById, addMember, deleteMember,updateMember,putMembersInDB}