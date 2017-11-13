import React, { Component } from 'react'

class MealFoodItem extends Component {
  constructor() {
    super()
  }

  render () {
    const food = this.props.food
    return (
      <div className="food-data-container">
        <div className="food-data-name">{food.name} ({food.amount_g} g)</div>
        <div className="food-data-cat">{food.category}</div>
        <div className="food-data-cals">{food.calories}</div>
        <div className="food-data-pro">{food.protein}</div>
        <div className="food-data-car">{food.carbs}</div>
        <div className="food-data-fat">{food.fat}</div>
      </div>
    )
  }
}

export default MealFoodItem;