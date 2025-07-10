import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '../redux/userSlice';
import { LoginCard } from '../components/LoginCard';
import '/src/styles.scss'


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

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
        <div className='fullscreen'> 
            <LoginCard error={error} setUsername={setUsername} username={username} handleLogin={handleLogin}></LoginCard>
        </div>
    );
};

export default LoginPage;