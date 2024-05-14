"use client"
import React, {useState, useEffect} from 'react'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { User } from '@prisma/client'

const AssigneeSelect = () => {
    const[users, setUsers] = useState([])
   

    useEffect(()=>{
const fetchUser =async ()=>{
    let {data} = await axios.get<User[]>('/api/users')
console.log(data)
       setUsers(data)
    
}

fetchUser();
    },[])
   
  return (
    <div className='mt-4'>
        <Select.Root>
  <Select.Trigger placeholder='Assign user....'/>
  <Select.Content>
    <Select.Group>
      <Select.Label>Suggestions</Select.Label>
      
   {users && users.map((user)=>(<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
    
   )}
    </Select.Group>
  </Select.Content>
</Select.Root>
    </div>
  )
}

export default AssigneeSelect