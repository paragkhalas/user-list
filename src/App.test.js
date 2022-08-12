import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('APP', () => {

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      REACT_APP_TITLE: 'User List Application',
      REACT_APP_API_BASE: 'https://randomuser.me/api?results=1'
    });
  });

  it('renders application title', () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/User List Application/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('check all table headers', () => {
    const { getByText } = render(<App />);
    const nameHeader = getByText(/Name/i);
    const locationHeader = getByText(/Location/i);
    const registeredHeader = getByText(/Registered/i);
    const phoneHeader = getByText(/Phone/i);
    const pictureHeader = getByText(/Picture/i);
    const actionHeader = getByText(/Actions/i);
    expect(nameHeader).toBeInTheDocument();
    expect(locationHeader).toBeInTheDocument();
    expect(registeredHeader).toBeInTheDocument();
    expect(phoneHeader).toBeInTheDocument();
    expect(pictureHeader).toBeInTheDocument();
    expect(actionHeader).toBeInTheDocument();
  });

})
