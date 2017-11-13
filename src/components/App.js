import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import MealIndex from './Meals/MealIndex'
import DayMealsIndex from './Meals/DayMealsIndex'
import CreateFood from './Foods/CreateFood'


class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/meals' component={DayMealsIndex} />
            <Route exact path='/create' component={CreateFood} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App