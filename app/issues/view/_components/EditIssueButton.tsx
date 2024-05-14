import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
const EditIssueButton = ({IssueId}:{IssueId:string}) => {
  return (
    <Button><Link href={`/issues/view/${IssueId}/edit`}>Update Issue</Link></Button>
  )
}

export default EditIssueButton