import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Meal from './Meal'

class MealIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
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
      <div className="main-body">
        <DatePicker className="calendar"
                    selected = {this.state.startDate}
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
      category
      amount_g
      calories
      protein
      carbs
      fat
    }
  }
}`

export default graphql(ALL_MEALS_QUERY, { name: 'allMealsQuery' })(MealIndex)