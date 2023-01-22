import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import LandingPage from './components/screens/LandingPage'


function App() {
  return (
    <div>
      <Header/>
        <LandingPage/>
        <main className='py-3'><Container><h1>Welcome</h1></Container></main>
      <Footer/>
    </div>
);
}

export default App;
