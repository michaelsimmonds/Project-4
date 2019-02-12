import React from 'react'
import PlaceCard from './places/PlaceCard'

const UserTrips = ({places}) => {
  console.log(places)
  return(
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {places.map(place =>
            <div className="column is-one-quarter" key={place._id}>
              <PlaceCard {...place} frontOnly="true"/>

            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserTrips
