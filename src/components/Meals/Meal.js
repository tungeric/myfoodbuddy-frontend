import React, { Component } from 'react'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import MealFoodItem from './MealFoodItem';

class Meal extends Component {
  constructor() {
    super()
    this.state= {
      mealCalories: 0,
      mealProtein: 0,
      mealCarbs: 0,
      mealFat: 0,
    }
    this.calculateMealTotals = this.calculateMealTotals.bind(this)
  }

  componentDidMount() {
    this.setState({
      mealCalories: 0,
      mealProtein: 0,
      mealCarbs: 0,
      mealFat: 0
    })
    this.calculateMealTotals()
  }

  componentWillUnmount() {
      this.setState({
      mealCalories: 0,
      mealProtein: 0,
      mealCarbs: 0,
      mealFat: 0
    })
  }

  renderMealFoods() {
    let foods = this.props.meal.foods;
    if(foods && foods.length > 0) {
      return (
        <div className="food-list">
          {foods.map((food, idx) => <MealFoodItem key="food.id" food={food} index={idx} />)}
          (Add food)
        </div>
      )
    } else {
      return (
        <div className="food-list">
          No food logged for {this.props.meal.name}!
          (Add food)
        </div>
      )
    }
  }

  calculateMealTotals() {
    let meal = this.props.meal
    meal.foods.forEach(async (food) => {
      this.setState((prevState, props) => ({
        mealCalories: prevState.mealCalories + food.calories,
        mealProtein: prevState.mealProtein + food.protein,
        mealCarbs: prevState.mealCarbs + food.carbs,
        mealFat: prevState.mealFat + food.fat,
      }))
    })
  }

  pad(num) {
    return (num < 10) ? '0' + num.toString() : num.toString();
  }

  renderMealNutritionTotals() {
    console.log(this.state.mealCalories)
    return (
      <div className="meal-nutrition-totals">
        <div className="meal-nutrition-totals-name">Meal Total:</div>
        <div className="meal-nutrition-totals-cat"></div>
        <div className="meal-nutrition-totals-cals">{this.state.mealCalories}</div>
        <div className="meal-nutrition-totals-pro">{this.state.mealProtein}</div>
        <div className="meal-nutrition-totals-car">{this.state.mealCarbs}</div>
        <div className="meal-nutrition-totals-fat">{this.state.mealFat}</div>
      </div>
    )
  }
  
  render() {
    let mealTime = this.props.meal.meal_time_since_epoch;
    let date = new Date()
    date.setUTCSeconds(mealTime)
    let hours = date.getHours()
    let minutes = this.pad(date.getMinutes())
    let ampm = hours >= 12 && hours < 24 ? 'PM' : 'AM'
    hours = hours%12 === 0 ? 12 : hours%12
    return (
      <div className="meal-list-table">
        <div className="meal-header">{hours}:{minutes} {ampm} - {this.props.meal.name}</div>
        <div className="meal-data-title-bar">
          <div className="meal-data-titles-name"></div>
          <div className="meal-data-titles-cat">Category</div>
          <div className="meal-data-titles-cals">Calories (kCal)</div>
          <div className="meal-data-titles-pro">Protein (g)</div>
          <div className="meal-data-titles-car">Carbs (g)</div>
          <div className="meal-data-titles-fat">Fat (g)</div>
        </div>
        { this.renderMealFoods() }
        { this.renderMealNutritionTotals() }
      </div>
    );
  }

}

export default Meal;