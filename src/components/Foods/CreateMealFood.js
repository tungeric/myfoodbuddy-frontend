import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateMealFood extends Component {

  state = {
    food_id: this.props.food_id,
    meal_id: this.props.meal_id,
    num_servings: 1
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Food name'
          />
          <input
            className='mb2'
            value={this.state.category}
            onChange={(e) => this.setState({ category: e.target.value })}
            type='text'
            placeholder='Category'
          />
          <input
            className='mb2'
            value={this.state.amount_g}
            onChange={(e) => this.setState({ amount_g: e.target.value })}
            type='number'
            placeholder='Food amount (g)'
          />
          <input
            className='mb2'
            value={this.state.calories}
            onChange={(e) => this.setState({ calories: e.target.value })}
            type='number'
            placeholder='Calories (kCal)'
          />
          <input
            className='mb2'
            value={this.state.protein}
            onChange={(e) => this.setState({ protein: e.target.value })}
            type='number'
            placeholder='Protein (g)'
          />
          <input
            className='mb2'
            value={this.state.carbs}
            onChange={(e) => this.setState({ carbs: e.target.value })}
            type='number'
            placeholder='Carbs (g)'
          />
          <input
            className='mb2'
            value={this.state.fat}
            onChange={(e) => this.setState({ fat: e.target.value })}
            type='number'
            placeholder='Fat (g)'
          />
        </div>
        <button
          onClick={() => this._createFood()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createFood = async () => {
    const { name, category, amount_g, calories, protein, carbs, fat } = this.state
    await this.props.createFoodMutation({
      variables: {
        name,
        category,
        amount_g,
        calories,
        protein,
        carbs,
        fat
      }
    })
  }

}

const CREATE_FOOD_MUTATION = gql`
  mutation CreateFoodMutation($name: String!, $category: String, $amount_g: Int!, $calories: Int, $protein: Int, $carbs: Int, $fat: Int) {
  createFood (
    name: $name
    category: $category
    amount_g: $amount_g
    calories: $calories
    protein: $protein
    carbs: $carbs
    fat: $fat
  ) {
    id
    name
    category
    amount_g
    calories
    protein
    carbs
    fat
  }
}
`

export default graphql(CREATE_FOOD_MUTATION, { name: 'createFoodMutation' })(CreateFood)