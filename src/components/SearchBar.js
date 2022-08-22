import './searchBar.css'
import { useState } from 'react'
import {SearchRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchBar() {

  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(searchValue !== ''){
      navigate(`/search/${searchValue}`)
    }
  } 

  return (
    <form className='search' onSubmit={handleSubmit}>
      <input 
        type='text' 
        placeholder='Search BookLib'
        value={searchValue}
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
  )
}

export default SearchBar