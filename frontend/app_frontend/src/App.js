import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/screens/LandingPage';
import ProductPage from './components/screens/ProductPage';
import UserCartPage from './components/screens/UserCartPage';
import LoginPage from './components/screens/LoginPage';
import RegisterPage from './components/screens/RegisterPage';
import ProfilePage from './components/screens/UserProfilePage';
import ShippingPage from './components/screens/ShippingPage';
import PaymentPage from './components/screens/PaymentPage';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path="/" element={ <LandingPage/> } exact />
              <Route path="product/:id" element={ <ProductPage/> } />
              <Route path="cart/:id?" element={ <UserCartPage/> } />
              <Route path='shipping' element={ <ShippingPage/> } />
              <Route path='payment' element={ <PaymentPage/> } />

              <Route path="user/login" element={ <LoginPage/> } />
              <Route path="user/register" element={ <RegisterPage/> } />
              <Route path="user/profile" element={ <ProfilePage/> } />
              <Route path="user/lost-password" element={ <LoginPage/> } />
            </Routes>
          </Container>
        </main>
      <Footer/>
    </BrowserRouter>
);
}

export default App;
