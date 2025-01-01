const user_type = require('../Models/user_type')

'use strict';

module.exports = {
  up: (models, mongoose) => {
   
      return models.user_type.insertMany([
        {
          _id : "6766e758203c503ae0b70ce3",
          user_type : "Admin"
         },
         {
           _id : "6766e292ef0219c8f55991b7",
           user_type : "Employee"
          }
      ]).then(res => {

      console.log(res.insertedCount);
    });
  
  },

  down: (models, mongoose) => {
  
      return models.user_type.deleteMany({
        _id:{
          $in : [
            "6766e27cef0219c8f55991b6",
           "6766e292ef0219c8f55991b7"
          ]

        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  
  }
};
