import React from 'react'


import { Link } from 'react-router-dom'

const PlaceCard = ({ _id, name, descriptShort, image, frontOnly=false }) => {
  return(
    <div className="flip-container">
      <Link to={`/places/${_id}`}>
        <div className={frontOnly ? '': 'flipper'}>
          <div className="front">
            <figure className="image" style={{ backgroundImage: `url(${image})`}} />
            <div className="text-overlay" id="front">{name}</div>
          </div>
          {!frontOnly && <div className="back">
            <figure className="image" style={{ backgroundImage: `url(${image})`}} />
            <div className="text-overlay" id="back">{descriptShort}</div>
          </div>}
        </div>
      </Link>
    </div>
  )
}



export default PlaceCard
