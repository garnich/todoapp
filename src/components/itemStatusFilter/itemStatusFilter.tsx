import React, { FunctionComponent, ReactElement } from 'react'

import './itemStatusFlter.scss'

interface IProps {
  filter: string,
  onFilterChange: (param: string) => void
}

const buttons = [
  { name: 'all', label: 'All' },
  { name: 'todo', label: 'ToDo' },
  { name: 'done', label: 'Done' },
]

const ItemStatusFilter:FunctionComponent<IProps> = ({filter, onFilterChange}): ReactElement => {
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

export default ItemStatusFilter
