import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Modal from './components/Modal'
import Detail from './pages/Detail'
import Catalog from './pages/Catalog'
import Search from './pages/Search'
import Home from './pages/Home'
import './App.scss'

function App() {
  return (
    <>
    <Header />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:cat" element={<Search />} />
      <Route path="/:category/:id" element={<Detail />} />
    </Routes>
    <Modal />
    <Footer />
    </>
  )
}

export default App
