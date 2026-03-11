import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { motion } from 'framer-motion'

export default function Home({ user }) {
  const [myTournaments, setMyTournaments] = useState([])
  const [publicTournaments, setPublicTournaments] = useState([])
  const [stats, setStats] = useState({ tournaments: 0, matches: 0, goals: 0 })

  useEffect(() => {
    if (!user) return

    // Récupérer mes tournois
    const myTournamentsQuery = query(
      collection(db, 'tournaments'),
      where('creatorId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )

    const unsubscribeMy = onSnapshot(myTournamentsQuery, (snapshot) => {
      const tournaments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMyTournaments(tournaments)
      setStats(prev => ({ ...prev, tournaments: tournaments.length }))
    })

    // Récupérer tournois publics
    const publicQuery = query(
      collection(db, 'tournaments'),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    )

    const unsubscribePublic = onSnapshot(publicQuery, (snapshot) => {
      const tournaments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPublicTournaments(tournaments.filter(t => t.creatorId !== user.uid))
    })

    return () => {
      unsubscribeMy()
      unsubscribePublic()
    }
  }, [user])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-black mb-2">
          <span className="text-white">BIENVENUE SUR </span>
          <span className="gradient-text">BABSGAMING</span>
        </h1>
        <p className="text-gray-400">Créez et gérez vos tournois eFootball comme un pro</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card text-center"
        >
          <div className="text-5xl font-black gradient-text mb-2">{stats.tournaments}</div>
          <div className="text-gray-400">TOURNOIS</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card text-center"
        >
          <div className="text-5xl font-black gradient-text mb-2">{stats.matches}</div>
          <div className="text-gray-400">MATCHS</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card text-center"
        >
          <div className="text-5xl font-black gradient-text mb-2">{stats.goals}</div>
          <div className="text-gray-400">BUTS</div>
        </motion.div>
      </div>

      {/* Mes Tournois */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gaming-gold">🏆 MES TOURNOIS</h2>
          <Link to="/create-tournament" className="btn-primary">
            ➕ CRÉER UN TOURNOI
          </Link>
        </div>

        {myTournaments.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-400 mb-4">Aucun tournoi créé</p>
            <Link to="/create-tournament" className="btn-primary inline-block">
              Créer mon premier tournoi
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/tournament/${tournament.id}`}>
                  <div className="card hover:scale-105 transition-transform cursor-pointer">
                    <h3 className="text-xl font-bold text-gaming-gold mb-2">
                      {tournament.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Format: {tournament.format}</p>
                      <p>Équipes: {tournament.teams?.length || 0}</p>
                      <p className={tournament.isPublic ? 'text-green-400' : 'text-orange-400'}>
                        {tournament.isPublic ? '🌍 Public' : '🔒 Privé'}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tournois Publics */}
      {publicTournaments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gaming-gold mb-4">🌍 TOURNOIS PUBLICS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/tournament/${tournament.id}`}>
                  <div className="card hover:scale-105 transition-transform cursor-pointer">
                    <h3 className="text-xl font-bold text-gaming-gold mb-2">
                      {tournament.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Format: {tournament.format}</p>
                      <p>Équipes: {tournament.teams?.length || 0}</p>
                      <p>Par: {tournament.creatorName || 'Anonyme'}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
      }
        
