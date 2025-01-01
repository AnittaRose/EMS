const Employe = require ('../db/Models/Employe')
const Admin = require('../db/Models/Admin');
const Attendance= require('../db/Models/Attendance')
const { successfunction, errorfunction } = require('../util/responsehandler')
const bcrypt = require ('bcrypt')
const user = require('../db/Models/user_type')
const Leave = require('../db/Models/Leave')
const jwt = require('jsonwebtoken');
const sendemail =require("../util/send-emails").sendEmail;
const resetpassword=require('../util/emailtemplates/set-password').resetPassword
const resetpasswords= require('../util/emailtemplates/resetpassword').resetPassword
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Salary= require('../db/Models/salary');
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

exports.EmployeList = async function (req,res){
    try {
        let sections = await Employe.find();
        console.log('sections',sections)
        // let strsection = JSON.stringify(sections);
 
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "EmployeList View Successfully",
            data:sections
            
        })
        res.status(response.statuscode).send(response)
        return;
    } catch (error) {
        
    }
}
exports.SingleEmploye = async function(req,res){

    try {
     let single_id = req.params.id;
     console.log('id from single',single_id);
 
     let one_data = await Employe.findOne({_id: single_id}).populate('user_type')
     console.log('one_data',one_data);
 
     let response = successfunction({
         success: true,
         statuscode: 200,
         message: "single view success",
         data:one_data
         
     })
     res.status(response.statuscode).send(response)
     return;
 
    } catch (error) {
     console.log("error",error);
 
     let response = errorfunction({
         success: false,
         statuscode: 400,
         message: "error"
         
     })
     res.status(response.statuscode).send(response)
     return;
 
    }   
 };
exports.singleLeaveView= async function(req,res){
    try {
        let single_id = req.params.id;
        console.log('id from single',single_id);
    
        let one_data = await Leave.findOne()
        console.log('one_data',one_data);
    
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "single view success",
            data:one_data
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       } catch (error) {
        console.log("error",error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       }   
}
exports.DeleteEmploye = async function(req,res){
    try {
        let delete_id =req.params.id;
        console.log('delete_id',delete_id);

        let delete_onedata = await Employe.deleteOne({_id : delete_id});
        res.status(200).send(delete_onedata)
    } catch (error) {
        console.log('error',error)
    }
}
// exports.EditEmploye = async function(req,res){
//     try {
//         let body = req.body;
//         console.log('body',body);

        
//         let data= {
//             username : body.username,
//             email : body.email,
//             password : body.password,
//             usertype : body.user_type
//         }


//         let id = req.params.id;

//         let updatedata = await employe.updateOne({ _id : id }, { $set: data });
//         console.log('updatedata',updatedata);

//         let strupdatedata = JSON.stringify(updatedata);
//         console.log('strupdatedata',strupdatedata)

//         let response = successfunction({
//             success: true,
//             statuscode: 200,
//             message: " updated Successfully",
//             data:updatedata
            
//         })
//         res.status(response.statuscode).send(response)
//         return;



//     } catch (error) {

//         console.log("error : ", error);
//         let response = errorfunction({
//             success: false,
//             statuscode: 400,
//             message: "error"
            
//         })
//         res.status(response.statuscode).send(response)
//         return;
//     }
// };

exports.EditEmploye = async function(req,res){
  try {
      let body = req.body;
      console.log('body',body);

      
      let data= {
          name : body.name,
          email : body.email,
          password : body.password,
          usertype : body.user_type,
          department:body.department,
          joinDate:body.joinDate,
          salary:body.salary,
          role:body.role
      }


      let id = req.params.id;

      let updatedata = await employe.updateOne({ _id : id }, { $set: data });
      console.log('updatedata',updatedata);

      let strupdatedata = JSON.stringify(updatedata);
      console.log('strupdatedata',strupdatedata)

      let response = successfunction({
          success: true,
          statuscode: 200,
          message: " updated Successfully",
          data:updatedata
          
      })
      res.status(response.statuscode).send(response)
      return;



  } catch (error) {

      console.log("error : ", error);
      let response = errorfunction({
          success: false,
          statuscode: 400,
          message: "error"
          
      })
      res.status(response.statuscode).send(response)
      return;
  }
};




exports.Leaves = async function (req,res){
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:3000/api/leaves", formData)
          .then((response) => {
            console.log("Leave Submitted:", response.data);
            alert("Leave submitted successfully!");
          })
          .catch((error) => {
            console.error("Error submitting leave:", error);
            alert("Error submitting leave. Please try again.");
          });
      };
      
}
exports.count = async function (req,res) {
    try {
        const count = await Employe.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error('Error fetching employee count:', error);
        res.status(500).json({ success: false, message: 'Error fetching employee count' });
    }
};
exports.counts = async function (req,res) {
  try {
      const count = await Leave.countDocuments();
      res.status(200).json({ success: true, count });
  } catch (error) {
      console.error('Error fetching Leave count:', error);
      res.status(500).json({ success: false, message: 'Error fetching Leave count' });
  }
};
// exports.addEmployee = async function (req, res) {
//     try {
//         let body = req.body;
//         console.log('body:', body);
  
