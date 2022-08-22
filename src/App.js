import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import Search from './pages/Search';
import { useState } from 'react';

function App() {

  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <Routes>
        <Route path='/' exact element={<Home />}/>
        <Route path='/detail/:id' element={<BookDetail />}/>
        <Route path='/search/:query' element={<Search searchValue={searchValue}/>}/>
      </Routes>
    </div>
  );
}
 
export default App;