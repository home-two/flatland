import FB from "firebase"
import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"

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
    x: Math.random() * 800,
    y: Math.random() * 800,
    color: colors[Math.floor(Math.random() * colors.length)],
  })
  .then((userRef) => {
    userOnline.on("value", (snapshot) => {
      if (snapshot.val()) {
        userRef.onDisconnect().remove()
      }
    })
  })

const render = (data) => {

  console.log("rendering: ", data)

  ReactDOM.render(<App data={data}/>, document.getElementById("app"))

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
