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
      const newBook = new Book({ title });
      newBook.save()
        .then((book) => {
          res.status(200).json(book);
        })
        .catch((err) => {
          console.log(`api.js > post Book.save: ${err}`);
          return handleError(res, err);
        }); 
    })
    
    .delete((req, res) => {
      Book.deleteMany()
        .then(() => res.status(200).send('complete delete successful'))
        .catch((err) => {
          console.log(`api.js > delete Book.deleteMany: ${err}`);
          return handleError(res, err);
        }); 

    });



  app.route('/api/books/:id')
    .get((req, res) => {
      const bookid = req.params.id;
      Book.findOne({ _id: bookid })
        .then((book) => {
          if (!book) { 
            return res.status(200).send('no book exists'); 
          } else {
            return res.status(200).json(book);
          }
        })
        .catch((err) => {
          console.log(`api.js > get Book.findOne: ${err}`);
          return handleError(res, err);
        }); 
    })
    
    .post(function(req, res){
      const bookid = req.params.id;
      const comment = req.body.comment;
      Book.findOne({ _id: bookid })
        .then((book) => {
          if (!book) { 
            return res.status(200).send('no book exists'); 
          } else {
            book.comments.push(comment);
            book.save()
              .then((updatedBook) => {
                return res.status(200).json(updatedBook);
              })
              .catch((err) => {
                console.log(`api.js > post Book.save: ${err}`);
                return handleError(res, err);
              });
          }
        })
        .catch((err) => {
          console.log(`api.js > get Book.findOne: ${err}`);
          return handleError(res, err);
        });
    })
    
    .delete(function(req, res){
      const bookid = req.params.id;
        Book.deleteOne({ _id: bookid })
          .then(() => res.status(200).send('delete successful'))
          .catch((err) => {
            console.log(`api.js > delete Book.deleteOne: ${err}`);
            return handleError(res, err);
          }); 
    });
  
};
