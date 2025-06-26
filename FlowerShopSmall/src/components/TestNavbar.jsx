import React from 'react';

const TestNavbar = () => {
  console.log('🧪 TEST NAVBAR IS RENDERING!');
  <div>style={{ marginTop: '10px', fontSize: '18px' }}</div>
  
  return (
    <div
      style={{
        backgroundColor: '#FFAAAA', // Bright red
        color: 'white',
        padding: '30px',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        width: '100%',
        border: '5px pink',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
      }}
    >
      🚨 TEST NAVBAR - IF YOU SEE THIS, REACT IS WORKING! 🚨
      <br />
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        <a href="/" style={{ color: 'white', marginRight: '20px' }}>HOME</a>
        <a href="/admin/login" style={{ color: 'white', marginRight: '20px' }}>ADMIN LOGIN</a>
        <a href="/register" style={{ color: 'white' }}>REGISTER</a>
      </div>
    </div>
  ); 
};

export default TestNavbar;
