import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';

class SuggestedFoodItem extends Component {
  constructor() {
    super()
  }

  render() {
    const food = this.props.food
    console.log(food)
    return (
      <div className="suggested-food-data-container">
        <div className="averagest-food-names">{food.name} ({food.category})</div>
      </div>
    )
  }
}

export default SuggestedFoodItem