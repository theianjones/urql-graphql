import React from 'react'

export default function CommentsList({comments = []}) {
  return (
    <ul style={{listStyle: 'none', padding: 0}}>
      {comments.map((comment) => {
        return (
          <li
            key={comment.id}
            style={{
              padding: '5px 0px',
              display: 'flex',
            }}
          >
            <strong>{comment.author.login}:</strong>
            <div style={{marginLeft: 5}}>{comment.body}</div>
          </li>
        )
      })}
    </ul>
  )
}
