import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import CreateMeal from './CreateMeal';

// const HOURS = Array.from(new Array(12), (val, index) => index).map((n) => { return n+1 });
// const MINUTES = Array.from(new Array(4), (val, index) => index).map((n) => { return n * 15 });

class AddMealForm extends Component {
  constructor() {
    super()
    this.state = {
      date: moment(),
      selectedMealType: null
    }
    this._updateDate = this._updateDate.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleMealTypeSelection = this.handleMealTypeSelection.bind(this)
  }

  componentDidMount() {
    this.setState({
      date: this.props.date
    })
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
    const a = await this.setState({
      date: date,
    });
  }

  handleMealTypeSelection = async(e) => {
    let selectedMealType = e.target.value
    const a = await this.setState({ selectedMealType: selectedMealType })
  }

  render() {
    console.log("STATE: ", this.state.date.unix())
    return(
      <div className="add-meal-form-container">
        <div className="add-meal-form-header">Add Meal</div>
        <form className="add-meal-form">
          <select value={this.state.selectedFood} onChange={this.handleMealTypeSelection}>
            <option value="" selected disabled>Choose a Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Brunch">Brunch</option>
            <option value="Lunch">Lunch</option>
            <option value="Snack">Snack</option>
            <option value="Dinner">Dinner</option>
          </select>
          <DatePicker className="add-meals-calendar"
                      selected={this.state.date} 
                      onChange={this.handleDateChange} 
                      showTimeSelect
                      timeFormat="H:mm"
                      timeIntervals={15}
                      dateFormat="LLLL" />
        </form>
        <CreateMeal closeModal={this.props.closeModal}
          name={this.state.selectedMealType}
          mealTime={this.state.date.unix()}/>
      </div>
    )
  }
}

export default withApollo(AddMealForm)