import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import SuggestedFoodItem from './SuggestedFoodItem'

class SuggestedFoods extends Component {
  constructor() {
    super()
  }

  renderSuggestedFoodList() {
    const topFiveAverageFoods = this.props.topMostAverageFoodsQuery.topMostAverageFoods;
    console.log(topFiveAverageFoods)
    return (
      <div>
        {topFiveAverageFoods.map((food, idx) => <SuggestedFoodItem food={food} key={food.id} />) }
      </div>
    )
  }

  render() {
    if (this.props.topMostAverageFoodsQuery && this.props.topMostAverageFoodsQuery.loading) {
      return (
        <div>
        <div>Suggested foods based on your diet so far: </div>
        <div>These foods are chosen based on the types of food you have been eating so far, based on macronutrient consumption.</div>
        <div>Loading...</div>
      </div>
      )
    }

    if (this.props.topMostAverageFoodsQuery && this.props.topMostAverageFoodsQuery.error) {
      return (
        <div>
          <div>Suggested foods based on your diet so far: </div>
          <div>These foods are chosen based on the types of food you have been eating so far, based on macronutrient consumption.</div>
          <div>There was an error loading results!</div>
        </div>
      )
    }

    return(
      <div>
        <div>Suggested foods based on your diet so far: </div>
        <div>These foods are chosen based on the types of food you have been eating so far, based on macronutrient consumption</div>
        { this.renderSuggestedFoodList() }
      </div>
    )
  }
}

const TOP_MOST_AVERAGE_FOODS = gql`
  query {
    topMostAverageFoods(limit: 5) {
      name
      averageness_index
      category
      calories
      protein
      carbs
      fat
    }
  }
`;

export default compose(
  graphql(TOP_MOST_AVERAGE_FOODS, { name: 'topMostAverageFoodsQuery' })
)(SuggestedFoods);