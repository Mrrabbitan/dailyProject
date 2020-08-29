import React, { useState } from 'react'
import { Input } from './Input/Input'
import ReactDOM from 'react-dom'

export const FormContainer: React.FC = () => {
  const [seo_title, setSeoTitle] = useState<string>('')

  function handleChange() {
    setSeoTitle('cccc')
  }

  return (
    <form id="article-form">
      <Input
        text="SEO title"
        label="seo_title"
        type="text"
        id="seo_title"
        value={seo_title}
        handleChange={() => {
          handleChange()
          return 0
        }}
      ></Input>
    </form>
  )
}

const wrapper = document.getElementById('create-article-form')

wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false
