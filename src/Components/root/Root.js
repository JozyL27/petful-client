import React from 'react'
import { Route, Link } from 'react-router-dom'
import Landing from '../Landing/Landing'
import Adopt from '../Adopt/Adopt'
import './Root.css'

function Root() {
  return (
  <>
    <h1 className='headerH1'>
      <Link to='/' className='headerH1'>
          Petful
      </Link>
    </h1>
    <main>
      <Route
        exact
        path={'/'}
        component={Landing}
        />
        <Route
          exact
          path={'/adopt'}
          component={Adopt}
          />
    </main>
  </>
  )
}

export default Root
