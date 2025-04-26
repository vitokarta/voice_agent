from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

# 暂存在内存中的聊天记录
chat_history = []

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    
    if not message:
        return jsonify({"error": "请传入 message 字段"}), 400
    
    timestamp = datetime.now().isoformat()
    reply = f"🤖 模拟回应：「{message}」的意思是什么呢？"
    
    log = {
        "time": timestamp,
        "user": message,
        "reply": reply
    }
    
    chat_history.append(log)
    
    return jsonify({"reply": reply, "timestamp": timestamp})

@app.route('/history', methods=['GET'])
def history():
    return jsonify(chat_history)

@app.route('/history', methods=['DELETE'])
def clear_history():
    global chat_history
    chat_history = []
    return jsonify({"message": "聊天记录已清除 ✅"})

if __name__ == '__main__':
    # 从环境变量获取端口，默认使用5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
    print(f"🚀 Server listening on http://localhost:{port}") 