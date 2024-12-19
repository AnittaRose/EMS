// const { successfunction, errorfunction } = require('../util/responsehandler');
// const Admin = require('../db/Models/Admin');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// exports.login = async function (req,res){
//     try {
//         let email = req.body.email;
//         console.log("email : ", email);
    
//         let password = req.body.password;
//         console.log("password : ", password);
    
//         let user = await Admin.findOne({email}).populate('user_type');
//             console.log("user : ", user.user_type);
    
    
//         if(user){
//             let db_password = user.password;
//             console.log("db_password  : ",db_password);
    
//             let passwordMatch = bcrypt.compareSync(password,db_password);
//             console.log("passwordMatch",passwordMatch);
    
//             if(passwordMatch){
//                 let token =jwt.sign({user_id : user._id},process.env.PRIVATE_KEY,{expiresIn : "10d"});
    
//                 let id = user._id;
//                 console.log('id',id);
//                 let user_type  = user.user_type;
//                 console.log('user_type',user_type)
    
//                 let token_data = {
//                     token,
//                     id,
//                     user,
//                     user_type
//                 }
    
    
                    
//             let response = successfunction({
//                 success: true,
//                 statuscode: 200,
//                 data : token_data,
//                 message: "successfully Logined.....",
//             });
//             res.status(response.statuscode).send(response);
//             return;
    
//         }else{
//             let response = errorfunction({
//                 success: false,
//                 statuscode: 400,
//                 message: "Invalid password.....",
//             });
//             res.status(response.statuscode).send(response);
//             return;
    
//         }}else {
//             let response = errorfunction({
//                 statusCode : 404,
//                 message : "User not found",
//             });
    
//             res.status(response.statuscode).send(response);
//             return;
//         }
    
//         } catch (error) {
//             console.log("autherror : ", error);
    
//             let response = errorfunction({
//                 success: false,
//                 statuscode: 400,
//                 message: "not added..",
//             });
//             res.status(response.statuscode).send(response)
//             return;
//         }
//     }



const { successfunction, errorfunction } = require('../util/responsehandler');
const admin = require('../db/Models/Admin'); // Using 'EMSCONTROLLER' for admin model
const users = require('../db/Models/Employe'); // Using 'Employee' model for user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log("Received email:", email);
        console.log("Received password:", password);

        // Check if the email exists in the admin collection
        let adminUser = await admin.findOne({ email }).populate('user_type'); // Populate for admin model
        console.log("Admin User before population:", adminUser);

        // If not found in admin, check the user collection
        let regularUser = null;
        if (!adminUser) {
            regularUser = await users.findOne({ email }).populate('user_type'); // Populate for employee model
            console.log("Regular User before population:", regularUser);
        }

        let dbUser = adminUser || regularUser;  // Determine if the user is admin or regular
        console.log("Final DB User after population:", dbUser);  // Log the final selected user object

        // If user (either admin or regular) is found
        if (dbUser) {
            const passwordMatch = bcrypt.compareSync(password, dbUser.password);
            console.log("Password match:", passwordMatch);

            if (passwordMatch) {
                const token = jwt.sign(
                    { user_id: dbUser._id },
                    process.env.PRIVATE_KEY,
                    { expiresIn: '10d' }
                );

                console.log("Token generated:", token);

                // Ensure the correct field is being accessed
                const userType = dbUser.user_types;  // Accessing user_types correctly
                console.log("User Type from dbUser:", userType);  // Log user type

                const token_data = {
                    token,
                    id: dbUser._id,
                    user_type: userType ? userType : 'No User Type Found' // Added fallback
                };

                const response = successfunction({
                    success: true,
                    statuscode: 200,
                    data: token_data,
                    message: "Successfully logged in."
                });
                return res.status(response.statuscode).send(response);
            } else {
                // If password doesn't match
                const response = errorfunction({
                    success: false,
                    statuscode: 400,
                    message: "Invalid password."
                });
                return res.status(response.statuscode).send(response);
            }
        } else {
            // If neither admin nor user found
            const response = errorfunction({
                success: false,
                statuscode: 404,
                message: "User not found."
            });
            return res.status(response.statuscode).send(response);
        }
    } catch (error) {
        console.error("Error during login:", error);  // Log the detailed error

        // Return more specific error message
        const response = errorfunction({
            success: false,
            statuscode: 500,
            message: `An error occurred during login. Details: ${error.message}`
        });
        return res.status(response.statuscode).send(response);
    }
};
