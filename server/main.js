// NOTE: HTTP module documentation:
// https://nodejs.org/api/http.html#http_class_http_server

const { createServer } = require("http")



const server = createServer()

const initLogin = () => {
  return new Promise((resolve/*, reject*/) => {
    console.log("init login from client")
    resolve("AHOY!")
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
