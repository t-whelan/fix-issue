import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import {IssueBadge, Link, ActionButton} from "../../components"
import { Status, Issue } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUp } from 'lucide-react';
import Pagination from './_components/Pagination';

import {Metadata} from 'next'

export const metadata:Metadata ={
title:'List of issue',
description:"List of issue, you can visit each issue for update and delete or assigned to user"
}
const IssuePage = async({searchParams}:{searchParams:{status:Status, orderBy: keyof Issue, page:string}}) => {
  
  const statuses = Object.values(Status) 

  const status = statuses.includes(searchParams.status) ? searchParams.status :undefined;

  const defaultOrderBy: keyof Issue = 'createdAt';
  const validOrderBys:Array<keyof Issue> =['title', 'status', 'createdAt']

  const orderBy = validOrderBys.includes(searchParams.orderBy) ? searchParams.orderBy : defaultOrderBy

const page = parseInt(searchParams.page) || 1;

const pageSize = 10;

  const columns:{label:string; 
    value: keyof Issue;
  className?:string;
   }[] = [
    {label:'Title', value:'title'},
    {label:'Status', value:'status', className:'hidden md:table-cell'},
    {label:'CreatedAt', value:'createdAt', className:'hidden md:table-cell'}]

  const issues = await prisma.issue.findMany({
    where:{
      status: status
    },
    orderBy:{
      [orderBy]:'asc'
    },
    skip: (page-1)*pageSize,
    take:pageSize
  });

  const issueCount = await prisma.issue.count({where:{status}})

  return (
    <div className='space-y-4 mt-4'>
      <ActionButton />
      <Table.Root variant='surface'>
  <Table.Header>
    <Table.Row>
    {columns.map((column)=>(
        <Table.ColumnHeaderCell key={column.value} className={column.className}><NextLink href={{query:{...searchParams, orderBy:column.value}}}>{column.label}</NextLink>
        {column.value === searchParams.orderBy && <ArrowUp className='inline'/>}
        </Table.ColumnHeaderCell>
      ))}
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {issues.map((issue)=>(
 <Table.Row key={issue.id}>
 <Table.Cell>
  <Link href={`/issues/view/${issue.id}`}>{issue.title}</Link>
  <div className='block md:hidden'>
      <IssueBadge status={issue.status} />
  </div>
  </Table.Cell>
 <Table.Cell className='hidden md:table-cell'><IssueBadge status={issue.status} /></Table.Cell>
 <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
</Table.Row>
    ))}
  </Table.Body>
  </Table.Root>
  <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </div>
  )
}

export default IssuePage