import React from 'react'
import { auth } from '@/auth'
import IssueForm from '@/app/components/IssueForm'
import { redirect } from 'next/navigation';
const NewIssuePage = async () => {
  const session = await auth();
  if(!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/issues/new');
  }
  return (
    <IssueForm />
  )
}

export default NewIssuePage