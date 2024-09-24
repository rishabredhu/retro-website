"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gamepad2, Send, Power } from 'lucide-react'

type Message = {
  text: string;
  sender: "player" | "game";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Rishab's Bot will be here soon! PRESS START TO BEGIN!", sender: 'game' }
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

    const newMessages: Message[] = [...messages, { text: input.toUpperCase(), sender: 'player' as const }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages([...newMessages, { text: `PROCESSING: "${input.toUpperCase()}"`, sender: 'game' }]);
    }, 500);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 h-[28rem] flex flex-col bg-black border-4 border-[#39FF14] rounded-lg overflow-hidden shadow-lg font-mono">
          <div className="bg-[#39FF14] text-black p-2 font-bold text-center flex items-center justify-between">
            <Gamepad2 className="w-6 h-6" />
            <span>RETRO ARCADE CHAT</span>
            <Button 
              size="icon"
              variant="ghost" 
              className="text-black hover:bg-[#32CD32]"
              onClick={() => setIsOpen(false)}
            >
              <Power className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4 bg-black" ref={scrollAreaRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === 'player' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 ${
                    message.sender === 'player'
                      ? 'text-[#FF00FF]'
                      : 'text-[#00FFFF]'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="p-2 bg-[#39FF14]">
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
                placeholder="TYPE YOUR MESSAGE..."
                className="flex-grow bg-black text-[#39FF14] border-[#39FF14] focus:ring-[#39FF14] focus:border-[#39FF14] placeholder-[#32CD32] uppercase"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-black text-[#39FF14] hover:bg-[#32CD32] hover:text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-[#39FF14] text-black hover:bg-[#32CD32] flex items-center space-x-2 font-mono"
        >
          <Gamepad2 className="w-6 h-6" />
          <span>PRESS START</span>
        </Button>
      )}
    </div>
  )
}