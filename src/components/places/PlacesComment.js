import React from 'react'

const PlacesComment = ({comment}) => {
  console.log(comment)
  const { user, text } = comment
  return(
    <div>
      <p>{user}</p>
      <p>{text}</p>
    </div>
  )
}

export default PlacesComment
