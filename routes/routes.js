const {Router} = require('express'); 
const router = Router();
const fs = require('fs');

const moviesFile = fs.readFileSync("./movies.json","utf8");
let movies = JSON.parse(moviesFile);

router.get("/",(req,res)=>{
    res.json("Bienvenido a mi API");
});

router.get("/movies",(req,res)=>{
  res.status(200).json(movies);
});

router.post("/movies",(req,res)=>{
    
  const { title, director, year, duration, genre, poster} = req.body;

  if(!title || !director || !year || !duration || !genre || !poster ){
    res.status(401).json({error:"Por favor, diligencie todos los datos"});
  }else{

  const id = movies.length + 1;


  let  newMovie = {
    id,
    title,
    director,
    year,
    duration,
    genre,
    poster
  };

  movies.push(newMovie);
  const json_movies = JSON.stringify(movies);

  fs.writeFileSync("./movies.json", json_movies, "utf-8");

   res.status(200).json(movies);

  }
});

router.put("/movies/:id",(req,res)=>{

  const { title, director, year, duration, genre, poster}=  req.body;
  const id = req.params.id;
   
  if(!title || !director || !year || !duration || !genre || !poster || !id){
    res.status(401).json({error:"Debe completar los datos y especificar el id."});
  }else{
     
    movies.filter((movie)=>{

     if(movie.id == id){
       movie.title = title;
       movie.director = director;
       movie.year = year;
       movie.duration = duration;
       movie.genre = genre;
       movie.poster = poster;
     }
    }); 

    const json_movies = JSON.stringify(movies);
    fs.writeFileSync("./movies.json",json_movies,"utf-8");

    res.status(200).json(movies);


  }

  

});


router.delete("/movies/:id",(req,res)=>{
    const id = req.params.id;

    if(!id){
      res.status(401).json({error: "Especifique un id"});
    }else{
      const indexMovie = movies.findIndex((movie) => movie.id === id);
      movies.splice(indexMovie,1);

      const json_movies = JSON.stringify(movies);
      fs.writeFileSync("./movies.json", json_movies,"utf-8");

      res.status(200).json(movies);

     
    }

});



module.exports = router;