import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Meal from './Meal'

class MealIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
  }

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
        <DatePicker selected = {this.state.startDate}
                    onChange={this.handleDateChange}/>
        <div>
          {mealsToRender.map(meal => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    );
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