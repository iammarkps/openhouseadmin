import React from 'react'
import * as fiery from 'fiery'
import { Button, message } from 'antd'

import { firebase } from '../lib/firebase'

export const AuthRequired = props => (
  <fiery.Auth>
    {authState =>
      fiery.unwrap(authState, {
        loading: () =>
          setTimeout(message.loading('Loading authentication state')),
        error: () => (
          <h1 style={{ textAlign: 'center', color: 'red' }}>ERROR!</h1>
        ),
        completed: user =>
          user ? (
            props.children
          ) : (
            <div>
              You must sign in to continue:{' '}
              <Button onClick={authenticateWithGoogle}>
                Sign in with Google
              </Button>
            </div>
          )
      })
    }
  </fiery.Auth>
)

function authenticateWithGoogle() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
}
