import React from "react"
import _ from "lodash"

import User from "./user"

export default class App extends React.Component {
  render () {
    return (
      <div>
        {_.map(this.props.data.users, (user, key) =>
          <User key={key} user={user}/>
        )}
      </div>
    )
  }
}
