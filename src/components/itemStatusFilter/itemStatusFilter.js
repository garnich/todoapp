import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './itemStatusFlter.scss'

export default class ItemStatusFilter extends Component {
  render() {
    const buttons = [
      { name: 'all', label: 'All' },
      { name: 'todo', label: 'ToDo' },
      { name: 'done', label: 'Done' },
    ]

    const { filter, onFilterChange } = this.props

    const button = buttons.map(({ name, label }) => {
      const isActive = filter === name
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      )
    })
    return <div className="btn-group">{button}</div>
  }
}

ItemStatusFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}
