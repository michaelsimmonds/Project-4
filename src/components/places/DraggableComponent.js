import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import Auth from '../../lib/Auth'
import PlaceCard from './PlaceCard'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class DraggableComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        places: []
      }
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    // dropped outside the list
    console.log(result)
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

  componentDidMount(){

    const user = Auth.getPayload()
    axios(`/api/users/${Auth.getPayload().sub}`)
      .then(({ data }) => this.setState({ user: data }))
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    console.log(this.state.items)
    console.log(this.state.user)
    return (
      <section className="section">
        <div className="container dash-container">

            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(provided, snapshot) => (

                  <div className="columns" ref={provided.innerRef}>
                  <div className="column is-three-quarter">
                    <h1>Map goes here</h1>
                  </div>
                  <div className="column is-one-quarter">
                    {this.state.user && this.state.user.places.map((item, index) => (
                      <Draggable key={index+1} draggableId={index+1} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PlaceCard {...item} frontOnly="true"/>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
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

export default DraggableComponent
