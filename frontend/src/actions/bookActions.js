import axios from 'axios'
import {
  BOOK_LIST_FAIL, BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  EXTRACT_BOOKS_FAIL, EXTRACT_BOOKS_REQUEST,
   EXTRACT_BOOKS_SUCCESS
} from '../constants/bookConstants'

export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST })

    const { data } = await axios.get('/api/books')

    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


  export const extractBooks = (file) => async (dispatch,getState) => {
    const {
      extractedBooks: { extBooks },
    } = getState()
    // console.log(extBooks.length);
    extBooks.splice(0, extBooks.length);
    // extBooks.length = 0
    // console.log(extBooks);
    try {
      dispatch({
        type: EXTRACT_BOOKS_REQUEST,
      })
     
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.get(
        `/api/books/extract/${file}`,
        config
      )
  
      dispatch({
        type: EXTRACT_BOOKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EXTRACT_BOOKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  
  

