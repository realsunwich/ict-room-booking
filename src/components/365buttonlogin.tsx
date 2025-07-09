'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import MicrosoftIcon from '@mui/icons-material/Microsoft';

export default function LoginButton() {
    return (
        <Button
            variant="contained"
            startIcon={<MicrosoftIcon />}
            onClick={() => signIn('azure-ad')}
            sx={{ textTransform: 'none' }}
        >
            Sign in with Microsoft 365
        </Button>
    );
}
