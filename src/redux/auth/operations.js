import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    console.error('❌ Login Error:', error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue('No token found');
  }

  try {
    setAuthHeader(persistedToken);
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    console.error('❌ Registration Error:', error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
