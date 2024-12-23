import { Navigate } from "react-router-dom"
import { useAdmin } from "../features/auth/useAdmin"
import { alpha, Button, Grid2 as Grid, Typography } from "@mui/material"
import theme from "../theme"
import Swal from "sweetalert2"
import { useLogout } from "../features/auth/useLogout"

function Admin() {
    const { isAuthenticated } = useAdmin()
    const { logout } = useLogout();

    const handleLogout = async () => {
        const confirm = await Swal.fire({
            title: 'تسجيل الخروج',
            text: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
            confirmButtonText: 'نعم',
            confirmButtonColor: '#775236',
            cancelButtonText: 'لا',
            showCancelButton: true,
        })

        if (confirm.isConfirmed)
            logout();
    }

    if (!isAuthenticated)
        return <Navigate replace to='/login' />
    return (
        <Grid container flexDirection={'column'} width={'100dvw'} height={'100dvh'} color={'primary.main'}>
            <Grid container flexDirection={'row'} position={'absolute'}
                justifyContent={'space-between'}
                top={0} size={12} paddingY={2} paddingX={4} spacing={{ md: 8, lg: 12 }} bgcolor={alpha(theme.palette.secondary.main, 0.85)} >
                <Typography variant="h5" >
                    القاعة الملكية
                </Typography>
                <Button variant="contained" onClick={handleLogout}>
                    تسجيل الخروج
                </Button>
            </Grid>
        </Grid>
    )
}

export default Admin