//         let { employeeName, email, department, role, salary, joinDate, password, user_type: userTypeInput} = body;

//         // Convert joinDate to timestamp (Unix timestamp in milliseconds)
//         let joinDateTimestamp = new Date(joinDate).getTime();
//         console.log("joinDate as timestamp:", joinDateTimestamp);

//         // Validate and normalize user type
//         if (!userTypeInput) {
//             return res.status(400).send({
//                 success: false,
//                 message: "User type is required."
//             });
//         }

//         let normalizedUserTypeInput = userTypeInput.trim(); // Normalize the input (optional)
//         console.log("Normalized user type input:", normalizedUserTypeInput);

//         // Find the user type from the database
//         let userType = await user.findOne({ user_type: normalizedUserTypeInput });
//         console.log("User type found:", userType);

//         if (!userType) {
//             return res.status(400).send({
//                 success: false,
//                 message: `User type '${normalizedUserTypeInput}' not found. Please ensure it exists in the database.`
//             });
//         }

//         let userTypeId = userType._id;
//         console.log("User type ID:", userTypeId);

//         // Check if the email already exists
//         let count = await Employe.countDocuments({ email });
//         console.log("Existing employee count:", count);
  
//         if (count > 0) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Employee with this email already exists."
//             });
//         }

//         // // Hash the password
//         // let salt = bcrypt.genSaltSync(10);
//         // let hashedPassword = bcrypt.hashSync(password, salt);
//         // console.log("Hashed password:", hashedPassword);
  
//         // Prepare employee data
//         let userData = {
//             employeeName,
//             email,
//             user_type: userTypeId, // Reference to the UserType model
//             password,
//             department,
//             role,
//             salary,
//             joinDate: joinDateTimestamp,  // Store joinDate as a Unix timestamp
//         };
  
//         // Create the new employee record
//         let newEmployee = await Employe.create(userData);
//         console.log("New employee created:", newEmployee);
  
//         return res.status(200).send({
//             success: true,
//             statusCode: 200,
//             message: "Employee added successfully.",
//             data: newEmployee
//         });
  
