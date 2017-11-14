import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class MealFoodItem extends Component {
  constructor() {
    super()
    this.state = {
      food_id: null
    }
    this._deleteMealFood = this._deleteMealFood.bind(this);
  }

  componentDidMount() {
    this.setState({food_id: this.props.food.id});
  }

  _deleteMealFood = async () => {
    const food_id = parseInt(this.state.food_id)
    const meal_id = parseInt(this.props.meal_id)
    console.log(food_id)
    console.log(meal_id)
    await this.props.deleteMealFoodMutation({
      variables: {
        food_id,
        meal_id
      }
    })
    this.props.getMealsData();
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
        <div className="food-data-delete" onClick={ () => this._deleteMealFood() }><FontAwesome name="trash" /></div>
      </div>
    )
  }
}

const DELETE_MEAL_FOOD_MUTATION = gql`
  mutation DeleteMealFoodMutation($food_id: Int!, $meal_id: Int!) {
    deleteMealFood(
      food_id: $food_id,
      meal_id: $meal_id
    ) {
      food_id
      meal_id
    }
  }
`

export default graphql(DELETE_MEAL_FOOD_MUTATION, { name: 'deleteMealFoodMutation' })(MealFoodItem)