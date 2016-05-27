import React from "react"

export default class User extends React.Component {
  static defaultProps = {
    onMove () {},
  }

  render () {
    const { id, x, y, color } = this.props.user
    const { onMove } = this.props

    // onMove({ id, x: 1, y: 1 })



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
        draggable={true}
        onDragEnd={(e) => {
          console.log('drag end ', e.pageX)
          const {clientX: x, clientY: y} = e
          onMove({id, x, y})
        }}
      ></div>
    )
  }
}
