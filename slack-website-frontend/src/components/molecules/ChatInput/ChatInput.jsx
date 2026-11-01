import { Editor } from '@/components/atoms/Editor/Editor'
import React from 'react'

export default function ChatInput() {
    async function handleSubmit({ body }) {
        console.log(body);
    }
  return (
   <Editor variant='default'
    onSubmit={handleSubmit} 
    onCancel={() => {}} 
    placeholder="Type a message..." 
    disabled={false} defaultValue="" />
  )
}
