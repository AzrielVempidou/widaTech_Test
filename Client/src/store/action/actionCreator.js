// actions.js
import {
  PRODUCT_FETCH_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  ADD_INVOICE_SUCCESS,
  GET_INVOICES_SUCCESS,
  DELETE_INVOICE_SUCCESS,
  SEARCH_PRODUCTS_SUCCESS,
  FETCH_REVENUE_SUCCESS
} from "./actionType";


// Fetch categories from API

// API functions for user registration, login, invoice management, product search, and revenue fetching
export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error(`Failed to register user: ${response.statusText}`);
      }
      const result = await response.json();
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: result
      });
      return result;
    } catch (error) {
      console.error("Failed to register user:", error);
      throw error;
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error(`Failed to login: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result, "<<result")
      if (!result.access_token) {
        throw new Error('Invalid Token');
      }
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: result
      });
      return result;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
};


export const addInvoice = (invoiceData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
      });
      if (!response.ok) {
        throw new Error(`Failed to add invoice: ${response.statusText}`);
      }
      const result = await response.json();
      dispatch({
        type: ADD_INVOICE_SUCCESS,
        payload: result
      });
      return result;
    } catch (error) {
      console.error("Failed to add invoice:", error);
      throw error;
    }
  };
};

export const getInvoices = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/invoices?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch invoices: ${response.statusText}`);
      }
      const result = await response.json();
      dispatch({
        type: GET_INVOICES_SUCCESS,
        payload: result
      });
      return result;
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      throw error;
    }
  };
};

export const deleteInvoice = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/invoices/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete invoice: ${response.statusText}`);
      }
      dispatch({
        type: DELETE_INVOICE_SUCCESS,
        payload: { id }
      });
      return { id };
    } catch (error) {
      console.error(`Failed to delete invoice ${id}:`, error);
      throw error;
    }
  };
};

export const fetchDataProduct = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const result = await response.json();
      dispatch({
        type: PRODUCT_FETCH_SUCCESS,
        payload: result
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  };
};

export const searchProducts = (query) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/search?q=${query}`);
      if (!response.ok) {
        throw new Error(`Failed to search products: ${response.statusText}`);
      }
      const result = await response.json();
      dispatch({
        type: SEARCH_PRODUCTS_SUCCESS,
        payload: result
      });
      return result;
    } catch (error) {
      console.error(`Failed to search products for "${query}":`, error);
      throw error;
    }
  };
};

export const fetchRevenue = (interval, startDate, endDate) => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Build the URL based on the interval provided
      let url = `http://localhost:3000/revenue?interval=${interval}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'access_token': accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch revenue: ${response.statusText}`);
      }

      const result = await response.json();
      dispatch({
        type: FETCH_REVENUE_SUCCESS,
        payload: result
      });
      return result;
    } catch (error) {
      console.error(`Failed to fetch revenue (${interval}):`, error);
      throw error;
    }
  };
};

