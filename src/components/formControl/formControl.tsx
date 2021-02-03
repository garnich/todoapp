import React, { ChangeEvent, FunctionComponent, ReactElement } from 'react'

import './formControl.scss'

interface IProps {
  placeholder: string,
  searchParam: (data: string) => void
}

const FormControl: FunctionComponent<IProps> = ({placeholder, searchParam}): ReactElement => {
  
  function changeSearch(event: ChangeEvent<HTMLInputElement>): void {
    searchParam(event.target.value)
  }

  return (
    <div className="search">
      <input
        className="form-control"
        placeholder={placeholder}
        onChange={changeSearch}
      />
    </div>
  )
}

export default FormControl
