import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import LandingPage from './components/screens/LandingPage';
import ProductPage from './components/screens/ProductPage';
import UserCartPage from './components/screens/UserCartPage';
import LoginPage from './components/screens/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


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
              <Route path="login" element={ <LoginPage/> } />
            </Routes>
          </Container>
        </main>
      <Footer/>
    </BrowserRouter>
);
}

export default App;
