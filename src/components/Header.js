import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {

  render() {
    return (
      <div className='header'>
        <div className='header-text'>
          <Link to='/' className='header-link-container'>
            <div className='header-logo'>myfoodbuddy</div>
          </Link>
          <div className='header-right'>
            <Link to='/meals' className='header-link-container'>
              <div className = 'header-link'>Track Meals</div>
            </Link>
            <Link to='/trends' className='header-link-container'>
              <div className='header-link'>Analyze Trends</div>
            </Link>
            <Link to='/create' className='header-link-container'>
              <div className = 'header-link'>Create Food</div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Header)