import jwt_decode from 'jwt-decode';
import axios from 'axios';
//takes existing token from localstorage
//returns existing token or false




const timeLeft = (token) => 
{
  const currentTime = Math.floor(Date.now() / 1000); 
  const timeLeft = token.exp - currentTime; 

  if (timeLeft <= 0) 
    return false;
  else
    return true;

}

function getExistingToken() 
{
    const token = localStorage.getItem('token');

    if (!token)
        return false;
      
    if (!timeLeft(token))
      return false;
      
    return jwt_decode(token);
}

async function getNewToken(user) 
{
      await axios.post('/token', user)
      .then(response => 
        {
          const token = response.data.token;
          localStorage.setItem('token', token);
          return token;
        })
      .catch(err => 
        {
          console.log(err);
          return false;
        })
}



export {getExistingToken, getNewToken};