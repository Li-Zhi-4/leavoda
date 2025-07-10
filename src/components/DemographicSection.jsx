import {
    Container,
    Typography,
    Avatar,
    Grid,
    Paper,
    CircularProgress,
    Box,
} from '@mui/material';

export function DemographicSection({ age, gender }) {

    return (
        <Box item xs={12}>
            <h2 className='sectionTitle'>Demographic Info</h2>
            <Typography>{age} years old</Typography>
            <Typography>{gender}</Typography>
        </Box>
    )
}