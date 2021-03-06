import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Book from '../components/Book'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBooks } from '../actions/bookActions'
import BookCarousel from '../components/BookCarousel'

const HomeScreen = ({match}) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const bookList = useSelector((state) => state.bookList)
  const { loading, error, books } = bookList

  useEffect(() => {
    dispatch(listBooks(keyword))
  }, [dispatch,keyword])

  return (
    <>
    {!keyword && <BookCarousel/>}
      <h1>Latest Books</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {books.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
              <Book book={book} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
