import './App.css';
import { Routes, Route } from 'react-router'
import Card from './pages/card';
import CardList from './pages/card-list';
import Home from './pages/front-page';
import Navbar from './components/navbar';
import NotFound from './pages/404';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardlist" element={<CardList />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
