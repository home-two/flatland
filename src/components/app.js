import React from "react"
import _ from "lodash"

import User from "./user"

export default class App extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render () {
    const {users} = this.props.data
    return (
      <div>
        {_.map(users, (user, key) =>
          <User key={key} user={user}/>
        )}
      </div>
    )
  }
}
