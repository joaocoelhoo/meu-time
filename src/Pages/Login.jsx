import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/requests';

const Login = () => {
  const [apiKey, setApiKey] = useState('');
  const [isValidApiKey, setIsValidApiKey] = useState(true);
  const navigate = useNavigate();

  const validateApiKey = async (apiKeyValue) => {
    try {
      setApiKey(apiKeyValue)
      const response = await authenticate(apiKeyValue);
      if (response.errors.token) {
        setIsValidApiKey(false);
      } else {
        setIsValidApiKey(true);
      }
    } catch (error) {
      setIsValidApiKey(false);
      console.log(error);
    }
  };

  const login = (event) => {
    event.preventDefault();

    if (!isValidApiKey) {
      return alert('Por favor, informe uma API Key válida.');
    }
    navigate('/countries');
  };

  return (
    <div>
      {apiKey && !isValidApiKey && <p>API Key inválida. Por favor, insira uma válida.</p>}
      <form id="form">
        <label htmlFor="login-input">
          <input
            type="text"
            value={apiKey}
            data-testid="login_input"
            placeholder="Login"
            onChange={({ target: { value } }) => validateApiKey(value)}
          />
        </label>
        <button
          id="btnSubmit"
          data-testid="login_btn"
          type="submit"
          disabled={!apiKey}
          onClick={(event) => login(event)}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
