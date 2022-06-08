import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import Search from './pages/Search';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />}/>
        <Route path='/detail/:id' element={<BookDetail />}/>
        <Route path='/search/:query' element={<Search />}/>
      </Routes>
    </div>
  );
}

export default App;
