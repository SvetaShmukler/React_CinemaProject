import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { getAllMembers } from '../DALs/Members_DAL';
import OneMemberComp from './OneMemberComponent';

export default function AllMembersComp() {
    const [members, setMembers] = useState()
    //const [boolean, setBoolean] = useState(false)
    const state = useSelector(state => state)
    
    //loading all of members:
    useEffect(async () => {
        const newMembers = await getAllMembers()
        setMembers (newMembers)
        
    }, [state.refresh])

    //listing each of members
    const membersList = members?.map((member, index) => <OneMemberComp key={index} member={member}  />)

    return (
        <div className='allUsersDiv' >
            {membersList}
        </div>
    )
}