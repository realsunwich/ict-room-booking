import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { Button, Snackbar, Alert, Box } from '@mui/material';

const fetchUserData = async (userEmail: string) => {
    if (!userEmail) {
        console.error('User Email is undefined or null');
        return null;
    }

    try {
        const response = await fetch(`/api/login?userEmail=${userEmail}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log("Data : ", data);
        return data.result || null;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const LoginButtonContent = () => {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error');
    const router = useRouter();

    const isMounted = useRef(false);

    useEffect(() => {
        console.log("useEffect triggered - session:", session);

        if (!isMounted.current && session?.user?.email) {
            isMounted.current = true;
            setIsLoading(true);
            console.log("User : ", session);
            console.log("User Email :", session.user.email);

            fetchUserData(session.user.email).then((data) => {
                setIsLoading(false);

                if (data === null) {
                    console.error("Error: No data returned from fetchUserData");
                    setSnackbarMessage('ไม่พบข้อมูลผู้ใช้');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                    return;
                }

                if (data === 'T') {
                    console.log("Login Success - Redirecting...");
                    setSnackbarMessage('เข้าสู่ระบบสำเร็จ');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 1000);
                } else if (data === 'F') {
                    console.log("Login Failed - User not found or account disabled");
                    setSnackbarMessage('ไม่พบข้อมูลผู้ใช้ หรือบัญชีถูกปิดใช้งาน');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                    handleFailedLogin();
                } else {
                    console.log("Login Failed - Signing out...");
                    setShowAlert(true);
                    handleFailedLogin();
                }
            });
        }
    }, [session, router]);

    const handleLogin = async () => {
        console.log("Attempting to sign in...");
        await signIn('azure-ad');
    };

    const handleFailedLogin = async () => {
        console.log("No user data found, signing out...");
        setSnackbarMessage('ไม่พบข้อมูลผู้ใช้ หรือบัญชีถูกปิดใช้งาน');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        await signOut({ redirect: false });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (status === 'loading' || isLoading) {
        return <Box className="text-gray-500 text-center">Loading...</Box>;
    }

    return (
        <Box>
            {showAlert ? (
                <Box>
                    <Box className="text-red-500 text-center">ไม่พบข้อมูลผู้ใช้</Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            backgroundColor: '#5D42B7',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                color: '#5D42B7'
                            },
                            height: '40px',
                            fontSize: '14px',
                            marginBottom: '16px',
                            width: '100%'
                        }}
                        onClick={handleLogin}
                    >
                        เข้าสู่ระบบด้วย UP Account
                    </Button>
                </Box>
            ) : (!session?.user?.email && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: '#5D42B7',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: '#5D42B7'
                        },
                        height: '40px',
                        fontSize: '14px',
                        marginBottom: '16px',
                        width: '100%'
                    }}
                    onClick={handleLogin}
                >
                    เข้าสู่ระบบด้วย UP Account
                </Button>
            )
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export const LoginButton = () => {
    return (
        <SessionProvider>
            <LoginButtonContent />
        </SessionProvider>
    );
};
