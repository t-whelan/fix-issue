import prisma from '@/prisma/client'
import { Box, Grid, Flex } from '@radix-ui/themes'
import { notFound, redirect } from 'next/navigation'
import EditIssueButton from '../_components/EditIssueButton'
import DeleteIssueButton from '../_components/DeleteIssueButton'
import IssueDetails from '../_components/IssueDetails'
import { auth } from '@/auth'
import AssigneeSelect from '../_components/AssigneeSelect'
const IssueDetailsPage = async({params}:{params:{id:string}}) => {
    const session = await auth();
    let issue = await prisma.issue.findUnique({
        where:{
            id:params.id
        }
    })
    if(!issue) notFound();
  return (
    <Grid columns={{initial:'1', sm:'5'}} gap="5" justify="center" align="center">
    <Box as='div' className='space-y-4 md:col-span-4' >
        <IssueDetails issue={issue} />
    </Box>
    <Box>
        <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            {session?.user && (
                <>
                <EditIssueButton IssueId={issue.id} />
<DeleteIssueButton IssueId={issue.id} />
</>
            )}

{!session?.user && redirect('/api/auth/signin?callbackUrl=/issues/view') }

</Flex>
    </Box>
    </Grid>
  )
}

export default IssueDetailsPage