import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Avatar,
    Grid,
    Paper,
    CircularProgress,
    Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
    const user = useSelector((state) => state.user.currentUser);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login');
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/users/${user.id}`);
                setUserDetails(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user details', err);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [isAuthenticated, user, navigate]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={8}>
                <CircularProgress />
            </Box>
        );
    }

    if (!userDetails) {
        return (
            <Typography variant="h6" align="center" mt={4}>
                Unable to load user details.
            </Typography>
        );
    }

    const {
        firstName,
        lastName,
        age,
        gender,
        image,
        address,
        company,
        phone,
        email,
    } = userDetails;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={4} gap={2}>
                    <Avatar src={image} alt={firstName} sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="h5">
                            {firstName} {lastName}
                        </Typography>
                        <Typography color="text.secondary">
                            {gender}, {age} years old
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Address</Typography>
                        <Typography>
                            {address?.address}, {address?.city}, {address?.state}, {address?.postalCode}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Work</Typography>
                        <Typography>Company: {company?.name}</Typography>
                        <Typography>Department: {company?.department}</Typography>
                        <Typography>Title: {company?.title}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6">Contact Info</Typography>
                        <Typography>Name: {firstName} {lastName}</Typography>
                        <Typography>Phone: {phone}</Typography>
                        <Typography>Email: {email}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default DashboardPage;
