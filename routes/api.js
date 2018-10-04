/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
const Book = require('../models/book');

module.exports = (app) => {
  
  const handleError = (res, err) => {
    return res.status(500).json({message: err});
  }

  app.route('/api/books')
    .get((req, res) => {
      Book.find()
        .then((bookDocs) => {
          const books = bookDocs.map((book) => {
            return {
              _id: book._id,
              title: book.title,
              commentcount: book.comments.length 
            }
          });
          res.status(200).json(books);
      })
        .catch((err) => {
          console.log(`api.js > get Book.find: ${err}`);
          return handleError(res, err);
        }); 
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
