import React from 'react'

const DisplayTweets = ({image, name, text, created, screenName}) => {

  return(

    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={image}/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">{screenName}</p>
          </div>
        </div>

        <div className="content">
          <a>{text}</a>.
          <br/>
          <time>{created}</time>
        </div>
      </div>
    </div>

  )
}

export default DisplayTweets
