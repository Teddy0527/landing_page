"use client"

import { useEffect } from "react"

export function ChatbotScript() {
  useEffect(() => {
    // Difyチャットボット設定
    window.difyChatbotConfig = {
      token: "v1a18HAvhU0WieLn",
    }

    // スクリプトの追加
    const script = document.createElement("script")
    script.src = "https://udify.app/embed.min.js"
    script.id = "v1a18HAvhU0WieLn"
    script.defer = true
    document.body.appendChild(script)

    // スタイルの追加
    const style = document.createElement("style")
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #8b5d3b !important;
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 1000 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        position: fixed !important;
        bottom: 80px !important;
        right: 20px !important;
        z-index: 1000 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      // クリーンアップ
      document.body.removeChild(script)
      document.head.removeChild(style)
    }
  }, [])

  return null
}

