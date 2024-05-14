import { Table } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '../../components';

const LoadingIssue = () => {
    let issues = [4,1,5,3,7,2,9,6,8]
  return (
    <div>
        <Table.Root variant='surface'>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className='hidden md:table-cell'>CreatedAt</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {issues.map((issue)=>(
 <Table.Row key={issue}>
 <Table.Cell>
  <Skeleton />
  <div className='block md:hidden'>
      <Skeleton />
  </div>
  </Table.Cell>
 <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
 <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
</Table.Row>
    ))}
  </Table.Body>
  </Table.Root>
    </div>
  )
}

export default LoadingIssue