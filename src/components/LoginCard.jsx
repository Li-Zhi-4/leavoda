import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';


export function LoginCard({ error, setUsername, username, handleLogin }) { 

    return (
        <Card sx={{ m: '24px', borderRadius: '24px', padding: '8px', maxWidth: '480px' }}>
            <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h4" align="center">
                        Login to your account
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                        Enter your username below to login to your account
                    </Typography>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        size="small"
                        className='input'
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button variant="contained" onClick={handleLogin} fullWidth>
                        Login
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

