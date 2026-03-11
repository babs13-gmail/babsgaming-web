import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'

export default function CreateTournament({ user }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [tournamentData, setTournamentData] = useState({
    name: '',
    format: 'LDC',
    numTeams: 16,
    isPublic: false,
    teams: []
  })
  const [loading, setLoading] = useState(false)

  const formats = [
    { value: 'LDC', label: '🏆 Ligue des Champions', teams: [16, 32] },
    { value: 'CHAMPIONNAT', label: '🏅 Championnat', teams: [8, 10, 12, 14, 16, 18, 20] },
    { value: 'CDM', label: '🌍 Coupe du Monde', teams: [16, 32] },
    { value: 'COUPE', label: '🏆 Coupe', teams: [8, 16, 32] },
  ]

  const handleAddTeam = () => {
    setTournamentData(prev => ({
      ...prev,
      teams: [...prev.teams, { name: `Équipe ${prev.teams.length + 1}`, logo: '' }]
    }))
  }

  const handleRemoveTeam = (index) => {
    setTournamentData(prev => ({
      ...prev,
      teams: prev.teams.filter((_, i) => i !== index)
    }))
  }

  const handleTeamChange = (index, field, value) => {
    setTournamentData(prev => ({
      ...prev,
      teams: prev.teams.map((team, i) =>
        i === index ? { ...team, [field]: value } : team
      )
    }))
  }

  const handleCreate = async () => {
    if (!tournamentData.name || tournamentData.teams.length === 0) {
      alert('Remplis tous les champs et ajoute au moins une équipe !')
      return
    }

    setLoading(true)

    try {
      const docRef = await addDoc(collection(db, 'tournaments'), {
        ...tournamentData,
        creatorId: user.uid,
        creatorName: user.email.split('@')[0],
        createdAt: serverTimestamp(),
        matches: [],
        standings: []
      })

      navigate(`/tournament/${docRef.id}`)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création du tournoi')
    } finally {
      setLoading(false)
    }
  }

  const selectedFormat = formats.find(f => f.value === tournamentData.format)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black text-center mb-8">
          <span className="text-white">CRÉER UN </span>
          <span className="gradient-text">TOURNOI</span>
        </h1>

        {/* Étape 1 : Informations */}
        {step === 1 && (
          <div className="card space-y-6">
            <h2 className="text-2xl font-bold text-gaming-gold">📋 INFORMATIONS</h2>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Nom du tournoi
              </label>
              <input
                type="text"
                value={tournamentData.name}
                onChange={(e) => setTournamentData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Champions League 2026"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Format
              </label>
              <select
                value={tournamentData.format}
                onChange={(e) => setTournamentData(prev => ({ ...prev, format: e.target.value, numTeams: 16 }))}
                className="input-field w-full"
              >
                {formats.map(format => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Nombre d'équipes
              </label>
              <select
                value={tournamentData.numTeams}
                onChange={(e) => setTournamentData(prev => ({ ...prev, numTeams: parseInt(e.target.value) }))}
                className="input-field w-full"
              >
                {selectedFormat.teams.map(num => (
                  <option key={num} value={num}>{num} équipes</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={tournamentData.isPublic}
                onChange={(e) => setTournamentData(prev => ({ ...prev, isPublic: e.target.checked }))}
                className="w-5 h-5 accent-gaming-gold"
              />
              <label htmlFor="isPublic" className="text-gray-300">
                🌍 Rendre le tournoi public (visible par tous)
              </label>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full"
            >
              SUIVANT →
            </button>
          </div>
        )}

        {/* Étape 2 : Équipes */}
        {step === 2 && (
          <div className="card space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gaming-gold">
                ⚽ ÉQUIPES ({tournamentData.teams.length}/{tournamentData.numTeams})
              </h2>
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                ← RETOUR
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tournamentData.teams.map((team, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gaming-lightGray p-4 rounded-lg flex items-center space-x-3"
                >
                  <span className="text-gaming-gold font-bold w-8">{index + 1}.</span>
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                    placeholder={`Nom de l'équipe ${index + 1}`}
                    className="input-field flex-1"
                  />
                  <button
                    onClick={() => handleRemoveTeam(index)}
                    className="text-red-400 hover:text-red-300 font-bold px-3 py-2"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>

            {tournamentData.teams.length < tournamentData.numTeams && (
              <button
                onClick={handleAddTeam}
                className="btn-secondary w-full"
              >
                ➕ AJOUTER UNE ÉQUIPE
              </button>
            )}

            <button
              onClick={handleCreate}
              disabled={loading || tournamentData.teams.length === 0}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'CRÉATION...' : '🚀 CRÉER LE TOURNOI'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
        }
                                                             
