import React from "react"

export default class User extends React.Component {
  static defaultProps = {
    onMove () {},
  }

  constructor (props) {
    super(props)

    this.onMouseDown = (e) => {
      const bounds = e.target.getBoundingClientRect()
      this.setState({
        dragOffset: {
          x: e.pageX - bounds.left,
          y: e.pageY - bounds.top,
        }
      }, () => {
        window.addEventListener("mousemove", this.onMouseMove)
        window.addEventListener("mouseup", this.onMouseUp)
      })
    }

    this.onMouseMove = (e) => {
      // NB: remember e.nativeEvent.movementX/Y
      const { dragOffset } = this.state
      const {
        onMove,
        user: {
          id,
        }
      } = this.props
      console.log("Do onMove")
      onMove({
        id,
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }

    this.onMouseUp = () => {
      window.removeEventListener("mousemove", this.onMouseMove)
      window.removeEventListener("mouseup", this.onMouseUp)
    }

    this.onTouchStart = (e) => {
      e.preventDefault()
      const bounds = e.target.getBoundingClientRect()
      const {pageX, pageY} = e.nativeEvent
      this.setState({
        dragOffset: {
          x: pageX - bounds.left,
          y: pageY - bounds.top,
        }
      }, () => {
        window.addEventListener("touchmove", this.onTouchMove)
        window.addEventListener("touchend", this.onTouchEnd)
      })
    }

    this.onTouchMove = (e) => {
      const { dragOffset } = this.state
      const {
        onMove,
        user: {
          id,
        }
      } = this.props
      console.log("dragOffset: ", dragOffset)
      onMove({
        id,
        x: e.pageX - dragOffset.x,
        y: e.pageY - dragOffset.y,
      })
    }

    this.onTouchEnd = () => {
      window.removeEventListener("touchmove", this.onTouchMove)
      window.removeEventListener("touchend", this.onTouchEnd)
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

        onTouchStart={this.onTouchStart}
        onMouseDown={this.onMouseDown}
      ></div>
    )
  }
}
