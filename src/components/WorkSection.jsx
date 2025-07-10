import {
    Container,
    Typography,
    Avatar,
    Grid,
    Paper,
    CircularProgress,
    Box,
} from '@mui/material';

export function WorkSection({ company }) {

    return (
        <Box item xs={12}>
            <h2 className='sectionTitle'>Work</h2>
            <Typography>{company?.name}</Typography>
            <Typography>{company?.department} | {company?.title}</Typography>
        </Box>
    )
}