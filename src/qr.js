import React from 'react'
import QrReader from 'react-qr-reader'
import { Card, message, Button } from 'antd'

import { firebase } from './lib/firebase'

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

const dbRef = firestore.collection('registrant')

export class Qr extends React.PureComponent {
  state = {
    name: '',
    lastname: '',
    isQROn: false
  }

  handleScan = async key => {
    const doc = await dbRef.doc(`${key}`).get()

    if (doc.exists) {
      await dbRef.doc(`${key}`).update({ isCheckedIn: true })
      this.setState({ name: doc.data().name, lastname: doc.data().lastname })
      message.success('Success')
    }
  }

  toggleQR = () => {
    this.setState({ isQROn: !this.state.isQROn })
  }

  handleError = err => {
    console.error(err)
  }

  render() {
    const { name, lastname, isQROn } = this.state
    return (
      <Card title="Scanner" style={{ width: 300 }}>
        {isQROn && (
          <QrReader
            delay={1000}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
        )}
        <Button onClick={this.toggleQR}>{isQROn ? 'Close' : 'Open'}</Button>
        {name && <p>Name : {name}</p>}
        {lastname && <p>Lastname : {lastname}</p>}
      </Card>
    )
  }
}
