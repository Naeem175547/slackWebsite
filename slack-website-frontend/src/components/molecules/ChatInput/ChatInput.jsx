import { Editor } from '@/components/atoms/Editor/Editor'
import React from 'react'

export default function ChatInput() {
  return (
   <Editor variant='default' onSubmit={() => {}} onCancel={() => {}} placeholder="Type a message..." disabled={false} defaultValue="" />
  )
}
