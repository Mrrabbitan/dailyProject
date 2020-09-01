import React from 'react'
import DocumentTitle from 'react-document-title'
import FormContainer from './index'

const App: React.FC = () => {
  return (
    <DocumentTitle title="dailyApi">
      <FormContainer></FormContainer>
    </DocumentTitle>
  )
}
export default App
