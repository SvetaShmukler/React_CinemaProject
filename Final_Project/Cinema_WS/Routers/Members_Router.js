const express = require('express')
const { getAllMembers, getMemberByID, addMember, updateMemberById, deleteMember } = require('../DALs/DAL_Members')

//creating a router using express
const router = express.Router()

// GET method: that gets all the members using the DAL's functions 
router.route('/').get(async (req, res) => {
    try {
        const members = await getAllMembers()
        return res.json(members)
    }
    catch (error) {
        return res.json(error)
    }
})

//GET method by id: that gets a member by it's ID using the DAL's functions
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const member = await getMemberByID(id)
        return res.json(member)
    }
    catch (error) {
        return res.json(error)
    }
})

//POST method: that adds a member to the database using the DAL's functions
router.route('/').post(async (req, res) => {
    const newMember = req.body;
    await addMember(newMember)
})

//PUT method: that updates a member in the database by it's ID using the DAL's functions
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMember = req.body;
        const result = await updateMemberById(updatedMember, id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//DELETE method :that deletes a memeber by it's ID using the DAL's functions
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteMember(id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;