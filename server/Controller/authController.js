
// const { successfunction, errorfunction } = require('../util/responsehandler');
// const admin = require('../db/Models/Admin'); // Using 'EMSCONTROLLER' for admin model
// const users = require('../db/Models/Employe'); // Using 'Employee' model for user
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// exports.login = async function (req, res) {
//     try {
//         const { email, password } = req.body;
//         console.log("Received email:", email);
//         console.log("Received password:", password);

//         // Check if the email exists in the admin collection
//         let adminUser = await admin.findOne({ email }).populate('user_type'); // Populate for admin model
//         console.log("Admin User before population:", adminUser);

//         // If not found in admin, check the user collection
//         let regularUser = null;
//         if (!adminUser) {
//             regularUser = await users.findOne({ email }).populate('user_type'); // Populate for employee model
//             console.log("Regular User before population:", regularUser);
//         }

//         let dbUser = adminUser || regularUser;  // Determine if the user is admin or regular
//         console.log("Final DB User after population:", dbUser);  // Log the final selected user object

//         // If user (either admin or regular) is found
//         if (dbUser) {
//             const passwordMatch = bcrypt.compareSync(password, dbUser.password);
//             console.log("Password match:", passwordMatch);

//             if (passwordMatch) {
//                 const token = jwt.sign(
//                     { user_id: dbUser._id },
//                     process.env.PRIVATE_KEY,
//                     { expiresIn: '10d' }
//                 );

//                 console.log("Token generated:", token);

//                 // Ensure the correct field is being accessed
//                 const userType = dbUser.user_type;  // Accessing user_types correctly
//                 console.log("User Type from dbUser:", userType);  // Log user type

//                 const token_data = {
//                     token,
//                     id: dbUser._id,
//                     user_type: userType ? userType : 'No User Type Found' // Added fallback
//                 };

//                 const response = successfunction({
//                     success: true,
//                     statuscode: 200,
//                     data: token_data,
//                     message: "Successfully logged in."
//                 });
//                 return res.status(response.statuscode).send(response);
//             } else {
//                 // If password doesn't match
//                 const response = errorfunction({
//                     success: false,
//                     statuscode: 400,
//                     message: "Invalid password."
//                 });
//                 return res.status(response.statuscode).send(response);
//             }
//         } else {
//             // If neither admin nor user found
//             const response = errorfunction({
//                 success: false,
//                 statuscode: 404,
//                 message: "User not found."
//             });
//             return res.status(response.statuscode).send(response);
//         }
//     } catch (error) {
//         console.error("Error during login:", error);  // Log the detailed error

//         // Return more specific error message
//         const response = errorfunction({
//             success: false,
//             statuscode: 500,
//             message: `An error occurred during login. Details: ${error.message}`
//         });
//         return res.status(response.statuscode).send(response);
//     }
// };









const { successfunction, errorfunction } = require('../util/responsehandler');
const admin = require('../db/Models/Admin');
const users = require('../db/Models/Employe');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Attendance = require('../db/Models/Attendance');  // Import your Attendance model

dotenv.config();

// exports.login = async function (req, res) {
//     try {
//         const { email, password } = req.body;
//         console.log("Received email:", email);
//         console.log("Received password:", password);

//         // Check if the email exists in the admin collection
//         let adminUser = await admin.findOne({ email }).populate('user_type');
//         console.log("Admin User before population:", adminUser);

//         // If not found in admin, check the user collection
//         let regularUser = null;
//         if (!adminUser) {
//             regularUser = await users.findOne({ email }).populate('user_type');
//             console.log("Regular User before population:", regularUser);
//         }

//         let dbUser = adminUser || regularUser;  // Determine if the user is admin or regular
//         console.log("Final DB User after population:", dbUser);  // Log the final selected user object

//         // If user (either admin or regular) is found
//         if (dbUser) {
//             const passwordMatch = bcrypt.compareSync(password, dbUser.password);
//             console.log("Password match:", passwordMatch);

//             if (passwordMatch) {
//                 const token = jwt.sign(
//                     { user_id: dbUser._id },
//                     process.env.PRIVATE_KEY,
//                     { expiresIn: '10d' }
//                 );

//                 console.log("Token generated:", token);

//                 // Ensure the correct field is being accessed
//                 const userType = dbUser.user_type;
//                 console.log("User Type from dbUser:", userType);

//                 const token_data = {
//                     token,
//                     id: dbUser._id,
//                     user_type: userType ? userType : 'No User Type Found'
//                 };

//                 // Insert attendance after login
//                 const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

//                 const attendanceRecord = new Attendance({
//                     employeeId: dbUser._id,
//                     date: today,
//                     status: 'present',
//                 });

//                 await attendanceRecord.save();  // Save the attendance record
//                 console.log("Attendance record saved for the user.");

//                 const response = successfunction({
//                     success: true,
//                     statuscode: 200,
//                     data: token_data,
//                     message: "Successfully logged in and attendance recorded."
//                 });
//                 return res.status(response.statuscode).send(response);
//             } else {
//                 // If password doesn't match
//                 const response = errorfunction({
//                     success: false,
//                     statuscode: 400,
//                     message: "Invalid password."
//                 });
//                 return res.status(response.statuscode).send(response);
//             }
//         } else {
//             // If neither admin nor user found
//             const response = errorfunction({
//                 success: false,
//                 statuscode: 404,
//                 message: "User not found."
//             });
//             return res.status(response.statuscode).send(response);
//         }
//     } catch (error) {
//         console.error("Error during login:", error);

