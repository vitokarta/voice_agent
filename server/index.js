// const express = require('express')
// const cors = require('cors')
// const app = express()
// const port = 8080

// app.use(cors())
// app.use(express.json())

// // 暫存在記憶體中的聊天紀錄
// let chatHistory = []

// // 模擬聊天路由
// app.post('/chat', (req, res) => {
//   const { message } = req.body

//   if (!message) {
//     return res.status(400).json({ error: '請傳入 message 欄位' })
//   }

//   const timestamp = new Date().toISOString()
//   const reply = `🤖 模擬回應：「${message}」的意思是什麼呢？`

//   const log = {
//     time: timestamp,
//     user: message,
//     reply
//   }

//   chatHistory.push(log)

//   res.json({ reply, timestamp })
// })

// // 查詢聊天紀錄
// app.get('/history', (req, res) => {
//   res.json(chatHistory)
// })

// // 清除聊天紀錄
// app.delete('/history', (req, res) => {
//   chatHistory = []
//   res.json({ message: '聊天紀錄已清除 ✅' })
// })

// app.listen(port, () => {
//   console.log(`🚀 Server listening on http://localhost:${port}`)
// })
