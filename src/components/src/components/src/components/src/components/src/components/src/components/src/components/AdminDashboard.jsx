import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, doc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, tournaments: 0, messages: 0 })
  const [tournaments, setTournaments] = useState([])
  const [announcement, setAnnouncement] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Compter les tournois
      const tournamentsSnap = await getDocs(collection(db, 'tournaments'))
      const tournamentsData = tournamentsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTournaments(tournamentsData)

      // Compter les messages
      const messagesSnap = await getDocs(collection(db, 'messages'))

      setStats({
        users: 0, // À implémenter avec Firebase Auth admin
        tournaments: tournamentsData.length,
        messages: messagesSnap.size
      })
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendAnnouncement = async () => {
    if (!announcement.trim()) {
      alert('Écris une annonce !')
      return
    }

    // Ici tu pourrais envoyer une notification push
    // Pour l'instant on l'affiche juste
    alert(`Annonce envoyée : ${announcement}`)
    setAnnouncement('')
  }

  const handleDeleteTournament = async (id, name) => {
    if (!confirm(`Supprimer le tournoi "${name}" ?`)) return

    try {
      await deleteDoc(doc(db, 'tournaments', id))
      alert('Tournoi supprimé !')
      loadData()
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-gaming-gold animate-pulse">Chargement...</div>
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
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black mb-2">
            <span className="text-red-500">👑 ADMIN </span>
            <span className="gradient-text">DASHBOARD</span>
          </h1>
          <p className="text-gray-400">Tableau de bord administrateur</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center border-red-500">
            <div className="text-5xl font-black text-red-500 mb-2">{stats.users}</div>
            <div className="text-gray-400">UTILISATEURS</div>
          </div>

          <div className="card text-center border-red-500">
            <div className="text-5xl font-black text-red-500 mb-2">{stats.tournaments}</div>
            <div className="text-gray-400">TOURNOIS</div>
          </div>

          <div className="card text-center border-red-500">
            <div className="text-5xl font-black text-red-500 mb-2">{stats.messages}</div>
            <div className="text-gray-400">MESSAGES CHAT</div>
          </div>
        </div>

        {/* Annonces */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gaming-gold mb-4">📢 ENVOYER UNE ANNONCE</h2>

          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Écris ton annonce ici..."
            className="input-field w-full h-32 resize-none mb-4"
          />

          <button
            onClick={handleSendAnnouncement}
            className="btn-primary w-full"
          >
            📤 ENVOYER À TOUS LES UTILISATEURS
          </button>
        </div>

        {/* Liste des tournois */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gaming-gold mb-4">🏆 TOUS LES TOURNOIS</h2>

          {tournaments.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Aucun tournoi</p>
          ) : (
            <div className="space-y-3">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="bg-gaming-lightGray p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{tournament.name}</h3>
                    <div className="text-sm text-gray-400 mt-1">
                      <span>Format: {tournament.format}</span>
                      <span className="mx-2">•</span>
                      <span>Équipes: {tournament.teams?.length || 0}</span>
                      <span className="mx-2">•</span>
                      <span>Par: {tournament.creatorName}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTournament(tournament.id, tournament.name)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bannir utilisateurs */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gaming-gold mb-4">🚫 GESTION UTILISATEURS</h2>
          <p className="text-gray-400 text-center py-8">
            Fonctionnalité de ban/unban disponible prochainement
          </p>
        </div>
      </motion.div>
    </div>
  )
          }
