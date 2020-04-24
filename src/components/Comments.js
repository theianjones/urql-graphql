import React from 'react'
import {useQuery, useMutation, useSubscription} from 'urql'
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
  const [comments, setComments] = React.useState([])
  const handleSubscription = (comments = [], response) => {
    return [...comments, response.github.issueCommentEvent.comment]
  }
  const addNewComment = (newComment) => {
    setComments([...comments, newComment])
  }
  const [commentListResult] = useFetchCommentList()
  const [addCommentResult, executeAddComment] = useMutation(ADD_COMMENT_QUERY)
  const [commentSubscriptionResult] = useSubscription(
    {
      query: NEW_COMMENT_SUBSCRIPTION,
    },
    handleSubscription,
  )
  React.useEffect(() => {
    if (!commentListResult.data) {
      return
    }
    const issue = commentListResult.data.gitHub.repository.issue
    const initialComments = issue.comments.nodes
    setComments(initialComments)
  }, [commentListResult.data])

  React.useEffect(() => {
    if (!commentSubscriptionResult.data) {
      return
    }
    const newComment = [...commentSubscriptionResult.data].pop()
    addNewComment(newComment)
  }, [commentSubscriptionResult.data])

  if (!commentListResult.data) {
    return null
  }
  const issue = commentListResult.data.gitHub.repository.issue
  // const initialComments = issue.comments.nodes
  // const newComment = commentSubscriptionResult.data.issueCommentEvent.comment
  // const comments = [...initialComments, newComment]

  const handleSubmit = ({e, comment}) => {
    e.preventDefault()
    executeAddComment({issueId: issue.id, body: comment})
  }
  return (
    <>
      <h1>egghead Comments</h1>
      <CommentList comments={comments} />
      <CommentInput onSubmit={handleSubmit} />
    </>
  )
}
