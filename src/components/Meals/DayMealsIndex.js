import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import Meal from './Meal'

class DayMealsIndex extends Component {
  constructor() {
    super()
    this.state = {
      meals: [],
      date: moment(),
      dayStart: 0,
      dayEnd: 0
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this._updateDate = this._updateDate.bind(this);
  }

  handleDateChange(date) {
    this._updateDate(date)
  }

  _updateDate = async (date) => {
    let formattedDate = date.format('M/D/YYYY')
    let dayStartValue = moment(formattedDate + "0:00", "M/D/YYYY H:mm").valueOf();
    let dayEndValue = moment(formattedDate + "23:59", "M/D/YYYY H:mm").valueOf();
    let dayStart = moment(dayStartValue).unix() * 1000;
    let dayEnd = moment(dayEndValue).unix() * 1000;
    this.setState({
      date: date,
      dayStart: dayStart,
      dayEnd: dayEnd
    });
    const result = await this.props.client.query({
      query: ALL_DAY_MEALS_QUERY,
      variables: { dayStart, dayEnd }
    })
    console.log("RESULT: ", result)
    const meals = result.data.allDayMeals
    this.setState({ meals })
  }

  componentDidMount() {
    this.handleDateChange(moment());
  }

  renderMealList() {
    if(this.state.meals.length > 0) {
      return (
        <div>
          { this.state.meals.map((meal, idx) => <Meal key="meal.id" meal={meal} index={idx} />) }
        </div>
      )
    } else {
      return (
        <div>
          No meals recorded today!
        </div>
      )
    }
  }

  render () {
    console.log("STATE: ",this.state)
    return (
      <div className="meal-main-body">
        <div className="meal-left">
          <div className="meal-greeting">Track your meals on:</div>
          <DatePicker className="calendar"
            selected={this.state.date}
            onChange={this.handleDateChange} />
        </div>
        <div className="meal-right">
          <div className="meal-list-header">
            { this.renderMealList() }
          </div>
        </div>
      </div>
    )
  }
}

const ALL_DAY_MEALS_QUERY = gql`
  query AllDayMealsQuery($dayStart: Float!, $dayEnd: Float!) {
    allDayMeals(filter: {
      meal_time_after: $dayStart
      meal_time_before: $dayEnd
    }) {
      name
      meal_time
      meal_time_since_epoch
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
  }
`

export default withApollo(DayMealsIndex)