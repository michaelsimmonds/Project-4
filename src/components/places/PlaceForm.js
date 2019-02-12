import React from 'react'

import MapboxAutocomplete from 'react-mapbox-autocomplete'

const PlaceForm = ({ data, handleChange, handleSubmit, suggestionSelect }) => {
  return(
    <form onSubmit={handleSubmit}>

      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={data.name}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Country</label>
        <div className="control">
          <input
            className="input"
            placeholder="Country"
            name="country"
            onChange={handleChange}
            value={data.country}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Image url</label>
        <div className="control">
          <input
            className="input"
            placeholder="Image url"
            name="image"
            onChange={handleChange}
            value={data.image}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Short Description</label>
        <div className="control">
          <input
            className="input"
            placeholder="Short Description"
            name="descriptShort"
            onChange={handleChange}
            value={data.descriptShort}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Long Description</label>
        <div className="control">
          <input
            className="input"
            placeholder="Long Description"
            name="descriptLong"
            onChange={handleChange}
            value={data.descriptLong}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Please select a location</label>
        <div className="control">
          <MapboxAutocomplete
            className="input"
            publicKey={process.env.MAPBOX_KEY}
            inputClass='form-control search'
            onSuggestionSelect={suggestionSelect}
            resetSearch={false}
            name="geog"
          />
        </div>
      </div>

      <button>Submit</button>

    </form>
  )
}

export default PlaceForm
