import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './formControl.css'

export default class FormControl extends Component {
  constructor() {
    super()

    this.changeSearch = e => {
      this.props.searchParam(e.target.value)
    }
  }
  render() {
    return (
      <div className="search">
        <input
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.changeSearch}
        />
      </div>
    )
  }
}

FormControl.propTypes = {
  searchParam: PropTypes.func.isRequired,
}
