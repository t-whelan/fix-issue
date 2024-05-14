import { IssueBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Flex, Card, Heading, Text } from '@radix-ui/themes'

import React from 'react'
import Markdown from 'react-markdown'

const IssueDetails = ({issue}:{issue:Issue}) => {
  return (
    <div>
    <Heading as='h1'>{issue.title}</Heading>
        <Flex className='space-x-4' mt="4">
        <IssueBadge status={issue.status}/>
        <Text as='p'>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose max-w-full'>
        <Markdown>{issue.description}</Markdown>
        </Card> 
        </div>
  )
}

export default IssueDetails