import React from 'react'
import {useMutation} from 'urql'
import {useFetchRepo} from './GithubRepo'

const AddStarQuery = `
mutation StartGithubRepoMutation {
  gitHub {
    addStar(input: { starrableId: "MDEwOlJlcG9zaXRvcnkyNTQ2NTc0MjM=" }){
      starrable{
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
}`

const RemoveStarQuery = `
mutation StartGithubRepoMutation {
  gitHub {
    removeStar(input: { starrableId: "MDEwOlJlcG9zaXRvcnkyNTQ2NTc0MjM=" }){
      starrable{
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
}`

export default function StarGithubRepo() {
  const repo = useFetchRepo()
  const [state, execute] = useMutation(
    repo && repo.viewerHasStarred ? RemoveStarQuery : AddStarQuery,
  )
  if (!repo) {
    return null
  }

  const btnText = repo.viewerHasStarred ? 'Unstar Repo' : 'Star Repo'
  return <button onClick={() => execute()}>{btnText}</button>
}
