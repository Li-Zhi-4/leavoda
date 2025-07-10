import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Avatar,
    Grid,
    Paper,
    CircularProgress,
    Box,
    Button
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AddressSection } from '../components/AddressSection';
import { WorkSection } from '../components/WorkSection';
import { DemographicSection } from '../components/DemographicSection';
import { Link } from 'react-router-dom';

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
                            {phone} | {email}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap={3}>
                    <AddressSection address={address} />
                    <WorkSection company={company} />
                    <DemographicSection age={age} gender={gender} />
                    <Button
                        variant="contained"
                        component={Link}
                        to="/login"
                    >
                        Logout
                    </Button>
                </Box>

            </Paper>
        </Container>
    );
};

export default DashboardPage;
