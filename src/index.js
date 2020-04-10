import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UrqlProvider from './utils/createUrqlProvider'
import {AuthProvider} from 'react-onegraph'

ReactDOM.render(
  <UrqlProvider>
    <AuthProvider appId={process.env.REACT_APP_ONE_GRAPH_APP_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </UrqlProvider>,
  document.getElementById('root'),
)
