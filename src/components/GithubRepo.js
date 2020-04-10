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
      viewerHasStarred
    }
  }
}
`

export const useFetchRepo = () => {
  const [res] = useQuery({
    query: GITHUB_REPO_QUERY,
  })
  if (!res.data) {
    return null
  }

  return res.data.gitHub.repository
}

export default function GithubRepo({children}) {
  const repository = useFetchRepo()
  if (!repository) {
    return null
  }
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
