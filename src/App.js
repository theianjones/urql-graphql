import React from 'react'
import {AuthContext} from './contexts/AuthContext'
import GithubRepo from './components/GithubRepo'
import StarGithubRepo from './components/StarGithubRepo'

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
      <StarGithubRepo />
    </div>
  )
}

export default App
