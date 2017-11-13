import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateMealFood extends Component {

  state = {
    foodId: this.props.foodId,
    mealId: this.props.mealId,
    numServings: 1
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.foodId !== this.state.foodId || nextProps.mealId !== this.state.mealId) {
      this.setState({
        foodId: nextProps.foodId,
        mealId: nextProps.mealId
      })
    }
  }

  render() {
    console.log(this.state.foodId !== null && this.state.mealId !== null)
    if(this.state.foodId !== null && this.state.mealId !== null) {
      return (
        <div className="create-meal-food-btn"
            onClick={() => this._createMealFood()}>
            Add
        </div>
      ) 
    } else {
      return (
        <div></div>
      )
    }
  }

  _createMealFood = async () => {
    const foodId = parseInt(this.state.foodId)
    const mealId = parseInt(this.state.mealId)
    const numServings = this.state.numServings
    await this.props.createMealFoodMutation({
      variables: {
        foodId,
        mealId,
        numServings
      }
    })
  }
}

const CREATE_MEAL_FOOD_MUTATION = gql`
  mutation CreateMealFoodMutation($foodId: Int!, $mealId: Int!, $numServings: Int!) {
  createMealFood (
    food_id: $foodId
    meal_id: $mealId
    num_servings: $numServings
  ) {
    food_id
    meal_id
    num_servings
  }
}
`

export default graphql(CREATE_MEAL_FOOD_MUTATION, { name: 'createMealFoodMutation' })(CreateMealFood)