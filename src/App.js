import React from 'react'
import {AuthContext} from 'react-onegraph'
import {useQuery} from 'urql'

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
      <GetGithubRepo />
    </div>
  )
}

export default App

function GetGithubRepo() {
  const [res] = useQuery({
    query: `
    {
      gitHub {
        organization(login: "eggheadio") {
          repositories(
            first: 10
            orderBy: { direction: DESC, field: CREATED_AT }
          ) {
            nodes {
              id
              name
            }
          }
        }
      }
    }
    `,
  })
  if (!res.data) {
    return null
  }

  return (
    <div>
      <h1>egghead.io repos</h1>
      <ul>
        {res.data.gitHub.organization.repositories.nodes.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  )
}
