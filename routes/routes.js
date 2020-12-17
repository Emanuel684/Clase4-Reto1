const {Router} = require('express'); 
const router = Router();
const fs = require('fs');

const booksFile = fs.readFileSync("./books.json","utf8");
let books = JSON.parse(booksFile);

router.get("/",(req,res)=>{
    res.json("Bienvenido a la API sobre los mejores libros.");
});

router.get("/books",(req,res)=>{
  res.status(200).json(books);
});

router.post("/newBooks",(req,res)=>{
    
  const { titulo,autor,ano,pais,idioma } = req.body;

  if(!titulo || !autor || !ano || !pais || !idioma ){
    res.status(401).json({error:"Por favor, diligencie todos los datos"});
  }else{

  const id = books.length + 1;


  let  newBook = {
    id,
    titulo,
    autor,
    ano,
    pais,
    idioma
  };

  books.push(newBook);
  const json_books = JSON.stringify(books);

  fs.writeFileSync("./books.json", json_books, "utf-8");

   res.status(200).json(books);

  }
});

router.put("/updateBooks/:id",(req,res)=>{

  const { titulo,autor,ano,pais,idioma }=  req.body;
  const id = req.params.id;
   
  if(!titulo || !autor || !ano || !pais || !idioma || !id){
    res.status(401).json({error:"Debe completar los datos y especificar el id."});
  }else{
     
    books.filter((books)=>{

     if(books.id == id){
       books.titulo = titulo;
       books.autor = autor;
       books.ano = ano;
       books.pais = pais;
       books.idioma = idioma;
     }
    }); 

    const json_books = JSON.stringify(books);
    fs.writeFileSync("./books.json",json_books,"utf-8");

    res.status(200).json(books);


  }

  

});


router.delete("/deleteBooks/:id",(req,res)=>{
    const id = req.params.id;

    if(!id){
      res.status(401).json({error: "Especifique un id"});
    }else{
      const indexMovie = books.findIndex((movie) => movie.id === id);
      books.splice(indexMovie,1);

      const json_books = JSON.stringify(books);
      fs.writeFileSync("./books.json", json_books,"utf-8");

      res.status(200).json(books);

     
    }

});



module.exports = router;