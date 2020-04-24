import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UrqlProvider from './utils/createUrqlProvider'
import {AuthProvider} from './contexts/AuthContext'
import {auth} from './utils/auth'

ReactDOM.render(
  <UrqlProvider>
    <AuthProvider auth={auth}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </UrqlProvider>,
  document.getElementById('root'),
)
