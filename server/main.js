const { createServer } = require("http")



const server = createServer()

server.on("request", (req, res) => {
  console.log("Got a request!")
  res.end()
})

server.listen("9898", () => {
  console.log("Server listening on port 9898")
})
