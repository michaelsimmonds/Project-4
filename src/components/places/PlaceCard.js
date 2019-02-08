import React from 'react'


import { Link } from 'react-router-dom'

const PlaceCard = ({ _id, name, country, descriptShort, image }) => {
  return(
    <div className="card">
      <Link to={`/places/${_id}`}>
        <div className="card-header">
          <h4 className="card-header-title">{name}</h4>
        </div>
        <div className="card-image">
          <figure className="image" style={{ backgroundImage: `url(${image})`}} />
        </div>
        <div className="card-content">
          <div className="content">
            <p><strong>Name: </strong>{name}</p>
            <p><strong>Country: </strong>{country}</p>
            <p>{descriptShort}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PlaceCard
