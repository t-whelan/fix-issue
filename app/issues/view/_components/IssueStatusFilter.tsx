import React from 'react'
import { Select } from '@radix-ui/themes'
import { Status } from '@prisma/client'

const statuses:{label:string, value?: Status}[] = [{label: 'All'}, 
{label:"Open", value:"OPEN"}, 
{label:"Closed", value:"CLOSED"}, 
{label:"In-progress", value:"IN_PROGRESS"}
]


const IssueStatusFilter = () => {
  return (
  <Select.Root>
    <Select.Trigger placeholder='filter by status....'/>
  <Select.Content>
{statuses.map((status)=>(
    <Select.Item key={status.label} value={status.value  ?? 'All'}>{status.label}</Select.Item>
   ))}
  </Select.Content>
  </Select.Root>
  )
}

export default IssueStatusFilter