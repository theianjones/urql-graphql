import React from 'react'
import {useQuery} from 'urql'

const GITHUB_REPO_QUERY = `
query GithubRepoQuery{
  gitHub {
    repository(name: "urql-graphql", owner: "theianjones") {
      id
      name
      stargazers {
        totalCount
      }
      forkCount
    }
  }
}
`

export default function GithubRepo() {
  const [res] = useQuery({
    query: GITHUB_REPO_QUERY,
  })
  if (!res.data) {
    return null
  }

  const {repository} = res.data.gitHub

  return (
    <div>
      <h1>{repository.name}</h1>
      <span style={{marginRight: 10}}>
        stars: {repository.stargazers.totalCount}
      </span>
      <span>forks: {repository.forkCount}</span>
    </div>
  )
}
