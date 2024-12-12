import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import SignIn from './components/Auth/SignIn';
import New from './components/Items/New';
import Cloth from './components/Items/Cloth';
import Dashboard from './components/Auth/Dashboard';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';
import { useState } from 'react';
import SignUp from './components/Auth/SignUp';
import FAQs from './components/Customers/FAQs';
import ShippingReturns from './components/Customers/ShippingReturns';
import OrderTracking from './components/Customers/OrderTracking';
import PrivacyPolicy from './components/Customers/PrivacyPolicy';
import TermsOfService from './components/Customers/TermsOfService';
import AboutUs from './components/Customers/AboutUs';
import ContactUs from './components/Customers/ContactUs';
import Popup from './components/Popup';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Outletstore from './components/Store/Outletstore';
import Info from './components/Home/Info';
import Collection from './components/Collection/Collection';
import Women from './components/Items/Women';
import Hoodie from './components/Items/Hoodie';
import Sweatshart from './components/Items/Sweatshart';
import Trouser from './components/Items/Trouser';
import Caps from './components/Items/Caps';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="App">
      <CartProvider>
        <Popup />
        <Navbar toggleCart={toggleCart} isCartOpen={isCartOpen} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/outlet-store' element={<Outletstore />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/new' element={<New />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* <Route path="/orders" element={<Orders />} /> Corrected route for Orders component */}

          <Route path='/men' element={<Cloth />} />
          <Route path='/women' element={<Women />} />
          <Route path='/hoodie' element={<Hoodie />} />
          <Route path='/sweatshart' element={<Sweatshart />} />
          <Route path='/trouser' element={<Trouser />} />
          <Route path='/caps' element={<Caps />} />

          {/* Authentications sections */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductPage toggleCart={toggleCart} />} />


          <Route path="/faqs" element={<FAQs />} />
          <Route path="/ship" element={<ShippingReturns />} />
          <Route path="/ordertrack" element={<OrderTracking />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tearms" element={<TermsOfService />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

        </Routes>

        {/* <Footer /> */}
        <Info />
        <Footer />
      </CartProvider >
    </div >
  );
}

export default App;
