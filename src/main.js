import React from 'react'
import QrReader from 'react-qr-reader'
import { Alert, Card } from 'antd'

import { firebase } from './lib/firebase'

const dbRef = firebase.firestore().collection('registrant')

export class Main extends React.PureComponent {
  state = {
    isSuccess: false
  }

  handleScan = data => {
    if (data) {
      this.setState({ isSuccess: true })
      dbRef.doc(`${data}`).update({ isCheckedIn: true })
    } else {
      console.error('NO DATA EXIST!')
    }
  }

  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div>
        <Card title="Scanner" style={{ width: 300 }}>
          <QrReader
            delay={1000}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
          {!this.state.isSuccess && (
            <Alert message="NO DATA EXIST!" type="error" />
          )}
          {this.state.isSuccess && (
            <Alert message="Check-in complete" type="success" />
          )}
        </Card>
      </div>
    )
  }
}
