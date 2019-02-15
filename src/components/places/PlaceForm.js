import React from 'react'
import ReactFilestack from 'filestack-react'
import MapboxAutocomplete from 'react-mapbox-autocomplete'


const PlaceForm = ({ data, handleChange, handleSubmit, suggestionSelect }) => {
  console.log(data)
  return(
    <div className="columns">
      <div className="column is-6 is-offset-3">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Add a New Place</h2>
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
                publicKey={process.env.MAPBOX_KEY}
                inputClass='form-control search'
                onSuggestionSelect={suggestionSelect}
                resetSearch={false}
                name="geog"
              />
            </div>
          </div>
          <div className="columns add-place">
            <div className="column is-5">

              <button className="button">Submit</button>

            </div>

            <div className="column is-5 is-offset-2">
              <ReactFilestack
                apikey={ `${process.env.FILESTACK_API_KEY}` }
                mode={'pick'}
                onSuccess={(res) => handleChange({
                  target: {
                    name: 'image',
                    value: res.filesUploaded[0].url
                  }})}
                onError={(e) => console.log(e)}
                buttonText={data.image ? 'Image Added': 'Add an Image'}
                buttonClass={data.image ? 'button is-square is-success' : 'button is-square is-info'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceForm


// <div className="field">
//   <label className="label">Image url</label>
//   <div className="control">
//     <input
//       className="input"
//       placeholder="Image url"
//       name="image"
//       onChange={handleChange}
//       value={data.image}
//     />
//   </div>
// </div>
