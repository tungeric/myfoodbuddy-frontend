import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateMeal extends Component {

  state = {
    name: this.props.name,
    mealTime: this.props.mealTime,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mealTime !== this.state.mealTime || nextProps.name !== this.state.name) {
      this.setState({
        name: nextProps.name,
        mealTime: nextProps.mealTime
      })
    }
  }

  render() {
    if (this.state.mealTime !== null && this.state.name !== null) {
      return (
        <div className="create-meal-btn"
          onClick={() => this._createMeal()}>
          Add
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  _createMeal = async () => {
    const name = this.state.name
    const mealTime = this.state.mealTime
    await this.props.createMealMutation({
      variables: {
        name,
        mealTime
      }
    })
    this.props.closeModal()
  }
}

const CREATE_MEAL_MUTATION = gql`
  mutation CreateMealMutation($name: String!, $mealTime: Float) {
  createMeal (
    name: $name
    meal_time: $mealTime
  ) {
    name
    meal_time
  }
}
`

export default graphql(CREATE_MEAL_MUTATION, { name: 'createMealMutation' })(CreateMeal)