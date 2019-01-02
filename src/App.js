import React from 'react'
import { AuthRequired } from './component/auth'
import { Main } from './main'

import 'antd/dist/antd.min.css'

class App extends React.PureComponent {
  render() {
    return (
      <AuthRequired>
        <Main />
      </AuthRequired>
    )
  }
}

export default App
