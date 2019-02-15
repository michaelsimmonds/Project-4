import React from 'react'

const PlacesComment = ({comment}) => {
  const { user, text, createdAt } = comment
  const formattedDate = createdAt.replace('T', ' At ').replace('Z', '')
  return(
    <div className="comment">
      <p>{user.username}</p>
      <p>{formattedDate}</p>
      <p>{text}</p>
    </div>
  )
}

export default PlacesComment
