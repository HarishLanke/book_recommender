import mongoose from 'mongoose'


const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    buy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema)

export default Book
