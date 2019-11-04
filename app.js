const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages();
 let randNum = Math.floor(Math.random() * 20);
 
 console.dir("parsedData: " + parsedData); //displays content of the object
    
 res.render("index", {"image":parsedData.hits[randNum].largeImageURL});
            
}); //root route


app.get("/results", function(req, res){
    
    let parsedData = "";
 
 request('https://pixabay.com/api/?key=10288928-e28258c7c61a0cd6e8cfdd031',
             function (error, response, body) {

        if (!error && response.statusCode == 200  ) { //no issues in the request
            
             parsedData = JSON.parse(body); //converts string to JSON
            
            let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
            //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
            res.render("results", {"images":parsedData});
            
        } else {
            console.log(response.statusCode);
            console.log(error);
        }

   });//request
    
    
    //res.render("results");
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=10288928-e28258c7c61a0cd6e8cfdd031',
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                //res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});