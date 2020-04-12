import React from 'react'

import './footer.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="col-12 page-footer font-small blue fixed-bottom">
      <p>{`Minsk ${year}`}</p>
    </footer>
  )
}

export default Footer
