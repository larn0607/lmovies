import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Detail from './pages/Detail'
import Catalog from './pages/Catalog'
import Search from './pages/Search'
import Home from './pages/Home'
import './App.scss'

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/search/:keywords" element={<Search />} />
      <Route path="/:category/:id" element={<Detail />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
