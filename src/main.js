import FB from "firebase"
import uuid from "uuid"



const fbUri = "https://flatlander.firebaseio.com"
const fb = new FB(fbUri)
const id = uuid.v4()
const colors = [ "red", "green", "blue", "orange", "purple" ]

const initFirebase = () =>
  fb.set({
    hello: "world",
    users: {
      bla: "bloo"
    }
  })

const setupUser = () => {
  fb.child("users").update({
    [id]: {
      x: Math.random() * 800,
      y: Math.random() * 800,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  })
}

fb.once("value", (snapshot) => {
  if (!snapshot.exists()) {
    initFirebase()
    .then(() => console.log("Initialized Database"))
    .then(() => setupUser())
  } else {
    setupUser()
  }
})
