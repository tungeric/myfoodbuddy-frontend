import React, { Component } from 'react'

import DatePicker from 'react-datepicker';
import moment from 'moment';

class Meal extends Component {

  render() {
    let formattedDate = moment(this.props.meal.meal_time_since_epoch, 'M/D/YYYY H:mm')

    return (
      <div>
        <div>{this.props.meal.name}</div>
      </div>
    );
  }

}

export default Meal;