import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isDeployed, setIsDeployed] = useState(false)

  useEffect(() => {
    // Проверяем, работает ли приложение на GitHub Pages
    setIsDeployed(window.location.href.includes('github.io'))
  }, [])

  return (
    <div className="app">
      <h1>Привет из Crypto Brains!</h1>
      {isDeployed ? (
        <p>Сайт успешно задеплоен на GitHub Pages 🎉</p>
      ) : (
        <p>Локальная разработка</p>
      )}
    </div>
  )
}

export default App