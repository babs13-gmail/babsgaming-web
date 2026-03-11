import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'

export default function TournamentView({ user }) {
  const { id } = useParams()
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTournament = async () => {
      try {
        const docRef = doc(db, 'tournaments', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setTournament({ id: docSnap.id, ...docSnap.data() })
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTournament()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-gaming-gold animate-pulse">Chargement...</div>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Tournoi introuvable</h2>
          <p className="text-gray-400">Ce tournoi n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="card mb-8">
          <h1 className="text-4xl font-black gradient-text mb-4">{tournament.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Format:</span>
              <span className="ml-2 text-white font-semibold">{tournament.format}</span>
            </div>
            <div>
              <span className="text-gray-400">Équipes:</span>
              <span className="ml-2 text-white font-semibold">{tournament.teams?.length || 0}</span>
            </div>
            <div>
              <span className="text-gray-400">Créé par:</span>
              <span className="ml-2 text-white font-semibold">{tournament.creatorName || 'Anonyme'}</span>
            </div>
          </div>
        </div>

        {/* Liste des équipes */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gaming-gold mb-4">⚽ ÉQUIPES</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tournament.teams?.map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gaming-lightGray p-4 rounded-lg hover:border-gaming-gold border border-transparent transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gaming-gold rounded-full flex items-center justify-center text-black font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">{team.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Matchs (à venir) */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gaming-gold mb-4">🎮 MATCHS</h2>
          <p className="text-gray-400 text-center py-8">
            Les matchs seront générés prochainement
          </p>
        </div>

        {/* Section Classement (à venir) */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gaming-gold mb-4">📊 CLASSEMENT</h2>
          <p className="text-gray-400 text-center py-8">
            Le classement sera disponible une fois les matchs commencés
          </p>
        </div>
      </motion.div>
    </div>
  )
            }
    
