import xlsx from "xlsx";
import request from "request";
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
const oldGetBooksDataset = () =>{
  request("https://sheet.best/api/sheets/851de9a7-ab6f-43c0-99c7-d324729aa913", {json: true}, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };
    if (!error && res.statusCode == 200) {
      const books=[]    
      body.map(book=>{
                let current={}
                current.name=book.name
                current.image=book.image
                current.contents=removeChracters(book.contents)
                current.buy=book.buy
                books.push(current)
            })
      // console.log(books)
      return books;

      };
}); 
}
 export const getBooksDataset = () =>{
  const wb = xlsx.readFile("backend/Books dataset.xlsx")
  const ws = wb.Sheets["Sheet1"]
  const data = xlsx.utils.sheet_to_json(ws)
  const books=[]
  data.map(book=>{
      let current={}
      current.name=book.name
      current.image=book.image
      current.contents=removeChracters(book.contents)
      current.buy=book.buy
      books.push(current)
  })
  return books
     
 }


