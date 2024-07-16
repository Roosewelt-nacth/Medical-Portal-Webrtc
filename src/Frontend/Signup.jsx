import React, { useState } from 'react';
import { normalUserAdd, doctorUserAdd } from '../Backend/api';
import { Navigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [normalUserVisibility, setNormalUserVisibility] = useState(true);
  const [doctorUserVisibility, setDoctorUserVisibility] = useState(false);
  const [description, setDescription] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const doctorUserView = (e) => {
    e.preventDefault();
    setDoctorUserVisibility(true);
    setNormalUserVisibility(false);
  }

  const normalUserView = (e) => {
    e.preventDefault();
    setDoctorUserVisibility(false);
    setNormalUserVisibility(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await normalUserAdd(
        username,
        password,
        email,
        phone,
        gender
      );
      if (response.status === 200) {
        setSuccess('Registration Successful');
        setError('');
        setUsername('');
        setPassword('');
        setRePassword('');
        setEmail('');
        setPhone('');
        setGender('');
        setDescription('');
        setDoctorName('');
        
      } else {
        setError('Registration failed: Unexpected response');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response ? error.response.data.error : 'Registration failed');
      setSuccess('');
    }
  };
  
  const handleSubmitDoctor = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await doctorUserAdd(
        username,
        password,
        doctorName,
        description,
        email,
        phone,
        gender
      );
      if (response.status === 200) {
        setSuccess('Registration Successful');
        setError('');
        setUsername('');
        setPassword('');
        setRePassword('');
        setEmail('');
        setPhone('');
        setGender('');
        setDescription('');
        setDoctorName('');
        Navigate('/home');
      } else {
        setError('Registration failed: Unexpected response');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response ? error.response.data.error : 'Registration failed');
      setSuccess('');
    }
  };
  

  return (
    <div>
      <h1>Signup</h1>
      <button onClick={normalUserView}>Normal User</button>
      <button onClick={doctorUserView}>Doctor User</button>
      {normalUserVisibility ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Other
            </label>
          </div>
          <button type="submit">Register</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}  
        </form>
      ) : (
        <form onSubmit={handleSubmitDoctor}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Other
            </label>
          </div>
          <button type="submit">Register</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      )}
    </div>
  );
}

export default Signup;
