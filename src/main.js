import FB from "firebase"
import uuid from "uuid"


const fbUri = "https://flatlander.firebaseio.com"
const fb = new FB(fbUri)
const id = uuid.v4()
// const colors = ["red", "green", "blue", "orange", "purple"]

const initFirebase = () => {
  fb.set({
    hello: "world" + Math.random(),
    users: {
      bla: "bloo"
    }
  })
}

const setupUser = () => {
  fb.child("users").set({
    [id]: {
      x: 0,
      y: 0,
      color: "black"
    },
  })
}

fb.once("value", (snapshot) => {
  console.log('ss: ', snapshot.exists())
  if (snapshot.exists()) {
    setupUser()
  } else {
    initFirebase()
  }
})

