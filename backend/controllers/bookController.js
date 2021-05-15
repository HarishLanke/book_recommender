import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'
import { createWorker } from "tesseract.js"; 
import stopword from "stopword";

//UTILS functions for extraction
const getRepetedWords = (str1, str2) => {
  let arr1 = stopword.removeStopwords(str1.split(" "));
  let arr2 = stopword.removeStopwords(str2.split(" "));
  // console.log(arr1,arr2);
  let words={}
  let result = {};
  let count = 0;
  for (let i in arr1) {
    for (let j in arr2) {
      if (arr1[i] === arr2[j] && arr1[i]!=="") {
        // console.log(arr1[i],arr2[j]);
        count += 1;
        result[arr1[i]] = !result[arr1[i]] ? 1 : result[arr1[i]] + 1;
      }
    }
  }
  // delete result[""];
  // console.log(result, count);
  words["count"]=count;
  words["words"]=result;

  //console.log("words",words);
  // return result;
  return words;
};
const removeChracters = (text) => {
  text = text.toLowerCase();
  let newstr = "";
  let iChars = "~`@!#$%^&*+â€™=-[]\\';,/{}|\":<>?»";
  for (let i = 0; i < text.length; i++) {
    if (
      !(text[i] == "\n" || text[i] == "\r" || !(iChars.indexOf(text[i]) == -1))
    ) {
      newstr += text[i];
    }
  }
  return newstr;
};
export const extractBooks= async (file,books)=>{
  const extractedBooks = [];
  let path=`images/${file}`;

  let finalResult={}
  let booksData = {};
  const worker = createWorker();

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  console.log("Extraction Started",file);
  const {
    data: { text },
  } = await worker.recognize(path);
  await worker.terminate();
  // console.log(text);
  const text1=removeChracters(text);
  books.map(book=>{
    booksData[book._id] = {
      _id: book._id,
      name: book.name,
      contents: book.contents,
      image: book.image,
      buy: book.buy,
    };
    // let currentBookContents = removeChracters(book.contents);
    const {count, words}=getRepetedWords(text1,book.contents);
    // finalResult[book._id] = getRepetedWords(
    //   text1,
    //   book.contents
    // );
   
    finalResult[book._id] = count;
    booksData[book._id]["words"]=words;
    // console.log("words,",words);
    // console.log(finalResult);
  })
  
  const keysSorted = Object.keys(finalResult).sort(function (a, b) {
    return finalResult[b] - finalResult[a];
  });
  // console.log(finalResult);
  // console.log(keysSorted);
  for (var i = 0; i < keysSorted.length; i++) {
    if (finalResult[keysSorted[i]] > 2) {
      extractedBooks.push(booksData[keysSorted[i]]);
    }
    // extractedBooks.push(booksData[keysSorted[i]]);
  }
  return extractedBooks;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
    const books = await Book.find({ ...keyword })
  shuffle(books)
  res.json(books)
})

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Fetch extracted books
// @route   GET /api/books/extract/:file
// @access  Public
const getExtractedBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({})
  let extractedBooks;
  // console.log(req.params.file);
  extractedBooks = await extractBooks(req.params.file,books)
  res.json(extractedBooks)
})


export { getBooks, getBookById, getExtractedBooks }
