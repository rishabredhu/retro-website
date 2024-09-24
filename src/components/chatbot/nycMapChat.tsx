"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Send, X, Menu } from 'lucide-react'

type Message = {
  text: string;
  sender: 'user' | 'guide';
  station?: string;
}

const subwayLines = ['A', 'C', 'E', '1', '2', '3', '4', '5', '6', '7', 'L', 'N', 'Q', 'R', 'W']

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to NYC! Where would you like to go?", sender: 'guide', station: 'Grand Central' }
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

    const newMessages = [...messages, { text: input, sender: 'user' as const }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const randomStation = ['Times Square', 'Central Park', 'Brooklyn Bridge', 'Wall Street', 'Yankee Stadium'][Math.floor(Math.random() * 5)]
      setMessages([...newMessages, { 
        text: `Great choice! You can get to ${input} by taking the subway from ${randomStation}.`, 
        sender: 'guide',
        station: randomStation
      }])
    }, 500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 h-[28rem] flex flex-col bg-[#F0F0F0] border-2 border-[#0039A6] rounded-lg overflow-hidden shadow-lg font-sans">
          <div className="bg-[#0039A6] text-white p-2 font-bold text-center flex items-center justify-between">
            <MapPin className="w-6 h-6" />
            <span>NYC Map Guide</span>
            <Button 
              size="icon"
              variant="ghost" 
              className="text-white hover:bg-[#003366]"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4 bg-[#F0F0F0]" ref={scrollAreaRef}>
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
                      ? 'bg-[#FF6319] text-white'
                      : 'bg-[#0039A6] text-white'
                  }`}
                >
                  {message.text}
                </span>
                {message.station && (
                  <div className="mt-1 text-xs text-[#808080]">
                    {message.station} Station
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
          <div className="p-2 bg-[#F0F0F0] border-t-2 border-[#0039A6]">
            <div className="flex overflow-x-auto pb-2 mb-2">
              {subwayLines.map((line) => (
                <div key={line} className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0039A6] text-white flex items-center justify-center mr-1">
                  {line}
                </div>
              ))}
            </div>
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
                placeholder="Where do you want to go?"
                className="flex-grow bg-white text-[#333333] border-[#0039A6] focus:ring-[#0039A6] focus:border-[#0039A6] placeholder-[#808080]"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-[#FF6319] text-white hover:bg-[#FF8C00]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-[#0039A6] text-white hover:bg-[#003366] flex items-center space-x-2"
        >
          <Menu className="w-6 h-6" />
          <span>Open NYC Map Guide</span>
        </Button>
      )}
    </div>
  )
}