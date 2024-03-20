import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark position-sticky top-0 left-0 right-0">
      <div className="container">
        <Link className="navbar-brand" href="/">Blog</Link>
      </div>
    </nav>
  )
}

export default Header