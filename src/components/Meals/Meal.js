import React, { Component } from 'react'

import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-modal';
import AddFoodToMealForm from '../Foods/AddFoodToMealForm';
import MealFoodItem from './MealFoodItem';

class Meal extends Component {
  constructor() {
    super()
    this.state= {
      modalIsOpen: false,
      mealCalories: 0,
      mealProtein: 0,
      mealCarbs: 0,
      mealFat: 0,
    }
    this.calculateMealTotals = this.calculateMealTotals.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderAddFoodModal = this.renderAddFoodModal.bind(this);
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
        modalIsOpen: false,
        mealCalories: 0,
        mealProtein: 0,
        mealCarbs: 0,
        mealFat: 0
    })
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
    this.props.getMealsData();
  }

  renderAddFoodModal() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AddFoodToMealForm closeModal={this.closeModal} meal={this.props.meal}/> 
      </Modal>
    )
  }

  renderMealFoods() {
    let foods = this.props.meal.foods;
    if(foods && foods.length > 0) {
      return (
        <div className="food-list">
          {foods.map((food, idx) => <MealFoodItem key="food.id" 
              getMealsData={this.props.getMealsData} 
              food={food}
              meal_id = {this.props.meal.id}
              index={idx} />)}
          <div className="add-food" onClick={this.openModal}>
            <FontAwesome name="plus-circle"/> Add Food
          </div>
          { this.renderAddFoodModal() }
        </div>
      )
    } else {
      return (
        <div className="food-list">
          <div>No food logged for {this.props.meal.name}!</div>
          <div className="add-food" onClick={this.openModal}>
            <FontAwesome name="plus-circle" /> Add Food
          </div>
          { this.renderAddFoodModal() }
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
    // console.log(moment(mealTime).format("H:mm A"))
    let formattedTime = moment(mealTime).locale('en').format("h:mm A")
    return (
      <div className="meal-list-table">
        <div className="meal-header">{formattedTime} - {this.props.meal.name}</div>
        <div className="meal-data-title-bar">
          <div className="meal-data-titles-name"></div>
          <div className="meal-data-titles-cat">Category</div>
          <div className="meal-data-titles-cals">Calories (kCal)</div>
          <div className="meal-data-titles-pro">Protein (g)</div>
          <div className="meal-data-titles-car">Carbs (g)</div>
          <div className="meal-data-titles-fat">Fat (g)</div>
          <div className="meal-data-titles-delete"></div>
        </div>
        { this.renderMealFoods() }
        { this.renderMealNutritionTotals() }
      </div>
    );
  }

}

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

export default Meal;