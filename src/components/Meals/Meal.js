import React, { Component } from 'react'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import MealFoodItem from './MealFoodItem';

class Meal extends Component {
  constructor() {
    super()
  }

  renderMealFoods() {
    let foods = this.props.meal.foods;
    if(foods && foods.length > 0) {
      return (
        <div>
          {foods.map((food, idx) => <MealFoodItem key="food.id" food={food} index={idx} />)}
        </div>
      )
    }
  }
  
  render() {
    let formattedDate = moment(this.props.meal.meal_time, 'H:mm').format('LT')
    console.log(this.props.meal)
    return (
      <div className="meal-list-table">
        <div className="meal-header">{formattedDate}: {this.props.meal.name}</div>
        { this.renderMealFoods() }
      </div>
    );
  }

}

export default Meal;