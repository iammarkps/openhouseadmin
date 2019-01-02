import React from 'react'
import * as fiery from 'fiery'

import { firebase } from '../lib/firebase'

export const AuthRequired = props => (
  <fiery.Auth>
    {authState =>
      fiery.unwrap(authState, {
        loading: () => <h1>Loading authentication state...</h1>,
        error: () => <h1>ERROR!</h1>,
        completed: user =>
          user ? (
            props.children
          ) : (
            <div>
              You must sign in to continue:{' '}
              <button onClick={authenticateWithGoogle}>
                Sign in with Google
              </button>
            </div>
          )
      })
    }
  </fiery.Auth>
)

function authenticateWithGoogle() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
}
