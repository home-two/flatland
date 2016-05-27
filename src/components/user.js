import React from "react"

export default class User extends React.Component {
  render () {
    const {x, y, color} = this.props.user
    return (
      <div
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          left: x,
          top: y,
          backgroundColor: color
        }}
      ></div>
    )
  }
}
