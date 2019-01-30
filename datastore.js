/**
* A thin promise-based wrapper around the nedb datastore. Allows you to run the
* following types of queries:
*  1. find
*  2. insert
*  3. remove
*/

const Datastore = require('nedb');
const db = new Datastore({ filename: '.data/datafile', autoload: true });

function find(opt){
  return new Promise((resolve, reject) => {
    db.find(opt, (err, docs) => {
      if(err)
        reject(err)
      resolve(docs)
    })
  });
}

function insert(data){
    return new Promise((resolve, reject) => {
      db.insert(data, (err, newDoc) => {
         if(err)
           reject(err)
        resolve(newDoc)
      });
  });
}

function remove(query, opts={}){
   return new Promise((resolve, reject) => {
     db.remove(query, opts, (err, numRemoved) => {
       if(err)
         reject(err)
       resolve(numRemoved)
     });
   });
}

module.exports = {
  find,
  insert,
  remove
}