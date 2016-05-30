import React from "react"

export default class User extends React.Component {
  static defaultProps = {
    onMove () {},
  }

  state = {
    dragOffset: { 
      x: 0, 
      y: 0,
      mouseDown: false
    },
  }

  // componentDidMount () {
  //   console.log("comp did mount")
  //   window.addEventListener("mouseUp", )
  // }

  // componentWillUnmount () {
  //   console.log("comp will unmount")
  // }

  onMouseMove () {
    console.log("mouse move")
  }

  onMouseUp () {
    console.log("mouse up: ", this)
    window.removeEventListener("mousemove", this.onMouseMove)
    window.removeEventListener("mouseup", this.onMouseUp)
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

        onMouseDown={(e) => {
          console.log("mouse down")
          const bounds = e.target.getBoundingClientRect()
          this.setState({
            mouseDown: true,
            dragOffset: {
              x: e.clientX - bounds.left,
              y: e.clientY - bounds.top,
            }
          }, () => {
            window.addEventListener("mousemove", this.onMouseMove.bind(this))
            window.addEventListener("mouseup", this.onMouseUp.bind(this))
          })
        }}



        // onMouseMove={(e) => {
        //   // NB: remember e.nativeEvent.movementX/Y
        //   const {dragOffset} = this.state
        //   if(this.state.mouseDown) {
        //     onMove({
        //       id,
        //       x: e.clientX - dragOffset.x,
        //       y: e.clientY - dragOffset.y,
        //     })
        //   }
        // }}

        // onMouseUp={(/*e*/) => {
        //   console.log("mouse up")
        //   this.setState({mouseDown:false})
        // }}

        // draggable={true}
        // onDragStart={(e) => {
        //   console.log("DRAG_START")
        //   const bounds = e.target.getBoundingClientRect()
        //   this.setState({
        //     dragOffset: {
        //       x: e.clientX - bounds.left,
        //       y: e.clientY - bounds.top,
        //     }
        //   })
        // }}
        // onDrag={(e) => {
        //   const { dragOffset } = this.state
        //   console.log("e.clientY", e.clientY)
        //   console.log("e.screenY", e.clientY)
        //   onMove({
        //     id,
        //     x: e.clientX - dragOffset.x,
        //     y: e.clientY - dragOffset.y,
        //   })
        // }}
        // onDragEnd={(e) => {
        //   const bounds = e.target.getBoundingClientRect()
        //   console.log("====DRAG_END====")
        //   console.log("e.clientY", e.clientY)
        //   console.log("e.screenY", e.clientY)
        //   console.log("e.screenY - bounds.height", e.clientY - bounds.height)
        //   onMove({
        //     id,
        //     x: e.clientX,
        //     y: e.clientY - bounds.height,
        //   })
        // }}
      ></div>
    )
  }
}
