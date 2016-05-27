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
          width: 100,
          height: 100,
          left: x,
          top: y,
          backgroundColor: color
        }}
        onDragStart={(e) => {
          console.log("div x: ", e.target.getBoundingClientRect().right)
          console.log("mouse x: ", e.clientX)
        }}
        draggable={true}
        onDragEnd={(e) => {
          const {clientX: x, clientY: y} = e
          onMove({id, x, y})
        }}
        onDrag={(e) => {
          const {clientX: x, clientY: y} = e
          onMove({id, x, y})

          // console.log("pageX, clientX", e.pageX, e.clientX)
        }}
      ></div>
    )
  }
}
