import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Home extends Component {

  render() {
    return (
      <div className="splash-container">
        <div className="splash-quote">
          A friend you feed is a friend indeed
        </div>
        <div className="splash-ui">
          <div className="splash-ui-header">
            What would you like to do?
          </div>
          <div className="splash-ui-options">
            <Link to='/meals' className='splash-ui-button'>
              <div className="splash-ui-link-text-meals">Track and log meals</div>
            </Link>
            <div to='/data' className='splash-ui-button'>
              <Link to='/trends' className='splash-ui-button'>
                <div className="splash-ui-link-text-data">Analyze your trends=</div>
              </Link>
            </div>
            <Link to='/create' className='splash-ui-button'>
              <div className="splash-ui-link-text-food">Customize food</div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Home)