import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateFood extends Component {

  state = {
    name: '',
    category: '',
    amount_g: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  }

  render() {
    return (
      <div className="create-food-page">
        <div className='create-food-form'>
          <h1>Create Custom Food</h1>
          <input
            className='mb2'
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Food name'
          />
          
          <select className="mb2" name="category" 
                  onChange={(e) => this.setState({ category: e.target.value })}>
            <option value="" selected disabled>Choose a Category...</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Grain">Grain</option>
            <option value="Misc">Misc</option>
          </select>
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
        <button
          onClick={() => this._createFood()}
        >
          Submit
        </button>
        </div>
      </div>
    )
  }

  _createFood = async () => {
    let { name, category, amount_g, calories, protein, carbs, fat } = this.state
    amount_g = parseInt(amount_g)
    calories = parseInt(calories)
    protein = parseInt(protein)
    carbs = parseInt(carbs)
    fat = parseInt(fat)
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
    this.props.history.push(`/meals`);
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