import React from 'react'

export default function CommentInput({onSubmit}) {
  const [comment, setComment] = React.useState('')
  const handleInputChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    onSubmit({e, comment})
    setComment('')
  }
  return (
    <form>
      <input onChange={handleInputChange} value={comment} />
      <button type="submit" onClick={handleSubmit}>
        add comment
      </button>
    </form>
  )
}
