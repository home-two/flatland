import React from "react"

export default class User extends React.Component {
  static defaultProps = {
    onMove () {},
  }

  state = {
    dragOffset: { x: 0, y: 0 },
  }

  render () {
    const { id, x, y, color } = this.props.user
    const { onMove } = this.props

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
        draggable={true}
        onDragStart={(e) => {
          console.log("DRAG_START")
          const bounds = e.target.getBoundingClientRect()
          this.setState({
            dragOffset: {
              x: e.clientX - bounds.left,
              y: e.clientY - bounds.top,
            }
          })
        }}
        onDrag={(e) => {
          const { dragOffset } = this.state
          console.log("e.clientY", e.clientY)
          console.log("e.screenY", e.clientY)
          onMove({
            id,
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
          })
        }}
        onDragEnd={(e) => {
          const bounds = e.target.getBoundingClientRect()
          console.log("====DRAG_END====")
          console.log("e.clientY", e.clientY)
          console.log("e.screenY", e.clientY)
          console.log("e.screenY - bounds.height", e.clientY - bounds.height)
          onMove({
            id,
            x: e.clientX,
            y: e.clientY - bounds.height,
          })
        }}
      ></div>
    )
  }
}
