import React, { Component } from 'react'

class Meal extends Component {

  render() {
    return (
      <div>
        <div>{this.props.meal.name} ({this.props.meal.meal_time})</div>
      </div>
    );
  }

}

export default Meal;