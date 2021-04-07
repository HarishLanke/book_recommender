import axios from 'axios'
import React, { useState, } from 'react'
import Book from '../components/Book'
import { Form, Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { extractBooks} from "../actions/bookActions";
import Loader from '../components/Loader'
import Message from '../components/Message'

function ExtractScreen() {
    const dispatch = useDispatch()


    const extractedBooks = useSelector((state) => state.extractedBooks)
    const { loading, error, extBooks } = extractedBooks
    

    const [uploading, setUploading] = useState(false)
    const [extractSucess, setExtractSucess] = useState(false)
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
      
            const { data } = await axios.post('/api/upload', formData, config)
            // console.log(data);

            setUploading(false)

            dispatch(extractBooks(data));
            setExtractSucess(true)
          } catch (error) {
            console.error(error)
            setUploading(false)
          }
      }
  
    return (
        <><Link to='/' className='btn btn-light my-3'>

        Go Back
      </Link>
      {loading ? (<><h3>Extracting Books From Database</h3><Loader /></>) : error ? (
        <Message variant='danger'>{error}</Message>
      ) :(
          extractSucess ? (<><h1>Extracted Books</h1>
            <Row>
            {extBooks.map((book) => (
              <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                <Book book={book} />
              </Col>
            ))}
          </Row></>) : (<FormContainer>
            <h2>Upload Image</h2>
                    <Form>
                    <Form.Group controlId='image'>
                      <Form.File
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                      ></Form.File>
                      {uploading && <Loader />}
                    </Form.Group>
                    </Form>
                    </FormContainer>)
      )}
      
        </>

    )
}

export default ExtractScreen

