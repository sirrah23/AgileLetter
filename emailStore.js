const ds = require("./datastore.js");

function storeEmail(email){  
    const emailObj = {email};
    return ds.find(emailObj)
      .then((emailDocsDB) => {
        if(emailDocsDB.length > 0)
          return Promise.reject(`${email} already in database`);
        return ds.insert(emailObj);      
      })  
}

function deleteEmail(email){  
    const emailObj = {email};
    return ds.remove(emailObj);
}

function getAllEmail(email){
   return ds.find({}); 
}

module.exports = {storeEmail, deleteEmail}