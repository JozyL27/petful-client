import React from 'react'
import { Route } from 'react-router-dom'
import Landing from '../Landing/Landing'
import Adopt from '../Adopt/Adopt'

function Root() {
  return (
  <>
    <h1>Petful</h1>
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
