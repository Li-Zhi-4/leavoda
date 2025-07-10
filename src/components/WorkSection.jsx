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
            <Typography>Company: {company?.name}</Typography>
            <Typography>Department: {company?.department}</Typography>
            <Typography>Title: {company?.title}</Typography>
        </Box>
    )
}