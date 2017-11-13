import React, { Component } from 'react'

class Meal extends Component {

  render() {
    return (
      <div>
        <div>{this.props.meal.name} ({this.props.meal.meal_time_since_epoch})</div>
      </div>
    );
  }

}

export default Meal;