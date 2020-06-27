const express = require('express')
const next = require('next')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const PORT = process.env.PORT || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './', dev })
const handler = app.getRequestHandler()


app.prepare()
  .then(() => {
    const server = express()

    server.use('/', express.static(path.join(__dirname, '/static')))

    server.get('/_next/*', (req, res) => handler(req, res))

    server.get('/', (req, res) => app.render(req, res, '/'))

    server.get('/robots.txt', async (req, res) => {
      await axios.get('https://api.trangbeautycenter.com/robotstxt')
        .then((response) => {
          const { content } = response.data.robots
          fs.writeFile('robots.txt', content, 'utf-8', (err) => {
            if (err) console.log(err)
            res.sendFile(path.join(__dirname, 'robots.txt'))
          })
        })
    })

    server.get('/chat/:roomId', (req, res) => {
      const roomId = req.params.roomId
      return app.render(req, res, '/chat', { roomId })
    })

    server.get('/room', (req, res) => {
        return app.render(req, res, '/room')
      })

    server.listen(PORT, (err) => {
      if (err) throw err && console.log(err)
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    throw error && console.log('error')
  })