//     } catch (error) {
//         console.log("Error:", error);
//         return res.status(400).send({
//             success: false,
//             statusCode: 400,
//             message: "An error occurred.",
//         });
//     }
// };
exports.admincount = async function (req,res) {
    try {
        const count = await Admin.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error('Error fetching Admin count:', error);
        res.status(500).json({ success: false, message: 'Error fetching Admin count' });
    }
}
exports.employesingle = async function(req,res){
        try {
         let single_id = req.params.id;
         console.log('id from single',single_id);
     
         let one_data = await Employe.findOne({_id: single_id}).populate('user_type')
         console.log('one_data',one_data);
     
         let response = successfunction({
             success: true,
             statuscode: 200,
             message: "single view success",
             data:one_data
             
         })
         res.status(response.statuscode).send(response)
         return;
     
        } catch (error) {
         console.log("error",error);
     
         let response = errorfunction({
             success: false,
             statuscode: 400,
             message: "error"
             
         })
         res.status(response.statuscode).send(response)
         return;
     
        }   
};
exports.addleave = async function (req, res) {
    try {
        // Extract body and employeeId
        const body = req.body;
        const { employeeId } = req.params; // Explicitly access employeeId from params

        // Log input for debugging
        console.log('Request Body:', body);
        console.log('Employee ID:', employeeId);

        // Destructure required fields from body
        const { leaveType, startDate, endDate, reason,Days } = body;

        // Validate input
        if (!leaveType || !startDate || !endDate || !reason || !Days) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                message: "Missing required fields.",
            });
        }

        // Prepare leave data
        const leaveData = {
          employeeId,
            leaveType,
            startDate,
            endDate,
            reason,
            Days
        };
        

        // Create new leave record
        const newLeave = await Leave.create(leaveData);
        console.log("New leave record created:", newLeave);

        // Success response
        return res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Leave added successfully.",
            data: newLeave,
        });

    } catch (error) {
        // Log error details
        console.error("Error adding leave:", error.message || error);

        // Error response
        return res.status(500).send({
            success: false,
            statusCode: 500,
            message: "An internal server error occurred.",
        });
    }
};
exports.getleavesinAdmin = async function (req,res){
    try {
        let sections = await Leave.find();
        console.log('sections',sections)
        // let strsection = JSON.stringify(sections);
 
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "Employe Leave List View Successfully",
            data:sections
            
        })
        res.status(response.statuscode).send(response)
        return;
    } catch (error) {
        
    }
}
exports.forgetPassword = async function (req, res) {
  try {
    // Check if the email exists in the request body
    const email = req.body.email;

    // Log the incoming request body for debugging
    console.log("Request Body:", req.body);

    // Check if email is provided
    if (!email) {
      const response = errorfunction({
        status: 422,
        message: "Email is required",
      });
      return res.status(response.statuscode).send(response);
    }

    // Find the user by email
    const user = await employe.findOne({ email });
    if (!user) {
      const response = errorfunction({
        status: 403,
        message: "No employee found with this email",
      });
      return res.status(response.statuscode).send(response);
    }

    // Log the user object for debugging
    console.log("Employee found:", user);

    // Generate reset token
    const reset_token = jwt.sign(
      { user_id: user._id },
      process.env.PRIVATE_KEY,
      { expiresIn: "10m" }
    );

    // Log the generated token for debugging
    console.log("Generated Token:", reset_token);

    // Update user with reset token
    const updateResult = await employe.updateOne(
      { email },
      { $set: { password_token: reset_token } }
    );

    // Log the update query and result
    console.log("Update Query:", { email });
    console.log("Update Payload:", { password_token: reset_token });
    console.log("Update Result:", updateResult);

    // Check if the user was updated successfully
    if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 1) {
      // Generate reset link
      const reset_link = `${process.env.FRONTEND_URL}?token=${reset_token}`;

      // Generate email template
      const email_template = await resetpasswords(user.first_name, reset_link);

      // Send reset password email
      sendemail(email, "Forgot password", email_template);

      // Success response
      const response = successfunction({
        status: 200,
        message: "Password reset email sent successfully",
      });
      return res.status(response.statuscode).send(response);
    } else {
      // If no matching user or no change made, return failure response
      console.log("Update failed. No matching record or no change made.");
      const response = errorfunction({
        status: 400,
        message: "Failed to update password reset token",
      });
      return res.status(response.statuscode).send(response);
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error in forgetPassword:", error);

    // Return server error response
    const response = errorfunction({
      status: 500,
      message: "Internal Server Error",
    });
    return res.status(response.statuscode).send(response);
  }
};
const { ObjectId } = mongoose.Types;
exports.leavestatus = async function(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Make sure you use ObjectId correctly when querying the database
        const updatedLeave = await Leave.findByIdAndUpdate(
            new ObjectId(id),  // Correct usage of ObjectId
            { status },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ error: "Leave not found" });
        }

        res.json({ data: updatedLeave });
    } catch (error) {
        console.error("Error updating leave status:", error);
        res.status(500).json({ error: "Failed to update leave status" });
    }
};
exports.salaryy = async function (req, res) {
  const { employeeId, amount, month, year, status } = req.body;

  // Log incoming data to verify
  console.log('Received data:', req.body);

  // Check if required fields are provided
  if (!employeeId || !amount || !month || !year || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check for valid status
  const validStatuses = ['Salary Credit', 'Salary not credited'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

const employeeIds = req.body.employeeId;

  console.log(employeeIds)

  // Find the employee
  const employee = await employe.findById(req.body.employeeId);
  console.log(employee)
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  // Create and save the salary data
  const newSalary = new Salary({ 
    employeeId, 
    amount, 
    month, 
    year, 
    status // Include status here
  });

  try {
    await newSalary.save();
    res.status(201).json({ message: 'Salary added successfully', salary: newSalary });

    // Define email subject and message based on the salary status
    let subject, message;

    if (status === 'Salary Credit') {
      subject = 'Salary Credited';
      message = `Dear ${employee.name},\n\nYour salary has been credited.`;
    } else if (status === 'Salary not credited') {
      subject = 'Salary Not Credited';
      message = `Dear ${employee.name},\n\nYour salary has not been credited this month. Please contact HR.`;
    }

    // Send email if there's a subject and message
    if (subject && message) {
      try {
        await sendemail(employee.email, subject, message); // Ensure sendemail works correctly
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  } catch (err) {
    console.error('Error saving salary:', err);
    res.status(500).json({ error: 'Failed to add salary' });
  }
};
exports.salaries = async function (req, res) {
    const { employeeId } = req.params;
  
    try {
      console.log("Received employeeId:", employeeId); // Log incoming ID
      const employeeSalaries = await Salary.find({ employeeId: String(employeeId) });
  
      if (employeeSalaries.length > 0) {
        res.json(employeeSalaries);
      } else {
        res.status(404).json({ message: 'No salary records found for this employee.' });
      }
    } catch (err) {
      console.error("Database query error:", err);
      res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.deletesalary = async function (req, res) {
    const { employeeId, month, year } = req.params;
  
    try {
      // Find and delete the salary record
      const result = await Salary.deleteOne({
        employeeId: employeeId,
        month: month,
        year: parseInt(year),
      });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Salary record deleted successfully.' });
      } else {
        res.status(404).json({ message: 'Salary record not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.allLeaves = async function (req,res) {
    try {
        let sections = await Salary.find();
        console.log('sections',sections)
        // let strsection = JSON.stringify(sections);
 
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "Employe Salary List View Successfully",
            data:sections
            
        })
        res.status(response.statuscode).send(response)
        return;
    } catch (error) {
        console.log(error)
    }
}
exports.Markattendance = async (req, res) => {
  const { employeeId, date } = req.body;

  // If no date is provided in the request, use today's date
  const attendanceDate = date || new Date().toISOString().split('T')[0];  // Format as YYYY-MM-DD

  // Check if attendance for this employee and date already exists
  const existingAttendance = await Attendance.findOne({
    employeeId,
    date: attendanceDate,  // Use the date you want to check
  });

  if (existingAttendance) {
    return res.status(400).json({ success: false, message: 'Attendance already marked for today.' });
  }

  // Create a new attendance record
  const newAttendance = new Attendance({
    employeeId,
    date: attendanceDate,
    status: 'present',  // Or based on the form submission
  });

  try {
    await newAttendance.save();
    res.status(200).json({ success: true, message: 'Attendance marked successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to mark attendance.' });
  }
};
exports.getEmployeeAttendance = async (req, res) => {
    try {
      const { id: employeeId } = req.params;
  
      const attendanceRecords = await Attendance.find({ employeeId }).sort({ date: -1 });
  
      if (!attendanceRecords.length) {
        return res.status(404).json({ error: "No attendance records found for this employee." });
      }
  
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error("Error fetching employee attendance:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
};
exports.allattendancerecords = async (req, res) => {
    try {
      const attendanceRecords = await Attendance.find().sort({ date: -1 });
  
      if (!attendanceRecords.length) {
        return res.status(404).json({ error: "No attendance records found." });
      }
  
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error("Error fetching all attendance records:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
}
exports.getAttendanceByEmployeeId = async (req, res) => {
    try {
        const { employeeId } = req.params; // Get the employeeId from the URL parameters
        console.log("Fetching attendance for employeeId:", employeeId);

        // Fetch attendance for the specific employee from the database
        const attendance = await Attendance.find({ employeeId });

        if (attendance.length === 0) {
            return res.status(404).json({ message: `No attendance records found for employeeId: ${employeeId}` });
        }

        // Send the attendance records in the response
        res.status(200).json({
            success: true,
            message: `Attendance records for employeeId: ${employeeId} fetched successfully.`,
            data: attendance
        });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching attendance records:", error);
        res.status(500).json({
            success: false,
            message: `Error fetching attendance records: ${error.message}`
        });
    }
};
exports.getAllEmployees = async (req, res) => {
  try {
    console.log("Fetching all employees");

    // Fetch all employees from the collection
    const allEmployees = await employe.find();
    console.log("All employees fetched:", allEmployees);

    // Check if any data exists
    if (!allEmployees || allEmployees.length === 0) {
      return res.status(404).send({
        success: false,
        statuscode: 404,
        message: "No employees found",
      });
    }

    // Success response
    res.status(200).send({
      success: true,
      statuscode: 200,
      message: "All employees fetched successfully",
      data: allEmployees,
    });
  } catch (error) {
    console.error("Error while fetching employees:", error);

    // Error response
    res.status(500).send({
      success: false,
      statuscode: 500,
      message: error.message || "Internal server error",
    });
  }
};
exports.updatePassword = async function (req,res){
  try {
      let  _id = req.params.id
      console.log(_id);
  
      let user = await employe.findOne({_id : _id})
      console.log("user :",user);
  
      const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
      console.log("passwordMatch: ", passwordMatch);

      if(passwordMatch){
          let newpassword = req.body.newpassword;

          let salt = bcrypt.genSaltSync(10);
          let hashed_password = await bcrypt.hash(newpassword,salt);

          console.log("hashed_password",hashed_password)


          req.body.password=hashed_password
          console.log("new password",req.body.password)



          let updatePassword = await employe.updateOne({_id},{$set:{password : req.body.password}});
          console.log(updatePassword)

          
          let response = successfunction({
              success: true,
              statuscode: 200,
              data :updatePassword,
              message: "successfully reset...."
          })
          res.status(response.statuscode).send(response)
          return;


      }

  } catch (error) {
      console.log("error : ", error);
      let response = errorfunction({
          success: false,
          statuscode: 400,
          message: "error"
      })
      res.status(response.statuscode).send(response)
      return;
  } 
};
exports.leavecounts = async function (req,res) {
  try {
    const appliedCount = await Leave.countDocuments({ status: "Applied" });
    const pendingCount = await Leave.countDocuments({ status: "Pending" });
    const rejectedCount = await Leave.countDocuments({ status: "Rejected" });
    const approvedCount = await Leave.countDocuments({ status: "Approved" });

    res.json({
      applied: appliedCount,
      pending: pendingCount,
      rejected: rejectedCount,
      approved: approvedCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leave counts" });
  }
};
exports.getAttendanceSummary = async function (req, res) {
  try {
      // Fetch all employees
      const employees = await employe.find();

      // Aggregate attendance count for each employee
      const attendanceSummary = [];

      for (let employee of employees) {
          // Count attendance documents where status is 'present' for the employee
          const presentCount = await Attendance.countDocuments({
              employeeId: employee._id,
              status: 'present',
          });

          attendanceSummary.push({
              employeeId: employee._id,
              name: employee.name,
              presentCount
          });
      }

      // Send the attendance summary to the frontend
      const response = successfunction({
          success: true,
          statuscode: 200,
          data: attendanceSummary,
          message: "Attendance summary fetched successfully."
      });
      return res.status(response.statuscode).send(response);
  } catch (error) {
      const response = errorfunction({
          success: false,
          statuscode: 500,
          message: `Error fetching attendance summary. Details: ${error.message}`
      });
      return res.status(response.statuscode).send(response);
  }
};
exports.totalLeaveApplied = async (req, res) => {
  try {
      // Step 1: Find the userType ID for "Buyer" from the userType collection
      const Leaveappliedtype = await Leave.findOne();
      console.log("sLeaveappliedtype :",Leaveappliedtype)
      
      if (!Leaveappliedtype) {
          return res.status(404).json({ error: 'Buyer type not found' });
      }

      // Step 2: Count the users with the retrieved buyerType ID
      const LeaveappliedCount = await Leave.countDocuments();
      console.log(LeaveappliedCount)
      
      res.json({ totalLeaveApplied: LeaveappliedCount });
  } catch (error) {
      console.error('Error finding total buyers:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the total leave applied' });
  }
};
// exports.leavestatus = async (req, res) => {
//   const { id } = req.params; // Extract the leave ID from the URL
//   const { status } = req.body; // Get the status from the request body

//   try {
//       // Find the leave document by its ID
//       const leave = await Leave.findById(id);
//       if (!leave) {
//           return res.status(404).json({ message: "Leave not found" });
//       }

//       // Send email to the employee
//       try {
//           await sendemail(leave.email, status);
//       } catch (emailError) {
//           console.error("Error sending email:", emailError);
//       }

//       // Update the leave status
//       leave.status = status;
//       await leave.save();

//       res.status(200).json({ message: "Leave updated successfully", leave });
//   } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ message: "An error occurred" });
//   }
// };
// exports.addEmployee = async function (req, res) {
//   try {
//       let body = req.body;
//       console.log('body:', body);

//       let { employeeName, email, department, role, salary, joinDate, password, user_type: userTypeInput, additions = 0, deductions = 0 ,month,year,salaryPaid,status} = body;

//       // Convert joinDate to timestamp (Unix timestamp in milliseconds)
//       let joinDateTimestamp = new Date(joinDate).getTime();
//       console.log("joinDate as timestamp:", joinDateTimestamp);

//       // Validate and normalize user type
//       if (!userTypeInput) {
//           return res.status(400).send({
//               success: false,
//               message: "User type is required."
//           });
//       }

//       let normalizedUserTypeInput = userTypeInput.trim(); // Normalize the input (optional)
//       console.log("Normalized user type input:", normalizedUserTypeInput);

//       // Find the user type from the database
//       let userType = await user.findOne({ user_type: normalizedUserTypeInput });
//       console.log("User type found:", userType);

//       if (!userType) {
//           return res.status(400).send({
//               success: false,
//               message: `User type '${normalizedUserTypeInput}' not found. Please ensure it exists in the database.`
//           });
//       }

//       let userTypeId = userType._id;
//       console.log("User type ID:", userTypeId);

//       // Check if the email already exists
//       let count = await Employe.countDocuments({ email });
//       console.log("Existing employee count:", count);

//       if (count > 0) {
//           return res.status(400).send({
//               success: false,
//               message: "Employee with this email already exists."
//           });
//       }

//       // Calculate total salary
//       let totalSalary = salary + additions - deductions;
//       console.log("Calculated total salary:", totalSalary);

//       // // Hash the password
// //         // let salt = bcrypt.genSaltSync(10);
// //         // let hashedPassword = bcrypt.hashSync(password, salt);
// //         // console.log("Hashed password:", hashedPassword);

//       // Prepare employee data
//       let userData = {
//           employeeName,
//           email,
//           user_type: userTypeId, // Reference to the UserType model
//           password,
//           department,
//           role,
//           salary,
//           additions,
//           deductions,
//           totalSalary, // Set the total salary directly here
//           joinDate: joinDateTimestamp,  // Store joinDate as a Unix timestamp
//           month,
//           salaryPaid,
//           year,
//           status
//       };

//       // Create the new employee record
//       let newEmployee = await Employe.create(userData);
//       console.log("New employee created:", newEmployee);

//       return res.status(200).send({
//           success: true,
//           statusCode: 200,
//           message: "Employee added successfully.",
//           data: newEmployee
//       });

//   } catch (error) {
//       console.log("Error:", error);
//       return res.status(400).send({
//           success: false,
//           statusCode: 400,
//           message: "An error occurred.",
//       });
//   }
// };
exports.updateaddition = async function (req, res) {
  try {
      const employee = await Employe.findById(req.params.id);

      // Call the addAddition method to modify the employee's additions and totalSalary
      employee.addAddition(req.body.amount);

      // Save the employee document after modifications
      await employee.save();

      res.status(200).json({
          success: true,
          message: "Employee addition updated successfully",
          data: employee
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: "An error occurred.",
          error: err.message
      });
  }
};
exports.updatededuction = async function (req, res) {
  try {
    // Fetch the employee by ID
    const employee = await Employe.findById(req.params.id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found"
        });
    }

    // Add deduction to the employee
    employee.addDeduction(req.body.amount);

    // Save the updated employee record
    await employee.save();

    // Return the updated employee details
    res.status(200).json({
        success: true,
        message: "Deduction added successfully",
        employee: employee
    });
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({
          success: false,
          message: "An error occurred",
          error: err.message
      });
  }
}
exports.paysalary = async function (req, res) {
  try {
    const employee = await Employe.findById(req.params.id);

    // Validate if the amounts are valid numbers
    if (isNaN(req.body.additions) || isNaN(req.body.deductions)) {
      return res.status(400).json({ error: "Additions and deductions must be valid numbers" });
    }

    // Ensure additions and deductions are initialized to 0 if not already numbers
    employee.additions = isNaN(employee.additions) ? 0 : employee.additions;
    employee.deductions = isNaN(employee.deductions) ? 0 : employee.deductions;

    // Add the additions and deductions to the employee's salary
    employee.addAddition(req.body.additions);
    employee.addDeduction(req.body.deductions);

    // Recalculate totalSalary and save it to the employee document
    employee.totalSalary = employee.salary + employee.additions - employee.deductions;

    // Save the updated employee data
    await employee.save();

    // Send the updated employee data as response
    res.status(200).json(employee);
  } catch (err) {
    console.error(err); // Log the error to the console for debugging
    res.status(500).send({ error: "An error occurred while processing the salary update", details: err.message });
  }
};
exports.addEmployee = async function (req, res) {
  try {
      let body = req.body;
      console.log('body:', body);

      let { employeeName, email, department, role, salary, joinDate, password, user_type: userTypeInput, additions = 0, deductions = 0 ,month, year, salaryPaid, status} = body;

      // Convert joinDate to timestamp (Unix timestamp in milliseconds)
      let joinDateTimestamp = new Date(joinDate).getTime();
      console.log("joinDate as timestamp:", joinDateTimestamp);

      // Validate and normalize user type
      if (!userTypeInput) {
          return res.status(400).send({
              success: false,
              message: "User type is required."
          });
      }

      let normalizedUserTypeInput = userTypeInput.trim(); // Normalize the input (optional)
      console.log("Normalized user type input:", normalizedUserTypeInput);

      // Find the user type from the database
      let userType = await user.findOne({ user_type: normalizedUserTypeInput });
      console.log("User type found:", userType);

      if (!userType) {
          return res.status(400).send({
              success: false,
              message: `User type '${normalizedUserTypeInput}' not found. Please ensure it exists in the database.`
          });
      }

      let userTypeId = userType._id;
      console.log("User type ID:", userTypeId);

      // Check if the email already exists
      let count = await Employe.countDocuments({ email });
      console.log("Existing employee count:", count);

      if (count > 0) {
          return res.status(400).send({
              success: false,
              message: "Employee with this email already exists."
          });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password with 10 salt rounds
      console.log("Hashed password:", hashedPassword);

      // Calculate total salary
      let totalSalary = salary + additions - deductions;
      console.log("Calculated total salary:", totalSalary);

      // Prepare employee data
      let userData = {
          employeeName,
          email,
          user_type: userTypeId, // Reference to the UserType model
          password: hashedPassword, // Store the hashed password
          department,
          role,
          salary,
          additions,
          deductions,
          totalSalary, // Set the total salary directly here
          joinDate: joinDateTimestamp,  // Store joinDate as a Unix timestamp
          month,
          salaryPaid,
          year,
          status
      };

      // Create the new employee record
      let newEmployee = await Employe.create(userData);
      console.log("New employee created:", newEmployee);

      return res.status(200).send({
          success: true,
          statusCode: 200,
          message: "Employee added successfully.",
          data: newEmployee
      });

  } catch (error) {
      console.log("Error:", error);
      return res.status(400).send({
          success: false,
          statusCode: 400,
          message: "An error occurred.",
      });
  }
};












exports.processSalary = async  function (req, res) {
  const { employeeId, additions, deductions } = req.body;

    const employee = await Employe.findById(employeeId);

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Calculate the total salary
    const totalSalary = employee.salary + parseFloat(additions) - parseFloat(deductions);
    
    // Update employee's total salary (this could be updated as the current month's salary)
    employee.totalSalary = totalSalary;

    // Create a salary record for the current month and year
    const currentMonth = new Date().getMonth() + 1; // Month as a number (1-12)
    const currentYear = new Date().getFullYear(); // Current year

    // Add this month’s salary to the salaryHistory
    employee.salaryHistory.push({
        month: currentMonth.toString(),
        year: currentYear.toString(),
        salaryPaid: totalSalary,
        status: 'Paid',
    });

    // Save the employee data with the new salary history
    await employee.save();

    // Send email to the employee after salary is processed
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password', // Replace with your email password
        },
    });
    res.status(200).json({ totalSalary: totalSalary });
};






