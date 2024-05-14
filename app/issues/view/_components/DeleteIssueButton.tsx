"use client"
import React, {useState} from 'react'
import axios from 'axios'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import Spinner from '@/app/components/Spinner'
const DeleteIssueButton = ({IssueId}:{IssueId:string}) => {
  const router = useRouter();
  const[errors, setErrors]=useState(false);
const[isDeleting, setDeleting]=useState(false)
  return (
    <>
  <AlertDialog.Root>
  <AlertDialog.Trigger>
  <Button color='red' disabled={isDeleting}>Delete Issue {isDeleting && <Spinner />}</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Title>Are your sure ?</AlertDialog.Title>
    <AlertDialog.Description size="2">
      Once you delete, you canot reverse the action.
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="solid" color="red" onClick={async()=>{
          try {
            setDeleting(true)
           await axios.delete(`/api/issues/${IssueId}`)
           router.push('/issues/view')
           router.refresh();
          } catch (error) {
            setErrors(true)
          }
        }}>
          Continue with deletion
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root open={errors}>
  <AlertDialog.Content>
  <AlertDialog.Title>Error</AlertDialog.Title>
  <AlertDialog.Description>Something went wrong pleaes try again</AlertDialog.Description>
    <AlertDialog.Action>
      <Button color="red" onClick={()=>setErrors(false)} mt="4">OK</Button>
    </AlertDialog.Action>
  </AlertDialog.Content>
</AlertDialog.Root>
</>
  )
}

export default DeleteIssueButton