import FB from "firebase"
import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"



// Helpers

const randomPosition = () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
})



// App

const fbUri = "https://flatlander.firebaseio.com"
const fb = new FB(fbUri)
const userOnline = new FB(`${fbUri}/.info/connected`)
const colors = [ "red", "green", "blue", "orange", "purple" ]

const initFirebase = () =>
  fb.set({
    hello: "world"
  })

const checkAndInitFirebase = (snapshot) =>
  !snapshot.exists()
    ? initFirebase()
    : Promise.resolve()


const setupUser = () =>
  fb.child("users").push({
    ...randomPosition(),
    color: colors[Math.floor(Math.random() * colors.length)],
  })
  .then((userRef) => {
    userOnline.on("value", (snapshot) => {
      if (snapshot.val()) {
        userRef.onDisconnect().remove()
      }
    })
  })

const controller = {
  moveUser ({ id, x, y }) {
    fb.child("users").child(id).update({ x, y })
  }
}

const render = (data) => {
  ReactDOM.render(<App controller={controller} data={data}/>, document.getElementById("app"))
}

fb.once("value", (snapshot) => {
  // Does the database exit? If not initialize it.
  checkAndInitFirebase(snapshot)
    // Does the user exit? If not initialize them.
    .then(() => setupUser())
    .then(() => {
      fb.on("value", (snapshot) => {
        console.log(snapshot.val())
        render(snapshot.val())
      })
    })
})
