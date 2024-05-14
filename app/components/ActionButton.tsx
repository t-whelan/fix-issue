import React from 'react'
import Link from 'next/link'
import { Button } from '@radix-ui/themes'
const ActionButton = () => {
  return (
   <Button asChild><Link href={`/issues/new`}>Add New Issue</Link></Button>
  )
}

export default ActionButton