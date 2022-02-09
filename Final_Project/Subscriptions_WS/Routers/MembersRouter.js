const express = require('express')
const membersBL = require('../BLs/BL_Members')

const router = express.Router()//Router declaration

//Get method---> to get all the members using the BL's function getAll:

router.route('/').get(async(req,res) => {
    try
    {
        const members = await membersBL.getAllMembers();
        return res.json(members);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Get by ID---> to get a member by ID using Bl's function getByID:

router.route('/:id').get(async(req,res) => {
    try
    {
        const id = req.params.id
        const member = await membersBL.getMemberById(id);
        return res.json(member);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Post method---> to add member to a DB using the Bl function addMember:

router.route('/').post(async(req,res) => {
        const newMember = req.body
        const result = await membersBL.addMember(newMember).catch(err=>console.log(err));
        return res.json(result);
})

//Put method ---> to update a member by ID using Bl's function updateMember:

router.route('/:id').put(async(req,res) => {
    try
    {
        const id = req.params.id
        const updatedMember = req.body
        const result = await membersBL.updateMember(id,updatedMember);
        return res.json(result);
    }
    catch(error)
    {
        return res.json(error)
    }
})

//Delete ---> to delete a member by ID using Bl's function deleteMember:

router.route('/:id').delete(async(req,res) => {
    try
    {
        const id = req.params.id
        const result = await membersBL.deleteMember(id);
        return res.json(result);
    }
    catch(error)
    {
        return res.json(error)
    }
})

module.exports = router