//         const response = errorfunction({
//             success: false,
//             statuscode: 500,
//             message: `An error occurred during login. Details: ${error.message}`
//         });
//         return res.status(response.statuscode).send(response);
//     }
// };




// exports.login = async function (req, res) {
//     try {
//         const { email, password } = req.body;
//         console.log("Received email:", email);
//         console.log("Received password:", password);

//         // Check if the email exists in the admin collection
//         let adminUser = await admin.findOne({ email }).populate('user_type');
//         console.log("Admin User before population:", adminUser);

//         // If not found in admin, check the user collection
//         let regularUser = null;
//         if (!adminUser) {
//             regularUser = await users.findOne({ email }).populate('user_type');
//             console.log("Regular User before population:", regularUser);
//         }

//         let dbUser = adminUser || regularUser;  // Determine if the user is admin or regular
//         console.log("Final DB User after population:", dbUser);  // Log the final selected user object

//         // If user (either admin or regular) is found
//         if (dbUser) {
//             const passwordMatch = bcrypt.compareSync(password, dbUser.password);
//             console.log("Password match:", passwordMatch);

//             if (passwordMatch) {
//                 const token = jwt.sign(
//                     { user_id: dbUser._id },
//                     process.env.PRIVATE_KEY,
//                     { expiresIn: '10d' }
//                 );

//                 console.log("Token generated:", token);

//                 const userType = dbUser.user_type;
//                 console.log("User Type from dbUser:", userType);

//                 const token_data = {
//                     token,
//                     id: dbUser._id,
//                     user_type: userType ? userType : 'No User Type Found'
//                 };

//                 // Check if attendance has already been recorded for today
//                 const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

//                 // const existingAttendance = await Attendance.findOne({
//                 //     employeeId: dbUser._id,
//                 //     date: today,
//                 // });

//                 // if (!existingAttendance) {
//                 //     // If no attendance exists for today, create a new record
//                 //     const attendanceRecord = new Attendance({
//                 //         employeeId: dbUser._id,
//                 //         date: today,
//                 //         status: 'present',
//                 //     });

//                 //     await attendanceRecord.save();  // Save the attendance record
//                 //     console.log("Attendance record saved for the user.");
//                 // } else {
//                 //     console.log("Attendance already recorded for today.");
//                 // }

//                 const response = successfunction({
//                     success: true,
//                     statuscode: 200,
//                     data: token_data,
//                     message: "Successfully logged in and attendance recorded."
//                 });
//                 return res.status(response.statuscode).send(response);
//             } else {
//                 // If password doesn't match
//                 const response = errorfunction({
//                     success: false,
//                     statuscode: 400,
//                     message: "Invalid password."
//                 });
//                 return res.status(response.statuscode).send(response);
//             }
//         } else {
//             // If neither admin nor user found
//             const response = errorfunction({
//                 success: false,
//                 statuscode: 404,
//                 message: "User not found."
//             });
//             return res.status(response.statuscode).send(response);
//         }
//     } catch (error) {
//         console.error("Error during login:", error);

//         const response = errorfunction({
//             success: false,
//             statuscode: 500,
//             message: `An error occurred during login. Details: ${error.message}`
//         });
//         return res.status(response.statuscode).send(response);
//     }
// };
exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log("Received email:", email);
        console.log("Received password:", password);

        // Check if the email exists in the admin collection
        let adminUser = await admin.findOne({ email }).populate('user_type');
        console.log("Admin User before population:", adminUser);

        // If not found in admin, check the user collection
        let regularUser = null;
        if (!adminUser) {
            regularUser = await users.findOne({ email }).populate('user_type');
            console.log("Regular User before population:", regularUser);
        }

        let dbUser = adminUser || regularUser;  // Determine if the user is admin or regular
        console.log("Final DB User after population:", dbUser);  // Log the final selected user object

        // If user (either admin or regular) is found
        if (dbUser) {
            // Use async bcrypt.compare for password comparison
            const passwordMatch = await bcrypt.compare(password, dbUser.password);
            console.log("Password match:", passwordMatch);

            if (passwordMatch) {
                const token = jwt.sign(
                    { user_id: dbUser._id },
                    process.env.PRIVATE_KEY,
                    { expiresIn: '10d' }
                );

                console.log("Token generated:", token);

                const userType = dbUser.user_type;
                console.log("User Type from dbUser:", userType);

                const token_data = {
                    token,
                    id: dbUser._id,
                    user_type: userType ? userType : 'No User Type Found'
                };

                // Check if attendance has already been recorded for today
                const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

                // Uncomment the following if attendance functionality is needed
                /*
                const existingAttendance = await Attendance.findOne({
                    employeeId: dbUser._id,
                    date: today,
                });

                if (!existingAttendance) {
                    // If no attendance exists for today, create a new record
                    const attendanceRecord = new Attendance({
                        employeeId: dbUser._id,
                        date: today,
                        status: 'present',
                    });

                    await attendanceRecord.save();  // Save the attendance record
                    console.log("Attendance record saved for the user.");
                } else {
                    console.log("Attendance already recorded for today.");
                }
                */

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
        console.error("Error during login:", error);

        const response = errorfunction({
            success: false,
            statuscode: 500,
            message: `An error occurred during login. Details: ${error.message}`
        });
        return res.status(response.statuscode).send(response);
    }
};
