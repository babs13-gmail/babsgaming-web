import { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { motion } from 'framer-motion'

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gaming-bg via-gaming-gray to-gaming-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-6xl font-black mb-2"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white">BABS</span>
            <span className="gradient-text">GAMING</span>
          </motion.h1>
          <p className="text-gaming-gold text-sm">eFootball • Compétition Officielle</p>
        </div>

        {/* Card de connexion */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gaming-gold mb-6 text-center">
            {isSignup ? 'CRÉER UN COMPTE' : 'CONNEXION'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Chargement...' : (isSignup ? 'S\'INSCRIRE' : 'SE CONNECTER')}
            </button>

            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="btn-secondary w-full"
            >
              {isSignup ? 'Déjà un compte ? Se connecter' : 'Créer un compte'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>💬 Support technique :</p>
            <a href="mailto:techmrb065@gmail.com" className="text-gaming-gold hover:text-white transition-colors">
              techmrb065@gmail.com
            </a>
          </div>
        </div>

        {/* Astuce admin */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>💡 Astuce : Utilise admin@babsgaming.com pour accéder au dashboard admin</p>
        </div>
      </motion.div>
    </div>
  )
              }
