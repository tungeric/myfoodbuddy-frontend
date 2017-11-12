import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Meal from './Meal'

class MealIndex extends Component {

  render() {

    if(this.props.allMealsQuery && this.props.allMealsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allMealsQuery && this.props.allMealsQuery.error) {
      return <div>Error</div>
    }

    const mealsToRender = this.props.allMealsQuery.allMeals

    return (
      <div>
        {mealsToRender.map(meal => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    )
  }
}

const ALL_MEALS_QUERY = gql`
query AllMealsQuery {
  allMeals {
    name
    meal_time
    foods {
      name
      calories
    }
  }
}`

export default graphql(ALL_MEALS_QUERY, { name: 'allMealsQuery' })(MealIndex)