import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { AppContainer } from 'react-hot-loader'
import App from './js/components/container/App'
import React from 'react'
// renderWithHotReload()

// function renderWithHotReload() {
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
)
// }

// module.hot.accept()

// serviceWorker.unregister()
