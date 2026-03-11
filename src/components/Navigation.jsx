import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default function Navigation({ isAdmin }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
    }
  }

  return (
    <nav className="bg-gaming-gray border-b-2 border-gaming-gold sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-black text-white group-hover:text-gaming-gold transition-colors">
              BABS
            </span>
            <span className="text-2xl font-black gradient-text">
              GAMING
            </span>
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="px-4 py-2 text-white hover:text-gaming-gold transition-colors font-semibold"
            >
              🏠 Accueil
            </Link>

            <Link
              to="/create-tournament"
              className="px-4 py-2 text-white hover:text-gaming-gold transition-colors font-semibold"
            >
              ➕ Créer
            </Link>

            <Link
              to="/chat"
              className="px-4 py-2 text-white hover:text-gaming-gold transition-colors font-semibold"
            >
              💬 Chat
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                👑 Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gaming-lightGray text-gaming-gold rounded-lg hover:bg-gaming-gold hover:text-black transition-all font-semibold"
            >
              🚪 Déco
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
