import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './presentation/pages/HomePage'
import { StorePage } from './presentation/pages/StorePage'
import { StoreItemDetailsPage } from './presentation/pages/StoreItemDetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/store" element={<Navigate to="/store/cards" replace />} />
      <Route path="/store/:category" element={<StorePage />} />
      <Route path="/store/:category/:id" element={<StoreItemDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
