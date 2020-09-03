import React from 'react'
import DocumentTitle from 'react-document-title'
import FormContainer from './index'
import { HeadComponent } from '../../layout/Head'
import { ContentComponents } from '../../layout/content'
const style = require('./index.less')
const App: React.FC = () => {
  return (
    <DocumentTitle title="dailyApi">
      <div className={'container'}>
        <HeadComponent></HeadComponent>
        <ContentComponents></ContentComponents>
        {/* <FormContainer></FormContainer> */}
      </div>
    </DocumentTitle>
  )
}
export default App
