import React from 'react'
import DocumentTitle from 'react-document-title'
import { HeadComponent } from '../../layout/Head'
import { ContentComponents } from '../../layout/content'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { tabStateReducer } from '../../../store/reducer'
import ReduxThunk from 'redux-thunk'

const style = require('./index.less')

const rootReducer = combineReducers({
  tabStateReducer: tabStateReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DocumentTitle title="dailyApi">
        <div className={'container'}>
          <HeadComponent></HeadComponent>
          <ContentComponents></ContentComponents>
          {/* <FormContainer></FormContainer> */}
        </div>
      </DocumentTitle>
    </Provider>
  )
}
export default App
