import React from "react"

export default class User extends React.Component {
  static defaultProps = {
    onMove () {},
  }

  constructor (props) {
    super(props)

    this.onMouseMove = (e) => {
      // NB: remember e.nativeEvent.movementX/Y
      const { dragOffset } = this.state
      const {
        onMove,
        user: {
          id,
        }
      } = this.props
      if (this.state.mouseDown) {
        onMove({
          id,
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    this.onMouseUp = () => {
      window.removeEventListener("mousemove", this.onMouseMove)
      window.removeEventListener("mouseup", this.onMouseUp)
    }
  }

  state = {
    dragOffset: {
      x: 0,
      y: 0,
    },
  }

  render () {
    const { x, y, color } = this.props.user

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

        onMouseDown={(e) => {
          const bounds = e.target.getBoundingClientRect()
          this.setState({
            dragOffset: {
              x: e.clientX - bounds.left,
              y: e.clientY - bounds.top,
            }
          }, () => {
            window.addEventListener("mousemove", this.onMouseMove)
            window.addEventListener("mouseup", this.onMouseUp)
          })
        }}
      ></div>
    )
  }
}
