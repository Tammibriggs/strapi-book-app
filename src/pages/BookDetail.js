import './bookDetail.css'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Allbooks } from '../data'
import MeiliSearch from 'meilisearch'

function BookDetail() {

  const [book, setBook] = useState({})
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const client = new MeiliSearch({
        host: 'http://127.0.0.1:7700',
      })
      const index = await client.getIndex('book')
      const bookData = await index.getDocument(params.id)
      setBook(bookData)
    }
    fetchData()
  }, [])

  return (
    <div className='bookDetail wrapper'>
      <div className='bookDetail__top'>
        <img src={book.image} alt='book'/>

        <div className='bookDetail__topDec'>
          <h3>{book.title}</h3>
          <p>{book.subtitle}</p>
          <div className='bookDetail__authors'>
              By: {book.authors?.map((author, i) => (
              <span key={i}>{author}</span>
            ))}
          </div>
          <span>{book.publisher}, {book.publishedDate}</span>
          <a href={book.previewLink} className='sourceLink'>View in Source</a>
        </div>
      </div>

      <div className='bookDetail__bottomDec'>
        <h4>Description</h4>
        <p>{book.description}</p>
      </div>
    </div>
  )
}

export default BookDetail
