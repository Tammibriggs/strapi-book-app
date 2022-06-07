import { useEffect, useState } from 'react'
import Book from '../components/Book'
import './home.css'
import {Allbooks} from '../data.js'

function Home() {

  const [books, setBooks] = useState(Allbooks)

  return (
    <div className='home'>
      <div className='hero wrapper'>
        <div className='wrapper'>
          <div className='hero__text'>
            <h2>React books library</h2>
            <p>Get all the React books you need in one place</p>
          </div>
          <img src='/readingBook.png' alt='hero'/>
        </div>
      </div>  

      <div className='allBooks wrapper'>
        <h2>Browse books</h2>
        <div className='books'>
          {books?.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              image={book.image}
              authors={book.authors}
              publisher={book.publisher}
              publishDate={book.publishedDate}
              id={book.id}
            />
          ))}
        </div>
      </div>
    </div> 
  )
}

export default Home
