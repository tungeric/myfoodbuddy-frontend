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
      date: moment()
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      date: date
    });
  }

  render() {
    if(this.props.allMealsQuery && this.props.allMealsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allMealsQuery && this.props.allMealsQuery.error) {
      return <div>Error</div>
    }

    // console.log(this.state.date.unix()*1000) // gets you time since epoch
    // console.log(this.state.date.format("M/D/YYYY H:mm")) // gets you date in that format
    let date = this.state.date.format('M/D/YYYY')
    let dayStart = moment(date + "0:00", "M/D/YYYY H:mm").valueOf();
    let dayEnd = moment(date + "23:59", "M/D/YYYY H:mm").valueOf();
    let dayStartSinceEpoch = moment(dayStart).unix()*1000;
    let dayEndSinceEpoch = moment(dayEnd).unix()*1000;
    const mealsToRender = this.props.allMealsQuery.allMeals
    
    return (
      <div className="main-body">
        <DatePicker className="calendar"
                    selected = {this.state.date}
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
}`

export default graphql(ALL_MEALS_QUERY, { name: 'allMealsQuery' })(MealIndex)