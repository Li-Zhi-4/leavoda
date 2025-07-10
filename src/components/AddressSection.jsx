import {
    Container,
    Typography,
    Avatar,
    Grid,
    Paper,
    CircularProgress,
    Box,
} from '@mui/material';

export function AddressSection({ address }) {

    return (
        <Box item xs={12}>
            <h2 className='sectionTitle'>Address</h2>
            <Typography>
                {address?.address}, {address?.city}<br />
                {address?.state}, {address?.postalCode}
            </Typography>
        </Box>
    )
}