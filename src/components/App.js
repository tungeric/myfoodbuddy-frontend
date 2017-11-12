import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import MealIndex from './Meals/MealIndex'
import CreateFood from './Foods/CreateFood'


class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' component={MealIndex} />
            <Route exact path='/create' component={CreateFood} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App