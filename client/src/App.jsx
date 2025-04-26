import { useState, useEffect } from 'react'

function App() {
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [chatHistory, setChatHistory] = useState([])

  const fetchHistory = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/history`)
    const data = await res.json()
    setChatHistory(data)
  }

  const clearHistory = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/history`, {
      method: 'DELETE',
    })
    setChatHistory([])
  }

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'zh-TW'
    recognition.interimResults = false

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript
      setTranscript(text)

      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      setResponse(data.reply)

      // 更新聊天紀錄
      fetchHistory()
    }

    recognition.start()
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div style={{ padding: 30 }}>
      <h2>語音聊天機器人</h2>
      <button onClick={startSpeechRecognition}>🎤 開始說話</button>
      <button onClick={clearHistory} style={{ marginLeft: '10px' }}>🗑️ 清除聊天紀錄</button>

      <div style={{ marginTop: 20 }}>
        <p>👉 語音內容：{transcript}</p>
        <p>🤖 回應：{response}</p>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>📝 聊天紀錄：</h3>
        {chatHistory.length === 0 ? (
          <p>目前沒有紀錄</p>
        ) : (
          <ul>
            {chatHistory.map((chat, index) => (
              <li key={index}>
                <strong>{chat.time}：</strong> 你說「{chat.user}」→ 回覆「{chat.reply}」
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
