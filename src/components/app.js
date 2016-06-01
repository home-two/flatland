import React from "react"
import _ from "lodash"

import User from "./user"

const appId = "9b5fb372b18bd26c6936"


export default class App extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render () {
    const {users} = this.props.data
    const {moveUser} = this.props.controller
    return (
      <div>
        <a href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${appId}`}>Login</a>
        {_.map(users, (user, key) =>
          <User key={key}  user={{id: key, ...user}} onMove={moveUser}/>
        )}
      </div>
    )
  }
}
