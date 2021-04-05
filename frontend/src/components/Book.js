import React from 'react'
import { Button, Card } from 'react-bootstrap'
import '../index.css'
const Book = ({ book }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a target="_blank" rel="noopener noreferrer" href={book.buy} title={book.name}><Card.Img className="cardImage" src={book.image} variant='top' /></a>
      <Card.Body>
        <a target="_blank" rel="noopener noreferrer" href={book.buy} title={book.name}><Card.Title as='div'>
            <strong>{book.name}</strong>
          </Card.Title></a>
      <a target="_blank" rel="noopener noreferrer" href={book.buy}><Button
                      className='btn-block'
                      type='button'
                    >
                     Click to buy
                    </Button></a>
      </Card.Body>
    </Card>
  )
}

export default Book
