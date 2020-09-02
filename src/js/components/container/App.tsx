import React from 'react'
import DocumentTitle from 'react-document-title'
import FormContainer from './index'
import { HeadComponent } from '../../layout'
const style = require('./index.less')
const App: React.FC = () => {
  return (
    <DocumentTitle title="dailyApi">
      <div className={'container'}>
        <HeadComponent></HeadComponent>
        <FormContainer></FormContainer>
      </div>
    </DocumentTitle>
  )
}
export default App
