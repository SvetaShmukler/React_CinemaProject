import React,{useState} from "react"
import { useNavigate } from "react-router"
import { addMember } from "../DALs/Members_DAL"
import { useDispatch } from "react-redux"

export default function AddMemberComp() {
    //states:
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [city, setCity] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Building of new member object:
    const saveMember = async () =>{
        if(name !== undefined && email !== undefined && city !== undefined)
        {
            const objMember = { //creating new member by schema
                name : name,
                email : email,
                city : city,
            }
            navigate('/mainPage/subscriptions/allMembers')//navigating to all members page
            await addMember(objMember)
            dispatch({ type: 'REFRESH' })
        }
        else
        {
            alert ("Please fill all the fields of the form.")
        }
    } 

    return (
        <div className="addUserDiv">
            <h3 className="blackH3">Add New Member</h3>
            <div className='addMemberDiv'>
                <div style={{ marginTop: '7px' }}>
                    <strong>Name: </strong> <input className='blackInput' type='text' onChange={e => setName(e.target.value)} /><br />
                    <strong>Email: </strong> <input className='blackInput' type='email' onChange={e => setEmail(e.target.value)} /><br />
                    <strong>City: </strong> <input className='blackInput' type='text' onChange={e => setCity(e.target.value)} /><br /><br />
                    <button className='addUserButton' onClick={saveMember}>Save</button>
                    <button className='addUserButton' onClick={() => navigate('/mainPage/subscriptions/allMembers')}>Cancel</button><br/><br/>
                </div>
            </div>
        </div>
    )

}