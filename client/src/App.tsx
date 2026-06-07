import './App.css'
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Route-level code splitting: each page becomes its own chunk, loaded on demand.
const Home = lazy(() => import('./components/pages/Home'))
const ProductDetails = lazy(() => import('./components/layout/ProductDetails'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white dark:bg-black">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-neutral-700 dark:border-t-white"
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-black">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/" element={<ProductDetails />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  )
}

export default App
