import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Components
import Login from './components/Login'
import Home from './components/Home'
import CreateTournament from './components/CreateTournament'
import TournamentView from './components/TournamentView'
import AdminDashboard from './components/AdminDashboard'
import Chat from './components/Chat'
import Navigation from './components/Navigation'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      // Vérifier si c'est l'admin
      if (currentUser && currentUser.email === 'admin@babsgaming.com') {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gaming-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">
            <span className="text-white">BABS</span>
            <span className="gradient-text">GAMING</span>
          </div>
          <div className="animate-pulse text-gaming-gold">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gaming-bg">
        {user ? (
          <>
            <Navigation isAdmin={isAdmin} />
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/create-tournament" element={<CreateTournament user={user} />} />
              <Route path="/tournament/:id" element={<TournamentView user={user} />} />
              <Route path="/chat" element={<Chat user={user} />} />
              {isAdmin && (
                <Route path="/admin" element={<AdminDashboard />} />
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App
  
