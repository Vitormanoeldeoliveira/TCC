import React from 'react';
import jwt_decode from 'jwt-decode';

export const autoDecodeToken = () => {
  const token = localStorage.getItem('token');
  
  if(token) {
    const decodedToken = jwt_decode(token);
    return decodedToken
  }
}