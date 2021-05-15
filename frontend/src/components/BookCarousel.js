import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopBooks } from '../actions/bookActions'

const BookCarousel = () => {
  const dispatch = useDispatch()

  const bookTop = useSelector((state) => state.bookTop)
  const { loading, error, books } = bookTop

  useEffect(() => {
    dispatch(listTopBooks())
  }, [dispatch])


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {books.map((book) => (
        <Carousel.Item key={book._id}>
          <a target="_blank" rel="noopener noreferrer" href={book.buy} title={book.name}>
            <Image src={book.image} alt={book.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {book.name} 
              </h2>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default BookCarousel