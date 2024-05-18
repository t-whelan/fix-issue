import React from 'react'
import LatestIssue from './_components/LatestIssue'
import IssueSummary from './_components/IssueSummary'
import { Grid, Flex } from '@radix-ui/themes'
import IssueChart from './_components/IssueChart'
import prisma from '@/prisma/client'


const Dashboard = async() => {
  const open = await prisma.issue.count({where:{status:"OPEN"}})
  const inProgress = await prisma.issue.count({where:{status:"IN_PROGRESS"}})
  const closed = await prisma.issue.count({where:{status:"CLOSED"}})
  return (
    <Grid columns={{initial:'1', md:"2"}} gap='5'>
      <Flex direction='column' gap='5'>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    <IssueChart open={open} inProgress={inProgress} closed={closed}/>
    </Flex>
    <LatestIssue />
    </Grid>
  )
}

export default Dashboard