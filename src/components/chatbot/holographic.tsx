"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Cpu, Send, Power } from 'lucide-react'

// Update the Message interface to include 'ai' as a valid sender type
interface Message {
  text: string;
  sender: 'user' | 'bot' | 'ai';
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Rishab's AI Bot will be soon here?", sender: 'ai' }
  ])
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim() === '') return

    // Update the newMessages creation
    const newMessages: Message[] = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages([...newMessages, { text: `Processing: "${input}"`, sender: 'ai' }])
    }, 500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 h-[28rem] flex flex-col bg-black bg-opacity-50 border-2 border-[#00FFFF] rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
          <div className="bg-[#00FFFF] bg-opacity-20 text-[#00FFFF] p-2 font-bold text-center flex items-center justify-between">
            <Cpu className="w-6 h-6" />
            <span>Rishab's AI Bot</span>
            <Button 
              size="icon"
              variant="ghost" 
              className="text-[#00FFFF] hover:bg-[#00FFFF] hover:bg-opacity-20"
              onClick={() => setIsOpen(false)}
            >
              <Power className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#00FFFF] bg-opacity-20 text-white'
                      : 'bg-[#FF00FF] bg-opacity-20 text-white'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="p-2 bg-[#00FFFF] bg-opacity-10">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex space-x-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your query..."
                className="flex-grow bg-black bg-opacity-50 text-[#00FFFF] border-[#00FFFF] focus:ring-[#00FFFF] focus:border-[#00FFFF] placeholder-[#00FFFF] placeholder-opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-[#00FFFF] bg-opacity-20 text-[#00FFFF] hover:bg-opacity-30"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-[#00FFFF] bg-opacity-20 text-[#00FFFF] hover:bg-opacity-30 backdrop-blur-sm"
        >
          <Cpu className="w-6 h-6 mr-2" />
          <span>Rishab's AI Bot</span>
        </Button>
      )}
    </div>
  )
}