const ds = require("./datastore.js");

function storeEmail(email){  
    const emailObj = {email}
    
    return ds.find(emailObj)
      .then((emailDocsDB) => {
        if(emailDocsDB.length > 0)
          return Promise.reject(`${email} already in database`)
        return ds.insert(emailObj)      
      })  
}

module.exports = {storeEmail}