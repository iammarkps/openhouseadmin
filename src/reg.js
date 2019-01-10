import React from 'react'
import axios from 'axios'
import { message, Col, Row, Card } from 'antd'

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
      message.error(`Error! : ${err}`)
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <Card>
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
                <br />
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
                <br />
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
                <br />
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
                <br />
                <label className="label">Type</label>
                <div className="control">
                  <label className="radio">
                    <input
                      value="student"
                      type="radio"
                      name="type"
                      onChange={this.handleChange}
                    />{' '}
                    นักเรียน
                  </label>
                  <label className="radio">
                    <input
                      value="parent"
                      type="radio"
                      name="type"
                      onChange={this.handleChange}
                    />{' '}
                    ผู้ปกครอง
                  </label>
                  <label className="radio">
                    <input
                      value="teacher"
                      type="radio"
                      name="type"
                      onChange={this.handleChange}
                    />{' '}
                    ครู/อาจารย์
                  </label>
                  <label className="radio">
                    <input
                      value="others"
                      type="radio"
                      name="type"
                      onChange={this.handleChange}
                    />{' '}
                    อื่น ๆ
                  </label>
                </div>
                <br />
                {this.state.type === 'student' && (
                  <React.Fragment>
                    <label className="label">Student's Year</label>
                    <div className="control">
                      <select name="stdyear" onChange={this.handleChange}>
                        <option value="p1-3">ประถมศึกษาตอนต้น</option>
                        <option value="p4-6">ประถมศึกษาตอนปลาย</option>
                        <option value="m1">มัธยมศึกษาปีที่ 1</option>
                        <option value="m2">มัธยมศึกษาปีที่ 2</option>
                        <option value="m3">มัธยมศึกษาปีที่ 3</option>
                        <option value="highschool">มัธยมศึกษาตอนปลาย</option>
                        <option value="others">อื่น ๆ</option>
                      </select>
                    </div>
                  </React.Fragment>
                )}
                <br />
                <button className="button" onClick={this.submitToFirebase}>
                  Register
                </button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
