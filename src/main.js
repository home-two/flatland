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

const checkAndInitFirebase = (snapshot) => {
  if (!snapshot.exists()) {
    return initFirebase()
  } else {
    return Promise.resolve()
  }
}

const setupUser = () => {
  fb.child("users").update({
    [id]: {
      x: Math.random() * 800,
      y: Math.random() * 800,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  })
}




// render

const render = (data) => {
  console.log("rendering: ", data)
}

fb.once("value", (snapshot) => {
  checkAndInitFirebase(snapshot)
    .then(() => setupUser())
    .then(() => {
      fb.on("value", (snapshot) => {
        console.log(snapshot.val())
        render(snapshot.val())
      })
    })
})
