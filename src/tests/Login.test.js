import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import Login from '../Pages/Login.jsx';
import { apiCountries } from '../MockApi/mock.jsx';
import renderWithRouter from './renderWithRouter.js';

async function mockFetch(url) {
  if(url.includes('countries')) {
    return {
      ok: true,
      status: 200,
      json: async () => apiCountries,
    };
  }
  throw new Error(`Unhandled request: ${url}`);        
}

describe('Testa o componente <Login.js />', () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submete o formulário corretamente', async () => {
    const { user } = renderWithRouter(<Login />);
        
    const inputApiKey = screen.getByTestId('login_input');
    const submitButton = screen.getByTestId('login_btn');
    
    user.type(inputApiKey, process.env.REACT_APP_API_KEY )

    await waitFor(() => {
      expect(inputApiKey).toHaveValue(process.env.REACT_APP_API_KEY)
    });
  
    user.click(submitButton);
    
    await waitFor(() => {
      expect(window.location.pathname).toBe("/countries");
    });
  });
});
