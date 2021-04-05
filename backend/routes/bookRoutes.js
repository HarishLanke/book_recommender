import express from 'express'
const router = express.Router()
import {
  getBooks,
  getBookById,
  getExtractedBooks
} from '../controllers/bookController.js'

router.route('/').get(getBooks)
router.route('/:id').get(getBookById)
router.route('/extract/:file').get(getExtractedBooks)

export default router
