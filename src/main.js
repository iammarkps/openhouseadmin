import React from 'react'
import QrReader from 'react-qr-reader'
import { Card, message } from 'antd'

import { firebase } from './lib/firebase'

const dbRef = firebase.firestore().collection('registrant')

export class Main extends React.PureComponent {
  state = {
    isSuccess: false
  }

  handleScan = async data => {
    if (data) {
      try {
        await dbRef.doc(`${data}`).update({ isCheckedIn: true })
        message.info('Success!')
      } catch (err) {
        message.error('ERROR!')
      }
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
        </Card>
      </div>
    )
  }
}
