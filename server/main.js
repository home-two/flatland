// NOTE: HTTP module documentation:
// https://nodejs.org/api/http.html#http_class_http_server

const { createServer } = require("http")
const request = require("request")

const secret = "2afe7df060cae700dbb987ff6f988d4ebe5c26b8"
const id = "9b5fb372b18bd26c6936"

const server = createServer()

const parseQueryString = (urlString) => {
  return urlString
    .split("?")[1]
    .split("&")
    .reduce((acc, x) => {
      const [key, val] = x.split("=")
      return Object.assign(acc, {
        [key]: val
      })
    }, {})
}

const initLogin = (msg) => {
  return new Promise((resolve/*, reject*/) => {
    const { code } = parseQueryString(msg.url)
    console.log("Authenticate with Github. Session:", code)
    request({
      uri: "https://github.com/login/oauth/access_token",
      method: "post",
      json: {
        client_id: id,
        client_secret: secret,
        code,
      }
    }, (error, response) => {
      // TODO error handling
      console.log("ACCESS TOKEN RESPONSE")
      console.log("Credentials: %j", response.body)
      resolve("")
    })
  })
}

const authLogin = () => {
  return new Promise((resolve, reject) => {
    console.log("authenticating login with gh")

    // send a msg to gh with secret and id
    // if it's ok resolve
    // if it's not ok reject
  })
}

server.on("request", (msg, res) => {
  console.log("Got a request!: ", msg.method)
  switch (msg.method) {
    case "GET":
      initLogin(msg).then(() => {
        res.end()
      })
      break
    default:
      console.log("unknown method:", msg.method)
      res.writeHead(404)
      res.end()
  }
})

server.listen("9898", () => {
  console.log("Server listening on port 9898")
})
