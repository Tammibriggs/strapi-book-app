import { useParams } from 'react-router-dom'
import './search.css'
import MeiliSearch from 'meilisearch'
import {useEffect, useState} from 'react'
import Book from '../components/Book'

function Search() {

  const params = useParams()
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const client = new MeiliSearch({
        host: 'http://127.0.0.1:7700',
      })
      const index = await client.getIndex('book')
      const booksData = await index.search(params.query)
      console.log('This is the book data',booksData.hits)
      setBooks(booksData.hits)
    }
    fetchData()
  }, [params.query])

  return (
    <div className='searchPage wrapper'>
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
  )
}

export default Search
