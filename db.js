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

module.exports = {
  find,
  insert
}