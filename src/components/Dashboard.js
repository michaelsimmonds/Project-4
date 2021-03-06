import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import Auth from '../lib/Auth'
import PlaceCard from './places/PlaceCard'
import Loading from './places/Loading'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class Dashboard extends Component{

  constructor(props){
    super(props)

    this.state = {
      markersCoord: [],
      map: {},
      mapDOMElement: '',
      user: {
        places: []
      }
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.user.places,
      result.source.index,
      result.destination.index
    )

    this.setState({user: {...this.state.user, places: [...items]} })
  }

  calculateDirection(){
    const opposite = this.markersCoord[1].lat - this.markersCoord[0].lat
    const adjacent = this.markersCoord[1].lng - this.markersCoord[0].lng

    return {
      angle: Math.atan(opposite / adjacent),
      direction: this.markersCoord[1].lng - this.markersCoord[0].lng > 0 ? 'east' : 'west'
    }
  }

  drawTrip(map, markers){

    let angle, opposite, adjacent, direction
    const speedFactor = 30 // number of frames per longitude degree
    let startTime = performance.now()
    let progress = 0

    // Create a GeoJSON source with an empty lineString.
    const geojson = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            [markers[0].lng, markers[0].lat]
          ] //Starting point
        }
      }]
    }
    // add the line which will be modified in the animation
    map.addLayer({
      'id': 'line-animation',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': geojson
      },
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#ed6498',
        'line-width': 5,
        'line-opacity': .8
      }
    })

    //Calculate angle of the trajectory
    calculateTrajectory()

    animateLine()

    function calculateTrajectory(){
      opposite = markers[1].lat - markers[0].lat
      adjacent = markers[1].lng - markers[0].lng
      angle = Math.atan(opposite / adjacent)

      if(Math.abs(markers[1].lng - markers[0].lng)
        - Math.abs(markers[1].lat - markers[0].lat) >= 0 ){
        direction = markers[1].lng - markers[0].lng > 0 ? 'west' : 'east'
      } else {
        direction = markers[1].lat - markers[0].lat > 0 ? 'north' : 'south'
      }
    }

    function animateLine(timestamp) {

      progress = timestamp - startTime

      let x, y

      switch(direction){
        case 'north':
          y = progress / speedFactor +  markers[0].lat || markers[0].lat
          x = (y - markers[0].lat)  / Math.tan(angle) + markers[0].lng|| markers[0].lng
          break
        case 'west':
          x =  progress / speedFactor +  markers[0].lng || markers[0].lng
          y = (x - markers[0].lng)  * Math.tan(angle) + markers[0].lat|| markers[0].lat
          break
        case 'south':
          y = - progress / speedFactor +  markers[0].lat || markers[0].lat
          x = (y - markers[0].lat)  / Math.tan(angle) + markers[0].lng|| markers[0].lng
          break
        case 'east':
          x =  - progress / speedFactor +  markers[0].lng || markers[0].lng
          y = (x - markers[0].lng)  * Math.tan(angle) + markers[0].lat|| markers[0].lat
          break
      }

      // append new coordinates to the lineString
      geojson.features[0].geometry.coordinates.push([x, y])
      // then update the map
      map.getSource('line-animation').setData(geojson)

      //
      if(x < markers[1].lng && direction === 'east' ||
        x > markers[1].lng && direction === 'west' ||
        y > markers[1].lat && direction === 'north' ||
        y < markers[1].lat && direction === 'south'
      ){
        markers.shift()
        if(markers.length < 2) return
        startTime = timestamp
        calculateTrajectory()
      }
      // Request the next frame of the animation.
      requestAnimationFrame(animateLine)
    }
  }

  createMarkups(){

    this.markersCoord && this.markersCoord.forEach(geoCoord => {
      const markerDOM = document.createElement('div')
      markerDOM.className = 'custom-marker'
      markerDOM.style.backgroundImage = `url(${geoCoord.image})`

      return new mapboxgl.Marker({element: markerDOM, anchor: 'center'})
        .setLngLat([String(geoCoord.lng), String(geoCoord.lat)])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${geoCoord.name}</h3>`))
        .addTo(this.map)
    })
  }

  createMap(){
    mapboxgl.accessToken = process.env.MAPBOX_KEY
    this.map = new mapboxgl.Map({
      container: this.mapDOMElement,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [15, 24],
      scrollZoom: true,
      zoom: 0.75
    })
  }

  addUserLocationToTrip(coords){
    console.log(coords)
    return this.markersCoord.unshift({
      lat: coords.latitude,
      lng: coords.longitude
    })
  }

  getUserLocation(){
    return new Promise(function (resolve, reject) {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(resolve, reject)
      }
    })
      .then(({coords}) => this.addUserLocationToTrip(coords))
      .catch(err => console.warn(err))
  }

  getMarkerCoords(places){
    return new Promise(resolve => {
      this.markersCoord = places.map(place =>
        ({ lat: place.geog[0], lng: place.geog[1], image: place.image, name: place.name }) //ADDED IMAGE AND NAME HERE
      )
      resolve()
    })
  }

  componentDidMount(){

    axios(`/api/users/${Auth.getPayload().sub}`)
      .then(({ data }) => this.setState({ user: data }))

  }

  componentDidUpdate(){

    this.getMarkerCoords(this.state.user.places)
      .then(() => this.getUserLocation())
      .then(() => this.createMap())
      .then(() => this.createMarkups())
      .then(() => this.map.on('load', () => {
        if(this.markersCoord.length >= 2)
          this.drawTrip(this.map, this.markersCoord)
      }))
  }

  render(){
    if(!this.state.markersCoord) return <Loading />
    return(
      <section className="section">
        <h2 className="title is-1">My Trip</h2>
        <div className="container dash-container">
          <hr />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(provided, snapshot) => (

                <div className="columns" ref={provided.innerRef}>
                  <div className="column is-three-quarter">
                    <div id='map' ref={element => this.mapDOMElement = element}/>
                  </div>
                  <div className="column is-one-quarter">
                    <h4 className="drag-title">Drag & drop the images below to change the order of your trip</h4>
                    <hr />
                    {this.state.user && this.state.user.places.map((item, index) => (
                      <Draggable key={index+1} draggableId={index+1} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PlaceCard {...item}
                              userHasTrip="true"
                              frontOnly="true"
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <Link to='/places'>
                      <div className="add-trip"><i className="fas fa-plus"></i></div>
                    </Link>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
    )
  }
}

export default Dashboard
