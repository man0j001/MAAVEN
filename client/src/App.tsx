import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProductGroup from './components/layout/ProductGroup'
import Home from './components/pages/Home'
import ProductDetails from './components/layout/ProductDetails'
import { Routes,Route } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'

function App() {

  return (<>
  <Navbar/>
  <div className="bg-white">
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route
            path="/products/"
            element={<ProductDetails/>}
          ></Route>
          <Route
            path="/products/:id"
            element={<ProductDetails/>}
          ></Route>
          {/* <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} /> */}
    </Routes>
  </div>
  <Footer/>
  </>
  )
}

export default App
