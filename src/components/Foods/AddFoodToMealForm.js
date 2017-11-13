import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

class AddFoodToMealForm extends Component {
  constructor() {
    super()
    this.state= {
      foods: [],
      categoryIs: '',
      nameContains: '',
    }
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
    this.handleSearchText = this.handleSearchText.bind(this)
    this.executeSearch = this.executeSearch.bind(this)
    this.renderSearch = this.renderSearch.bind(this)
  }

  componentDidMount() {
    this.executeSearch()
  }
  componentWillUnMount() {
    this.setState({ categoryIs: '', nameContains: '' })
  }
  
  handleCategorySelect = async(e) => {
    let categoryIs = e.currentTarget.innerText
    const a = await this.setState({ categoryIs: categoryIs })
    this.executeSearch()
  }

  handleSearchText = async(e) => {
    let nameContains = e.target.value
    const a = await this.setState({ nameContains: nameContains })
    this.executeSearch()
  }

  executeSearch = async() => {
    const { categoryIs, nameContains } = this.state
    const result = await this.props.client.query({
      query: ALL_FOODS_SEARCH_QUERY,
      variables: { categoryIs, nameContains }
    })
    const foods = result.data.foodSearch
    this.setState({ foods })
  }

  renderSearch() {
    if(this.state.categoryIs !== '') {
      return (
        <div className="search">
          <input type="text" onChange={this.handleSearchText} placeholder="Search..."/>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }
  render() {
    console.log(this.state.foods)
    return(
      <div>
        <div className="add-food-header">Add Food</div>
        <div className="add-food-category-select">
          <div className="add-food-category-select-title">Choose a category</div>
          <div className="add-food-category-options">
            <form className="food-category-meat" value="Meat" onClick={this.handleCategorySelect}>Meat</form>
            <form className="food-category-veg" value="Vegetables" onClick={this.handleCategorySelect}>Vegetables</form>
            <form className="food-category-fruit" value="Fruit" onClick={this.handleCategorySelect}>Fruit</form>
            <form className="food-category-grain" value="Grain" onClick={this.handleCategorySelect}>Grain</form>
            <form className="food-category-misc" value="Misc" onClick={this.handleCategorySelect}>Misc</form>
          </div>
        </div>
        { this.renderSearch() }
      </div>
    )
  }
}

const ALL_FOODS_SEARCH_QUERY = gql`
  query AllFoodSearchQuery($categoryIs: String, $nameContains: String) {
    foodSearch (filter: { category_is: $categoryIs, name_contains: $nameContains }) {
      name
      category
      amount_g
    }
  }
`

export default withApollo(AddFoodToMealForm)