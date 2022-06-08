import { useEffect, useState } from 'react'
import Book from '../components/Book'
import './home.css'
import {Allbooks} from '../data.js'
import axios from 'axios'
import MeiliSearch from "meilisearch";
import {useRef, useCallback} from 'react'

function Home() {

  const [books, setBooks] = useState([])
  const URL = "http://localhost:1337/api/books"
  const observerElem = useRef(null)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [offset, setOffset] = useState(0)
  const [lastPage, setLastPage] = useState({})

  const fetchData = async () => {
    const client = new MeiliSearch({
      host: 'http://127.0.0.1:7700',
    })
    const index = await client.getIndex('book')
    const booksData = await index.search('*', {
      limit: 15,
      offset: offset 
    })
    setBooks([...books,  ...booksData.hits])
    setLastPage(booksData)
  }

  useEffect(() => {
    setOffset(books.length)
    if(books.length < lastPage.estimatedTotalHits){
      setHasNextPage(true)
    }else{
      setHasNextPage(false)
    }
  }, [books])

  const handleObserver = useCallback((entries) => {
    const [target] = entries
    if(target.isIntersecting && hasNextPage) {
      fetchData()
    }
  }, [fetchData, hasNextPage])

  useEffect(() => {
    const element = observerElem.current
    const option = { threshold: 0 }
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [hasNextPage, handleObserver])

  useEffect(() => {
    fetchData()
    sendData()
  }, [])

  const sendData = async () => {
    let fetchedData;
    const fetchCol = await axios.get(URL)
    fetchedData = fetchCol.data.data

    if (!fetchedData.length) {
      try {
        books.forEach((book) => {
          axios.post(URL,{
          data: {
            authors: book.authors,
            description: book.description,
            image: book.image,
            previewLink: book.previewLink,
            publishDate: book.publishDate,
            publisher: book.publisher,
            subtitle: book.subtitle,
            title: book.title,
          }})
        })
        console.log('done')
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("data already uploadedd")
    }
  }

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
        
          <div className='loader' ref={observerElem}>
            {books.length !== 0 &&
              <span>{hasNextPage ? 'Loading...' : 'no books left'}</span>
            }
          </div>
      </div>
    </div> 
  )
}

export default Home
