const employe = require ('../db/Models/Employe')
const Admin = require('../db/Models/Admin');
const { successfunction, errorfunction } = require('../util/responsehandler')
const bcrypt = require ('bcrypt')
const user = require('../db/Models/user_type')
const jwt = require('jsonwebtoken')

exports.EmployeList = async function (req,res){
    try {
        let sections = await employe.find({user_type : {$ne:'67029a691240a5ff40dd0dfe'}});
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
 
     let one_data = await employe.findOne({_id: single_id}).populate('user_type')
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
exports.DeleteEmploye = async function(req,res){
    try {
        let delete_id =req.params.id;
        console.log('delete_id',delete_id);

        let delete_onedata = await employe.deleteOne({_id : delete_id});
        res.status(200).send(delete_onedata)
    } catch (error) {
        console.log('error',error)
    }
}
exports.EditEmploye = async function(req,res){
    try {
        let body = req.body;
        console.log('body',body);

        
        let data= {
            username : body.username,
            email : body.email,
            password : body.password,
            usertype : body.user_type
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
        const count = await employe.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error('Error fetching employee count:', error);
        res.status(500).json({ success: false, message: 'Error fetching employee count' });
    }
}
exports.addEmployee = async function (req,res) {
    try {
        let body = req.body;
        console.log('body', body);
  
        let name = body.name;
        let emails = body.email;
        let department = body.department;
        let role = body.role;
        let salary = body.salary;
        let joinDate = body.joinDate;
       let passwords = body.password;
  
        // Find the user type
        let user_type = await user.findOne({ user_type: body.user_type });
        console.log("user type", user_type);
  
        if (!user_type) {
            return res.status(400).send({
                success: false,
                message: "User type not found."
            });
        }
  
        let id = user_type._id;
        console.log(id);
        body.user_type = id;
  
        // Handle image upload
        // if (image) {
        //     let image_path = await fileUpload(image, "users");
        //     console.log("image_path", image_path);
        //     body.image = image_path;
        // }
  
        // Generate a random password
        function generateRandomPassword(length) {
            let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
            let password = "";
            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * charset.length);
                password += charset.charAt(randomIndex);
            }
            return password;
        }
  
        var randomPassword = generateRandomPassword(12);
        console.log(randomPassword);
  
        // Check if the user already exists
        let count = await employe.countDocuments({ email: emails });
        console.log("count : ", count);
  
        if (count > 0) {
            let response = errorfunction({
                statusCode: 400,
                message: "User already exists",
            });
  
            res.status(response.statuscode).send(response);
            return;
        }
  
        // Send the reset password email
        // let content = await resetpassword(name, emails, randomPassword);
        // await send(emails, "update password", content);
  
        // Hash the password
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(randomPassword, salt);
        console.log("password : ", password);
  
        // Prepare user data
        let randomData = {
            name: body.name,
            email: body.email,
            user_types: user_type,
            password: password,
            department:body.department,
            role:body.role,
            salary:body.salary,
            joinDate:body.joinDate
        };
  
        // Create the new user
        let view = await employe.create(randomData);
        console.log('view', view);
  
        let response = successfunction({
            success: true,
            statusCode: 200,
            message: "Employe Added Successfully",
            data: view
        });
        res.status(response.statuscode).send(response);
        return;
  
    } catch (error) {
        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statusCode: 400,
            message: "An error occurred"
        });
        res.status(response.statuscode).send(response);
        return;
    }
}
exports.admincount = async function (req,res) {
    try {
        const count = await Admin.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error('Error fetching Admin count:', error);
        res.status(500).json({ success: false, message: 'Error fetching Admin count' });
    }
}


