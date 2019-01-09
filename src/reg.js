import React from 'react'
import axios from 'axios'
import { message } from 'antd'

import { firebase } from './lib/firebase'

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

const dbRef = firestore.collection('registrant')

export class Register extends React.Component {
  state = {
    prefix: '',
    name: '',
    lastname: '',
    email: '',
    type: '',
    stdyear: ' '
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  submitToFirebase = async () => {
    try {
      const res = await axios.post(
        '  https://asia-northeast1-triamudomopenhouse2019.cloudfunctions.net/registration/register ',
        {
          prefix: this.state.prefix,
          name: this.state.name,
          lastname: this.state.lastname,
          email: this.state.email,
          type: this.state.type,
          studentYear: this.state.stdyear
        }
      )
      this.setState({
        prefix: '',
        name: '',
        lastname: '',
        email: '',
        type: '',
        stdyear: ' '
      })
      await dbRef.doc(`${res.data}`).update({ isCheckedIn: true })
      message.success('Success!')
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="container">
        <div class="columns is-mobile">
          <div class="column is-half is-offset-one-quarter">
            <div className="box">
              <div className="field">
                <label className="label">Prefix</label>
                <div className="control">
                  <label className="radio">
                    <input
                      value="mr"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    นาย
                  </label>
                  <label className="radio">
                    <input
                      value="ms"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    นางสาว
                  </label>
                  <label className="radio">
                    <input
                      value="mrs"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    นาง
                  </label>
                  <label className="radio">
                    <input
                      value="master"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    เด็กชาย
                  </label>
                  <label className="radio">
                    <input
                      value="ms(child)"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    เด็กหญิง
                  </label>
                </div>
                <label className="label">Name</label>
                <div className="control">
                  <input
                    name="name"
                    className="input"
                    type="text"
                    placeholder="Name"
                    onChange={this.handleChange}
                  />
                </div>
                <label className="label">Lastname</label>
                <div className="control">
                  <input
                    name="lastname"
                    className="input"
                    type="text"
                    placeholder="Lastname"
                    onChange={this.handleChange}
                  />
                </div>
                <label className="label">Email</label>
                <div className="control">
                  <input
                    name="email"
                    className="input"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
                <label className="label">Type</label>
                <div className="control">
                  <label className="radio">
                    <input
                      value="student"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    นักเรียน
                  </label>
                  <label className="radio">
                    <input
                      value="parent"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    ผู้ปกครอง
                  </label>
                  <label className="radio">
                    <input
                      value="teacher"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    ครู/อาจารย์
                  </label>
                  <label className="radio">
                    <input
                      value="others"
                      type="radio"
                      name="prefix"
                      onChange={this.handleChange}
                    />{' '}
                    อื่น ๆ
                  </label>
                </div>
                <button className="button" onClick={this.submitToFirebase}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
