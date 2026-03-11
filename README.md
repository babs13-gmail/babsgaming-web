# 🎮 BABSGAMING - PLATEFORME DE TOURNOIS EFOOTBALL

**Application web professionnelle pour gérer des tournois eFootball**  
Par Mister.B (Babacar Diouf)  
Support: techmrb065@gmail.com

---

## ✨ FONCTIONNALITÉS

### POUR LES UTILISATEURS :
✅ **Authentification complète** (Inscription/Connexion)  
✅ **Créer des tournois** (LDC, Championnat, Coupe du Monde, Coupe)  
✅ **Tournois publics/privés**  
✅ **Chat en temps réel** avec tous les joueurs  
✅ **Statistiques personnelles**  
✅ **Interface ultra-stylée** style gaming  

### POUR L'ADMIN (admin@babsgaming.com) :
✅ **Dashboard admin invisible** aux users normaux  
✅ **Envoyer des annonces** globales  
✅ **Voir tous les tournois** et statistiques  
✅ **Supprimer des tournois**  
✅ **Modération du chat**  

---

## 🎨 DESIGN

**Style Gaming Professionnel :**
- 🖤 Fond noir élégant
- ✨ Accents or/néon
- 💫 Animations fluides (Framer Motion)
- 🎮 Effets glow et shadow
- 🔥 Gradients modernes
- ⚡ Responsive (mobile + desktop)

---

## 🛠️ STACK TECHNIQUE

- **React 18** - Framework UI moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **Firebase** :
  - Authentication (Email/Password)
  - Firestore Database (tournois, chat)
  - Temps réel (chat instantané)
- **React Router** - Navigation SPA
- **Vercel** - Hébergement gratuit et performant

---

## 🚀 INSTALLATION LOCALE

### 1️⃣ Cloner le projet

```bash
git clone [TON_REPO]
cd BABSGAMING-WEB
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Configurer Firebase

1. Va sur https://console.firebase.google.com
2. Crée un nouveau projet "BabsGaming"
3. Active **Authentication** → Email/Password
4. Active **Firestore Database** → Mode test
5. Va dans **Paramètres du projet** → **Tes applications** → **Web**
6. Copie ta configuration Firebase
7. Ouvre `src/firebase.js`
8. Remplace la config par la tienne

### 4️⃣ Lancer en dev

```bash
npm run dev
```

L'app sera disponible sur http://localhost:3000

---

## 🌐 DÉPLOIEMENT SUR VERCEL

### Méthode GitHub (Recommandée)

1. **Créer un repo GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [TON_REPO_GITHUB]
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Va sur https://vercel.com
   - Clique sur "New Project"
   - Importe ton repo GitHub
   - Vercel détecte automatiquement Vite
   - Clique sur "Deploy"

3. **C'est en ligne ! 🎉**
   - Tu obtiens une URL comme `babsgaming.vercel.app`
   - Chaque push sur GitHub déploie automatiquement

### Variables d'environnement

Si tu veux sécuriser ta config Firebase sur Vercel :

1. Dans Vercel → Settings → Environment Variables
2. Ajoute tes clés Firebase
3. Modifie `src/firebase.js` pour utiliser `import.meta.env`

---

## 🎮 UTILISATION

### Compte normal :
1. Crée un compte avec n'importe quel email
2. Crée des tournois
3. Chatte avec les autres joueurs

### Compte admin :
1. Connecte-toi avec `admin@babsgaming.com`
2. Un bouton "👑 Admin" apparaît dans la navigation
3. Accède au dashboard admin complet

---

## 📁 STRUCTURE DU PROJET

```
BABSGAMING-WEB/
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Connexion/Inscription
│   │   ├── Home.jsx            # Page d'accueil
│   │   ├── Navigation.jsx      # Barre de navigation
│   │   ├── CreateTournament.jsx # Créer un tournoi
│   │   ├── TournamentView.jsx  # Voir un tournoi
│   │   ├── Chat.jsx            # Chat en temps réel
│   │   └── AdminDashboard.jsx  # Dashboard admin
│   ├── firebase.js             # Config Firebase
│   ├── App.jsx                 # App principale
│   ├── main.jsx                # Point d'entrée
│   └── index.css               # Styles globaux
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎯 FORMATS DE TOURNOIS

### 🏆 Ligue des Champions (LDC)
- 16 ou 32 équipes
- Phase de poules + Phase KO

### 🏅 Championnat
- 8 à 20 équipes
- Format aller-retour
- Classement par points

### 🌍 Coupe du Monde
- 16 ou 32 équipes
- Phase de poules + Phase KO

### 🏆 Coupe
- 8, 16 ou 32 équipes
- Élimination directe simple

---

## 🔥 PROCHAINES FONCTIONNALITÉS (v2.0)

- [ ] Génération automatique des matchs
- [ ] Phase de poules + KO fonctionnels
- [ ] Calendrier des matchs
- [ ] Classements automatiques
- [ ] Meilleurs buteurs
- [ ] Notifications push
- [ ] Upload de logos d'équipes
- [ ] Statistiques avancées
- [ ] Export PDF des résultats

---

## 💬 SUPPORT

**Email :** techmrb065@gmail.com  
**WhatsApp :** +221775790223  

---

## 📄 LICENCE

MIT License - Libre d'utilisation

**Développé avec ❤️ par Mister.B (Babacar Diouf)**  
**© 2026 BabsGaming - Tous droits réservés**
