import { Box, Flex, Heading, Card } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from "../../../components"
const LoadingIssueDetails = () => {
  return (
    <Box as='div' className='space-y-4' >
        <Heading as='h1'><Skeleton /></Heading>
        <Flex className='space-x-4' mt="4">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
        </Flex>
        <Card className='prose'>
        <Skeleton count={5} />
        </Card>
        
    </Box>
  )
}

export default LoadingIssueDetails