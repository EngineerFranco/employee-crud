import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import summaryAPI from '../api/api';
import toast from 'react-hot-toast';

function Update() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    country: '',
    accountType: '',
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    contactNumber: '',
    photo: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const dataResponse = await fetch(`${summaryAPI.get.url}/${id}`, {
          method: summaryAPI.get.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const dataAPI = await dataResponse.json();
        console.log(dataAPI.data)
        if (dataAPI.error) {
          toast.error(dataAPI.message);
        } else {
          setFormData(dataAPI.data); 
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate(); 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          photo: reader.result, 
        }));
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const dataResponse = await fetch(`${summaryAPI.update.url}/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(formData)
      });
    
      const dataAPI = await dataResponse.json();
      console.log("Data API", dataAPI)
      toast.success(dataAPI.message);
      setMessage(dataAPI.message);
      setTimeout(() => {
        navigate('/employee'); 
    }, 1000);
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
      toast.error(err.message); 
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full max-w-6xl mt-5 mx-auto text-gray-700 gap-2 p-4">
      <h2 className="mr-auto text-lg text-blue-900">Account: <span className="text-amber-800 cursor-pointer">Update Record</span></h2>
      <hr className="border-t border-gray-300 w-full" />

      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}

      <form className="w-full" onSubmit={handleSubmit}>

      <div className="mb-4">
        <label className="block text-gray-700">
          Country: <span className="text-red-500">*</span>
        </label>
        <select 
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value="" disabled>Select your country</option>
          <option value="Philippines">Philippines</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="India">India</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
          <option value="China">China</option>
          <option value="Thailand">Thailand</option>
          <option value="Singapore">Singapore</option>
          <option value="Malaysia">Malaysia</option>
          <option value="South Korea">South Korea</option>
          <option value="Vietnam">Vietnam</option>
        </select>
      </div>

        <div className="mb-4">
        <label className="block text-gray-700">
          Account Type: <span className="text-red-500">*</span>
        </label>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value="" disabled>Select account type</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
         </select>
         </div>

        <div className="mb-4">
          <label className="block text-gray-700">Username: <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name: <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">First Name: <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email Address: <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700">
                Contact Number: <span className="text-red-500">*</span>
            </label>
            <input
                type="tel" 
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                pattern="[0-9]*" 
                minLength={5}
                maxLength={15} 
                className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Photo (Optional):</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default Update;
