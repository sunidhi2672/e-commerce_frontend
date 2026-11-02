// import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import PracticeContext from './components/contextApiPractice/PracticeContext';
import { CartProvider } from './context/CartContext';

function App() {





  return (
    <BrowserRouter>
 
<CartProvider>



   <Header/>

     
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        {/* <Route path element /> */}
        <Route path='/testContext' element={<PracticeContext/>}/>


      </Routes>


      <Footer/> 

  
  
  </CartProvider>

    



    </BrowserRouter>
  );
}

export default App