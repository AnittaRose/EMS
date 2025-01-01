

import React, { useState } from 'react';
import axios from 'axios';

const SalaryForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [salary, setSalary] = useState('');
  const [Month, setMonth] = useState('');
  const [Year, setYear] = useState('');
  const [Status, setStatus] = useState(''); // Ensure this is defined
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!employeeId || !salary || !Month || !Year || !Status) {
      setError('Please fill in all fields.');
    } else if (isNaN(salary) || salary <= 0) {
      setError('Please enter a valid salary.');
    } else {
      // Clear any previous error messages
      setError('');
      setSuccessMessage('');

      try {
        // Send the data to the backend
        const response = await axios.post('http://localhost:3000/salaries', {
          employeeId,
          amount: salary, // Ensure amount is sent correctly
          month: Month,
          year: Year,
          status: Status // Send status correctly
        });

        console.log("response",response)

        // Show success message
        setSuccessMessage('Salary added successfully');
        window.alert('Salary added successfully');

        // Clear form after submission
        setEmployeeId('');
        setSalary('');
        setMonth('');
        setYear('');
        setStatus('');
      } catch (err) {
        setError('Failed to add salary');
        console.error(err);
      }
    }
  };

  return (

  <div className='d-flex'>
    <div className=''>
      <div className=''><img src="https://files.oaiusercontent.com/file-C2EMKSNcHitUWZvKWBSvAM?se=2024-12-28T05%3A33%3A27Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Da003980b-b73e-405f-97ce-5a80263709a6.webp&sig=e2bNeiVpLxiqYuSELBERZV5w99A5HpxvN4CanQB4%2BSY%3D" className='salimg' alt="" /></div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className=' boxx px-4'>
      <div className='pt-4'>
        <label className='px-3'>Employee ID:</label>
        <div className='px-3 pt-2'><input type="text" className='in' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required /></div>
      </div>

      <div className=' pt-4'>
        <label className='px-3'>Salary:</label>
        <div className='px-3 pt-2'><input type="number" className='in'  value={salary}  onChange={(e) => setSalary(e.target.value)}  required  /></div>
      </div>

      <div className=' pt-4'>
        <label className='px-3'>Month:</label>
        <div className='px-3 pt-2'><input type="text" className='in' value={Month}  onChange={(e) => setMonth(e.target.value)}  required  /></div>
      </div>

      <div className=' pt-4'>
        <label className='px-3'>Year:</label>
        <div className='px-3 pt-2'><input  type="text" className='in'  value={Year}  onChange={(e) => setYear(e.target.value)}   required  /></div>
      </div>

    <div className=' pt-4'>
      <label className='px-3'>Status:</label>
      <div className='px-3 pt-2'><select value={Status} className='in' onChange={(e) => setStatus(e.target.value)} required>
        <option value="">Select status</option>
        <option value="Salary Credit">Salary Credit</option>
        <option value="Salary not credited">Salary not credited</option>
      </select></div>
    </div>

      <div className='pt-5 px-3'><button type="submit" className='but'>Set Salary</button></div>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
    </form>
  </div>
  );
};

export default SalaryForm;



