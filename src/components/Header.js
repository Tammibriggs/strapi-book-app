import './header.css'
import SearchBar from '../components/SearchBar'
import {useNavigate} from 'react-router-dom'

function Header() {

  const navigate = useNavigate()

  return (
    <header>
      <div className='wrapper'>
        <div className='logo' onClick={() => navigate('/')}>
          <h2><img src='/book.png' alt='logo'/>BookLib</h2>
        </div>  
        <SearchBar />
      </div>
    </header> 
  )
}

export default Header
