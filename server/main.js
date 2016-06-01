// NOTE: HTTP module documentation:
// https://nodejs.org/api/http.html#http_class_http_server

const { createServer } = require("http")

const secret = "2afe7df060cae700dbb987ff6f988d4ebe5c26b8"
const id = "9b5fb372b18bd26c6936"

const server = createServer()

const initLogin = () => {
  return new Promise((resolve/*, reject*/) => {
    console.log("init login from client")
    resolve("AHOY!")
  })
}

const authLogin = () => {
  return new Promise((resolve, reject) => {
    console.log("authenticating login with gh")
    
    // send a req to gh with secret and id
    // if it's ok resolve
    // if it's not ok reject
  })
}

server.on("request", (req, res) => {
  console.log("Got a request!: ", req.method)
  switch (req.method) {
    case "GET":
      initLogin().then(() => {
        res.end()
      })
      break
    default:
      console.log("unknown method:", req.method)
      res.writeHead(404)
      res.end()
  }
})

server.listen("9898", () => {
  console.log("Server listening on port 9898")
})
