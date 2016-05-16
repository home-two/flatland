import FB from "firebase"



const fbUri = "https://flatlander.firebaseio.com"
const fb = new FB(fbUri)



fb.set({
  hello: "world!",
})
