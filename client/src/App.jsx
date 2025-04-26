// === 1. 前端：client/src/App.jsx ===
import { useState } from 'react'

function App() {
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")

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
    }
    recognition.start()
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>語音聊天機器人</h2>
      <button onClick={startSpeechRecognition}>🎤 開始說話</button>
      <p>👉 語音內容：{transcript}</p>
      <p>🤖 回應：{response}</p>
    </div>
  )
}

export default App