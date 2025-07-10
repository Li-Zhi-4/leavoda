import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '../redux/userSlice';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        if (!username.trim()) {
            setError('Username is required');
            return;
        }

        try {
            const response = await axios.get(
                `https://dummyjson.com/users/filter?key=username&value=${username}`
            );

            const users = response.data.users;
            if (users.length > 0) {
                const user = users[0];
                dispatch(loginSuccess(user));
                navigate('/dashboard');
            } else {
                setError('User not found');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h4" align="center">
                    Login
                </Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button variant="contained" onClick={handleLogin}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;