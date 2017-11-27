import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import DatePicker from 'react-datepicker';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import Modal from 'react-modal';

import Meal from './Meal'
import AddMealForm from './AddMealForm'
import SuggestedFoods from './SuggestedFoods'

class DayMealsIndex extends Component {
  constructor() {
    super()
    this.state = {
      meals: [],
      date: moment(),
      dayStart: 0,
      dayEnd: 0,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      modalIsOpen: false
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this._updateDate = this._updateDate.bind(this);
    this.calculateTotals = this.calculateTotals.bind(this);
    this.getMealsData = this.getMealsData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderAddMealModal = this.renderAddMealModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.getMealsData();
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
      dayStart: dayStart,
      dayEnd: dayEnd
    });
    this.getMealsData()
  }

  getMealsData = async () => {
    let dayStart = this.state.dayStart+1-1
    let dayEnd = this.state.dayEnd
    const clearCache = await this.props.client.resetStore()
    const result = await this.props.client.query({
      query: ALL_DAY_MEALS_QUERY,
      variables: { dayStart, dayEnd }
    })
    const meals = result.data.allDayMeals
    console.log("MEALS:", meals)
    this.setState({ meals })
    this.calculateTotals(meals)
  }

  calculateTotals = async(meals) => {
    const a = await this.setState({
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0
    })
    meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        this.setState({
          totalCalories: this.state.totalCalories + food.calories,
          totalProtein: this.state.totalProtein + food.protein,
          totalCarbs: this.state.totalCarbs + food.carbs,
          totalFat: this.state.totalFat + food.fat,
        })
      })
    })
  }

  componentDidMount() {
    this.handleDateChange(moment());
  }

  renderMealList() {
    if(this.state.meals.length > 0) {
      return (
        <div>
          <div className="meal-list-content">
            { this.state.meals.map((meal, idx) => <Meal getMealsData={this.getMealsData} key={meal.id} meal={meal} index={idx} />) }
          </div>
          <SuggestedFoods/>
        </div>
      )
    } else {
      return (
        <div className="no-meals">
          No meals recorded today!
        </div>
      )
    }
  }

  renderNutritionTotals() {
    return (
      <div className="nutrition-totals">
        <div className="nutrition-totals-name"></div>
        <div className="nutrition-totals-cal">{this.state.totalCalories} calories</div>
        <div className="nutrition-totals-pro">{this.state.totalProtein} g of protein</div>
        <div className="nutrition-totals-car">{this.state.totalCarbs} g of carbohydrates</div>
        <div className="nutrition-totals-fat">{this.state.totalFat} g of fat</div>
      </div>
    )
  }

  renderAddMealModal() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AddMealForm closeModal={this.closeModal} date={this.state.date}/>
      </Modal>
    )
  }

  render () {
    return (
      <div className="meal-main-body">
        <div className="meal-left">
          <div className="meal-date-select">
            <div className="meal-greeting">Track your meals on:</div>
            <DatePicker className="calendar"
              selected={this.state.date}
              onChange={this.handleDateChange} />
          </div>
          { this.renderNutritionTotals() }
        </div>
        <div className="meal-right">
          <div className="meal-list-header">
            Here's what you ate on {this.state.date.format('LL')}
          </div>
          <div>
            { this.renderMealList() }
            <div className="add-meal" onClick={this.openModal}>
              <FontAwesome name="cutlery"/> Add Meal
            </div>
            { this.renderAddMealModal() }
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
      id
      name
      meal_time
      meal_time_since_epoch
      foods {
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
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default withApollo(DayMealsIndex)