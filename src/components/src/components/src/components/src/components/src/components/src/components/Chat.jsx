import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'

export default function Chat({ user }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).reverse()
      setMessages(msgs)
      setTimeout(scrollToBottom, 100)
    })

    return () => unsubscribe()
  }, [])

  const handleSend = async (e) => {
    e.preventDefault()

    if (!newMessage.trim() || sending) return

    setSending(true)

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage.trim(),
        userId: user.uid,
        userName: user.email.split('@')[0],
        createdAt: serverTimestamp()
      })

      setNewMessage('')
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'envoi du message')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card flex flex-col h-[calc(100vh-200px)]"
      >
        {/* Header */}
        <div className="border-b border-gaming-gold pb-4 mb-4">
          <h1 className="text-3xl font-black">
            <span className="text-white">💬 CHAT </span>
            <span className="gradient-text">COMMUNAUTAIRE</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Discute avec les autres joueurs en temps réel
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>Aucun message pour le moment</p>
              <p className="text-sm mt-2">Sois le premier à lancer la conversation ! 🚀</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isOwnMessage = message.userId === user.uid

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: isOwnMessage ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-gaming-gold to-gaming-darkGold text-black'
                        : 'bg-gaming-lightGray text-white'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1">
                      {isOwnMessage ? 'Toi' : message.userName}
                    </div>
                    <div className="break-words">{message.text}</div>
                    <div className={`text-xs mt-1 ${isOwnMessage ? 'text-black/60' : 'text-gray-400'}`}>
                      {message.createdAt?.toDate().toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) || 'À l\'instant'}
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écris ton message..."
            className="input-field flex-1"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8"
          >
            {sending ? '⏳' : '📤'}
          </button>
        </form>

        <div className="text-xs text-gray-500 mt-2 text-center">
          Sois respectueux et sympa avec les autres joueurs 🤝
        </div>
      </motion.div>
    </div>
  )
                  }
