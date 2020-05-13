import React from 'react'
import { Route } from 'react-router-dom'


function Root() {
  return (
  <>
    <h1>Petful</h1>
    <main>
      <Route
        exact
        path={'/'}
        // component={landingPage}
        />
        <Route
          exact
          path={'/adopt'}
          // component={Adopt}
          />
    </main>
  </>
  )
}

export default Root
