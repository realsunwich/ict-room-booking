'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginButton() {
    return (
        <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => signIn('google')}
            sx={{ textTransform: 'none' }}
        >
            Sign in with Google
        </Button>
    );
}
