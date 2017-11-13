import React, { Component } from 'react'

class MealFoodItem extends Component {
  constructor() {
    super()
  }

  render () {
    const food = this.props.food
    return (
      <div>{food.name}</div>
    )
  }
}

export default MealFoodItem;