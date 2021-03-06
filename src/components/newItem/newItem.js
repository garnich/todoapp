import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './newItem.scss'

export default class NewItem extends Component {
  constructor() {
    super()

    this.state = {
      label: '',
    }

    this.onLabelchange = e => {
      this.setState({
        label: e.target.value,
      })
    }

    this.onSubmit = e => {
      e.preventDefault()
      if (this.state.label === '') {
        alert("You can't add EMPTY task!")
        return null
      }
      this.props.addNewItem(this.state.label)
      this.setState({
        label: '',
      })
    }

    this.onClick = e => {
      e.preventDefault()
      if (this.state.label === '') {
        alert("You can't add EMPTY task!")
        return null
      }
      this.props.addNewItem(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelchange}
          placeholder={'Add new task'}
          value={this.state.label}
        />
        <button
          className="new-item btn btn-outline-secondary"
          onClick={this.onClick}
        >
          Add item
        </button>
      </form>
    )
  }
}

NewItem.propTypes = {
  addNewItem: PropTypes.func.isRequired,
}
