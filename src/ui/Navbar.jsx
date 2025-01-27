import { alpha, Button, Grid2 as Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import theme from '../theme'
import { NavLink, Link as RouterLink } from 'react-router-dom'
import { useLogout } from '../features/auth/useLogout';
import Swal from 'sweetalert2';
import { useState } from 'react';

function Navbar() {
    const { logout } = useLogout();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

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
    return (
        <Grid container flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            size={12} paddingX={4} spacing={{ md: 8, lg: 12 }} bgcolor={alpha(theme.palette.secondary.main, 0.85)} >
            <Grid container alignItems={'end'}>
                <Typography variant="h5" component={RouterLink} padding={2} to={'/'} sx={{
                    textDecoration: 'none',
                    color: 'primary.main'
                }}>
                    القاعة الملكية
                </Typography>
                <Grid container spacing={1} display={{ xs: 'none', md: 'flex' }}>
                    <Typography component={NavLink} to={'/admin'} padding={2} sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        transition: '0.3s'
                    }}>
                        الرئيسية
                    </Typography>
                    <Typography component={NavLink} to={'/monthly-report'} padding={2} sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        transition: '0.3s'
                    }}>
                        تقرير شهري
                    </Typography>
                </Grid>
            </Grid>
            <Button variant="outlined" onClick={handleLogout} sx={{ display: { xs: 'none', md: 'flex' } }}>
                تسجيل الخروج
            </Button>

            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ display: { xs: 'block', md: 'none' }, padding: 0 }}
            >
                <MenuIcon fontSize={'large'} color="primary" />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={NavLink} to={'/admin'} sx={{ padding: 2 }}>
                    الرئيسية
                </MenuItem>
                <MenuItem component={NavLink} to={'/monthly-report'} sx={{ padding: 2 }}>
                    تقرير شهري
                </MenuItem>
                <MenuItem sx={{ padding: 2 }} onClick={() => {
                    handleClose()
                    handleLogout()
                }}>
                    تسجيل الخروج
                </MenuItem>
            </Menu>
        </Grid>
    )
}

export default Navbar