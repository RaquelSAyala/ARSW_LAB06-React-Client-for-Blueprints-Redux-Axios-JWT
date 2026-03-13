import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../../services/apiClient'

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.login(credentials)
        localStorage.setItem('token', data.access_token)
        return data
    } catch (err) {
        return rejectWithValue(err.response?.data || 'Login failed')
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            state.token = null
            state.status = 'idle'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.access_token
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
