// server/index.js
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080 // ✅ 改成 8080

app.use(cors())
app.use(express.json())

app.post('/chat', (req, res) => {
  const { message } = req.body
  const reply = `你說的是：${message}，這是模擬回應。`
  res.json({ reply })
})

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`)
})
