import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    Empid: '',
    Empmail: '',
    Firstname: '',
    Lastname: '',
    Role: '',
    Practies: '',
    Reportingmanager: '',
    Password: '',
    Reportinghr: '',
    Location: '',
    Image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      getBase64(file, (base64Image) => {
        setFormData({ ...formData, Image: base64Image });
      });
    }
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error('Error converting file to base64:', error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/RegistrationKPI`, formData);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error registering employee:', error);
      // Handle error response, display a message, etc.
    }
  };

  return (
    <div>
      <h2>Employee Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            name="Empid"
            value={formData.Empid}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="Empmail"
            value={formData.Empmail}
            onChange={handleInputChange}
          />
        </label>

        <label>
          First Name:
          <input
            type="text"
            name="Firstname"
            value={formData.Firstname}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="Lastname"
            value={formData.Lastname}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Role:
          <input
            type="text"
            name="Role"
            value={formData.Role}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Practices:
          <input
            type="text"
            name="Practices"
            value={formData.Practices}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Reporting Manager:
          <input
            type="text"
            name="Reportingmanager"
            value={formData.Reportingmanager}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Reporting HR:
          <input
            type="text"
            name="Reportinghr"
            value={formData.Reportinghr}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Profile Image:
          <input
            type="file"
            name="Image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
