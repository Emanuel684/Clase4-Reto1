const { Router } = require("express");
const router = Router();
const fs = require("fs");

//LOWDB
const low = require("lowdb");

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("books.json");
const book = low(adapter);


// POST

router.post("/newBooks", (req, res) => {
  const { titulo, autor, ano, pais, idioma } = req.body;

  if (!titulo || !autor || !ano || !pais || !idioma) {
    res.status(401).json({ error: "Por favor, diligencie todos los datos" });
  } else {
    const id = book.size() + 1;

    let newBook = {
      id,
      titulo,
      autor,
      ano,
      pais,
      idioma,
    };

    book.push(newBook).write();

    res.status(200).json(book);
  }
});

// PUT

router.put("/updateBooks/:id", (req, res) => {
  const { titulo, autor, ano, pais, idioma } = req.body;
  const updateBook = {
    titulo: titulo,
    autor: autor,
    ano: ano,
    pais: pais,
    idioma: idioma,
  };
  const idBook = parseInt(req.params.id);

  if (!titulo || !autor || !ano || !pais || !idioma || !idBook) {
    res
      .status(401)
      .json({ error: "Debe completar los datos o especificar el id." });
  } else {
    book.find({ id: idBook }).assign(updateBook).write();

    console.log(book);

    res.status(200).json(book);
  }
});

// DELETE

router.delete("/deleteBooks/:id", (req, res) => {
  const idBook = parseInt(req.params.id);

  if (!idBook) {
    res.status(401).json({ error: "Especifique un id." });
  } else {
    book.remove({ id: idBook }).write();

    console.log(book.remove({ id: idBook }))

    res.status(200).json(book);
  }
});

//FIN

const booksFile = fs.readFileSync("./books.json", "utf8");
let books = JSON.parse(booksFile);

router.get("/", (req, res) => {
  res.json("Bienvenido a la API sobre los mejores libros.");
});

// GET LIBROS

router.get("/books", (req, res) => {
  book.get("libros").value();
  res.status(200).json(books);
});


module.exports = router;
