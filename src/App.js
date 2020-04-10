import React from 'react'
import {AuthContext} from 'react-onegraph'
import {useQuery} from 'urql'
import GithubRepo from './components/GithubRepo'

function App() {
  const {login, status} = React.useContext(AuthContext)
  if (!status.github) {
    return (
      <div>
        <h1>Login with Github</h1>
        <p>In order to see your profile, you'll have to login with Github.</p>
        <button onClick={() => login('github')}>Login with Github</button>
      </div>
    )
  }

  return (
    <div className="App">
      <GithubRepo />
    </div>
  )
}

export default App
