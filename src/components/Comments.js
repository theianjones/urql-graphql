import React from 'react'
import {useQuery, useMutation} from 'urql'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

const COMMENT_LIST_QUERY = `
query CommentListQuery(
  $repoOwner: String!
  $repoName: String!
  $issueNumber: Int!){
  gitHub {
    repository(name: $repoName, owner: $repoOwner) {
      issue(number: $issueNumber) {
        id
        comments(last: 100) {
          nodes {
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
  }
}
`

const ADD_COMMENT_QUERY = `
mutation AddComment(
  $body: String!
  $issueId: ID!
) {
  gitHub {
    addComment(
      input: {
        body: $body
        subjectId: $issueId
      }
    ) {
      commentEdge {
        node {
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

function useFetchCommentList() {
  const REPO_NAME = 'urql-graphql'
  const REPO_OWNER = 'theianjones'
  const ISSUE_NUMBER = 1
  const [res, reExecute] = useQuery({
    query: COMMENT_LIST_QUERY,
    variables: {
      repoOwner: REPO_OWNER,
      repoName: REPO_NAME,
      issueNumber: ISSUE_NUMBER,
    },
  })

  return [res, reExecute]
}

export default function Comments({children}) {
  const [commentListResult] = useFetchCommentList()
  const [addCommentResult, executeAddComment] = useMutation(ADD_COMMENT_QUERY)

  if (!commentListResult.data) {
    return null
  }

  const issue = commentListResult.data.gitHub.repository.issue
  const comments = issue.comments.nodes
  const handleSubmit = ({e, comment}) => {
    e.preventDefault()
    executeAddComment({issueId: issue.id, body: comment})
  }

  console.log(addCommentResult)
  return (
    <>
      <h1>egghead Comments</h1>
      <CommentList comments={comments} />
      <CommentInput onSubmit={handleSubmit} />
    </>
  )
}
