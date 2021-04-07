import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  EXTRACT_BOOKS_REQUEST,
  EXTRACT_BOOKS_SUCCESS,
  EXTRACT_BOOKS_FAIL,
} from '../constants/bookConstants'

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, books: [] }
    case BOOK_LIST_SUCCESS:
      return { loading: false,books: action.payload }
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}




export const extractBookReducer = (state = { extBooks: [] }, action) => {
  
  switch (action.type) {
    case EXTRACT_BOOKS_REQUEST:
      return { loading: true, extBooks:[]}
    case EXTRACT_BOOKS_SUCCESS:
      return { loading: false, extBooks: action.payload }
    case EXTRACT_BOOKS_FAIL:
      return { loading: false, error: action.payload }
    default:
    return state
  }
}