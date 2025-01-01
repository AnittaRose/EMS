const leavetypes = require('../Models/leavetypes')

'use strict';

module.exports = {
  up: (models, mongoose) => {
   
      return models.leavetypes.insertMany([
        {
          _id : "6766ec95f35e586ca286d5a9",
          leaveType : "Sick Leave"
         },
         {
           _id : "6766eca5f35e586ca286d5aa",
           leaveType : "Personal Leave"
          },
          {
            _id : "6766ecb4f35e586ca286d5ab",
            leaveType : "Maternity Leave"
           },
           {
            _id : "6766ecc5f35e586ca286d5ac",
            leaveType : "Emergency Leave"
           },
           {
            _id : "6766ecd4f35e586ca286d5ad",
            leaveType : "Casual Leave"
           },
      ]).then(res => {

      console.log(res.insertedCount);
    });
  
  },

  down: (models, mongoose) => {
  
      return models.leavetypes.deleteMany({
        _id:{
          $in : [
            "6766ec95f35e586ca286d5a9",
           "6766eca5f35e586ca286d5aa",
           "6766ecb4f35e586ca286d5ab",
           "6766ecc5f35e586ca286d5ac",
           "6766ecd4f35e586ca286d5ad"
          ]

        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  
  }
};
