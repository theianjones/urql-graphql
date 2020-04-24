import React from 'react'
import {useQuery, useSubscription} from 'urql'

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

const NEW_COMMENT_SUBSCRIPTION = `
subscription NewCommentComment {
  github {
    issueCommentEvent(
      input: {
        repoOwner: "theianjones"
        repoName: "urql-graphql"
      }
    ) {
      action
      comment {
        author {
          login
        }
        body
        id
        url
        viewerDidAuthor
      }
    }
  }
}
`

export const useFetchRepo = () => {
  const [res] = useQuery({
    query: GITHUB_REPO_QUERY,
  })
  const [subscriptionResult] = useSubscription({
    query: NEW_COMMENT_SUBSCRIPTION,
  })

  console.log({res, subscriptionResult})
  // if (!res.data) {
  //   return null
  // }

  // return res.data.gitHub.repository
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
