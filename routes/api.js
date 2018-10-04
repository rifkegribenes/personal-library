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
          if (!bookDocs) { return res.status(200).send('no books found') }
          const books = bookDocs.map((book) => {
            return {
              _id: book._id,
              title: book.title,
              commentcount: book.comments.length 
            }
          });
          console.log(books);
          res.status(200).json(books);
      })
        .catch((err) => {
          console.log(`api.js > get Book.find: ${err}`);
          return handleError(res, err);
        }); 
    })
    
    .post((req, res) => {
      const title = req.body.title;
      if (!title) { 
        return res.status(200).send('missing inputs');
      };
      const book = new Book({ title });
      Book.save()
        .then((book) => {
          console.log(book);
          res.status(200).json({ title: book.title, _id: book._id });
        })
        .catch((err) => {
          console.log(`api.js > post Book.save: ${err}`);
          return handleError(res, err);
        }); 
    })
    
    .delete((req, res) => {
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
