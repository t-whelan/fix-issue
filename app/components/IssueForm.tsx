'use client'
import React, {useState} from 'react'
import { Button, TextField, Callout, Text } from '@radix-ui/themes';

import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { IssueFormSchema } from '@/app/ValidationSchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';
const SimpleMDE = dynamic(()=>import("react-simplemde-editor"), {ssr:false})
type IssueFormData =z.infer<typeof IssueFormSchema>

const IssueForm = ({issue}:{issue?:Issue}) => {

  const router = useRouter();
  const {register, control, handleSubmit, formState:{errors}} = useForm<IssueFormData>({
    resolver:zodResolver(IssueFormSchema)});
const[error, setError]=useState("")
const[isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async(data)=>{
    try {
      setSubmitting(true)
      if(issue){
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push('/issues/view')
        router.refresh();
      } else {
        await axios.post('/api/issues/new', data);
        router.push('/issues/view')
        router.refresh();
      }
      
    } catch (error) {
      setSubmitting(false)
      setError("Unable to create issue, try again");
    }
})

  return (
<div className='max-w-lg space-y-4 mt-5'>
  {error && <Callout.Root color='orange'>
    <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
    <form className='max-w-lg space-y-4 mt-5' onSubmit={onSubmit}>
      <TextField.Root defaultValue={issue?.title} placeholder='Title...' {...register('title')}></TextField.Root>
      {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
      <Controller 
      name="description" 
      control={control} 
      defaultValue={issue?.description}
      render={({field})=><SimpleMDE placeholder="Reply to comment…"  {...field}/>} />
       <ErrorMessage>{errors.description?.message}</ErrorMessage>   
     <Button type='submit' disabled={isSubmitting}>{issue ? 'Update Issue': 'Submit Issue'} {isSubmitting && <Spinner />}</Button>
    </form>
    </div>
  )
}

export default IssueForm