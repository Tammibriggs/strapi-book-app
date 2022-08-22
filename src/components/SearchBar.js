import './searchBar.css'
import { useState } from 'react'
import {SearchRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MeiliSearch from 'meilisearch'; // added this
import Book from './Book';

function SearchBar({searchValue, setSearchValue}) {

  const [books, setBooks] = useState({}) // added this
  const [resultModal, setResultModal] = useState(false)
  const page = window.location.pathname.split('/')[1]
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(searchValue !== ''){
      navigate(`/search/${searchValue}`)
      setResultModal(false)
    }
  } 

  // added search function
  const search = async () => {
    if(page !== 'search'){
      const client = new MeiliSearch({
        host: 'http://127.0.0.1:7700',
      })
      const index = await client.getIndex('book')
      if(searchValue.length >= 1){
        const booksData = await index.search(searchValue, {
          limit: 5,
        })
        setBooks(booksData)
        setResultModal(true)
      }
    }
  }

  return (
    <div className='searchContainer'>
      <form className='search' onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='Search BookLib'
          value={searchValue}
          onKeyUp={search} // added this
          onChange={e => setSearchValue(e.target.value)}/>
          {searchValue.length >= 1 &&
            <span 
              className='search__cancel'
              onClick={() => setSearchValue('')}>x</span>
          }
          <Button 
            id='search__iconContainer'
            variant='contained'
            disableElevation
            onClick={handleSubmit}
          >
            <SearchRounded className='search__icon'/>
          </Button>
      </form>
      {(books.hits?.length !== 0 && resultModal && searchValue != '') &&
        <div className='search__results'>
          {books.hits?.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              image={book.image}
              onClick={() => setSearchValue('')}
              authors={book.authors}
              publisher={book.publisher}
              publishDate={book.publishedDate}
              id={book.id}
            />
          ))}
          {books.estimatedTotalHits > 5 &&
            <button onClick={handleSubmit}>SEE ALL</button>
          }
        </div>
      }
    </div>
  )
}

export default SearchBar