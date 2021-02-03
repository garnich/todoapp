import React, { FunctionComponent, ReactElement } from 'react'

import './loader.scss'

const Loader: FunctionComponent = (): ReactElement => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  )
}

export default Loader
