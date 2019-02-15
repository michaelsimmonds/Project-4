import React from 'react'

const PlacesComment = ({comment}) => {
  console.log(comment)
  const { user, text, createdAt } = comment
  return(
    <div>
      <p>{user}</p>
      <p>{createdAt}</p>
      <p>{text}</p>
    </div>
  )
}

export default PlacesComment
