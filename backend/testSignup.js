const axios = require('axios');

const testSignup = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/signup', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Signup success:', res.data);
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err.message);
  }
};

testSignup();
