import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMemberByID, updateMemberById } from '../DALs/Members_DAL'
export default function EditMemberComp()
{
    //states:
    const state = useSelector(state=>state)
    const [member, setMember] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [city, setCity] = useState()

    const navigate = useNavigate()

    //Loading member's info to inputs for edit:
    useEffect (async() =>{
        setMember(await getMemberByID(state.editMember))//state.editMember from reducer.js   
    },[])

    const updateMember = async() =>
    {
        const memberObj = {...member,
                           name: name,
                           email: email,
                           city: city}
        await updateMemberById(memberObj, state.editMember)
        navigate('/mainPage/subscriptions/allMembers')//navigating back to all members
    }
    return(
        <div className="addUserDiv">
            <h3 className="blackH3">Edit Member: {member?.name}</h3>
            <div style={{ marginTop: '7px' }}>
                <strong>Name: </strong> <input className='blackInput' type='text' defaultValue={member?.name} onChange={e => setName(e.target.value)} /><br />
                <strong>Email: </strong> <input className='blackInput' type='email' defaultValue={member?.email} onChange={e => setEmail(e.target.value)} /><br />
                <strong>City: </strong> <input className='blackInput' type='text' defaultValue={member?.city} onChange={e => setCity(e.target.value)} /><br /><br />
                <button className='addUserButton' onClick={updateMember}>Update</button>&nbsp;&nbsp;
                <button className='addUserButton' onClick={() => navigate('/mainPage/subscriptions/allMembers')}>Cancel</button><br/><br/>
            </div>
        </div>
    )
}