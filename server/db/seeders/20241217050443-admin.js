'use strict';
const bcrypt = require('bcrypt');
const Admin = require('../Models/Admin'); // Import the admin model
const user_type= require('../Models/user_type'); // Import the usertype model


module.exports = {
  up: async (models, mongoose) => {
    try {
      // Hash the password before seeding
      const hashedPassword = await bcrypt.hash('admin@123', 10);
      
      // Check if the usertype already exists
      const existingUserType = await user_type.findOne({ _id: new mongoose.Types.ObjectId("6766e758203c503ae0b70ce3") });

      if (!existingUserType) {
        // Insert the usertype for admin if it doesn't exist
        await user_type.insertMany([
          {
            _id: new mongoose.Types.ObjectId("6766e758203c503ae0b70ce3"), // Create ObjectId for usertype
            user_type: 'Admin', // Define the usertype
          }
        ]);
      }

      // Check if the admin user already exists
      const existingAdmin = await Admin.findOne({ _id: new mongoose.Types.ObjectId("676108b27411837c5a70cc09") });

      if (!existingAdmin) {
        // Insert the admin user with a reference to the usertype
        await Admin.insertMany([
          {
            _id: new mongoose.Types.ObjectId("676108b27411837c5a70cc09"), // Use 'new' with ObjectId
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword, // Store hashed password
            user_type: "6766e758203c503ae0b70ce3" // Reference the usertype _id directly
          }
        ]);
      }

      console.log(`Seeding completed successfully.`);
    } catch (error) {
      console.error('Error seeding users and usertypes:', error);
    }
  },

  down: async (models, mongoose) => {
    try {
      // Delete the admin user by ID
      const adminRes = await Admin.deleteMany({
        _id: new mongoose.Types.ObjectId("676108b27411837c5a70cc09"),
      });

      // Delete the associated usertype by ID
      const userTypeRes = await user_type.deleteMany({
        _id: new mongoose.Types.ObjectId("6766e758203c503ae0b70ce3"),
      });

      console.log(`${adminRes.deletedCount} admin user(s) and ${userTypeRes.deletedCount} usertype(s) deleted successfully.`);
    } catch (error) {
      console.error('Error deleting seeded users and usertypes:', error);
    }
  }
};
