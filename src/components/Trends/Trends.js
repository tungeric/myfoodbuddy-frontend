import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import * as d3 from 'd3'

import DatePicker from 'react-datepicker';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

class Trends extends Component {
  constructor() {
    super();
    this.state = {
      type: "Calories",
      data: []
    };
  }

  componentDidMount() {
    const unixStartOfLastDay = moment().startOf('day').format('x');
    let unixDaysInWeek = [];
    let i=0;
    while(i < 7) {
      unixDaysInWeek.push(unixStartOfLastDay - i * 86740000);
      i+=1;
    }
    unixDaysInWeek = unixDaysInWeek.reverse();
    console.log(unixDaysInWeek);

    // const base = d3.select(".trends");
    // const part1 = base.append("div")
    //   .attr("class", "test-div")
    //   .attr("width", 600)
    //   .attr("height", 600)
    //   .style("background-color","green");

    // const data = [25, 33, 21, 17, 9];
    // const scale = 5;

    // part1.append("g")
    //   .selectAll("g")
    //   .data(data)
    //   .enter()
    //   .append("div")
    //   .attr("class","bar")
    //   .style("height", function(d) { return d * scale + "px";})
    //   .style("width", "100px")
    //   .style("background-color","blue")
    //   .text(function(d) { return d; });
  }

  render() {
    console.log("START OF TODAY:", moment().startOf('day').format('x'))
    if (this.props.allMealsQuery && this.props.allMealsQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allMealsQuery && this.props.allMealsQuery.error) {
      return <div>Error</div>
    }

    const mealsToRender = this.props.allMealsQuery.allMeals;
    console.log(mealsToRender)

    return (
      <div className="trends">
        {mealsToRender.map(meal => (
          <div>{meal.meal_time_since_epoch}...</div>
        ))}
      </div>
    )
  }
}

const ALL_MEALS_QUERY = gql`
query AllMealsQuery {
  allMeals {
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
}`

export default graphql(ALL_MEALS_QUERY, { name: 'allMealsQuery' })(Trends);