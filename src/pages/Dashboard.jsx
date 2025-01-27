import { alpha, Box, Button, Container, Grid2 as Grid, IconButton, Link, Menu, MenuItem, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'


import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import MenuIcon from '@mui/icons-material/Menu';

import theme from "../theme"
import img1 from '../images/img1.png'
import img5 from '../images/img5.png'
import img4 from '../images/img4.png'
import homeVideo from '../assets/homeVideo.mp4'
import ReservationForm from "./ReservationForm";
import { useRef, useState } from "react";

function Dashboard() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const main = useRef(null)
    const reservations = useRef(null)
    const services = useRef(null)
    const contactUs = useRef(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Grid container flexDirection={'column'} size={12} minHeight={'100dvh'} alignItems={'center'} color={'primary.main'}>
            <Grid container flexDirection={'row'} position={'absolute'}
                justifyContent={{ xs: 'space-between' }}
                alignItems={'center'}
                top={0} size={12} padding={2} spacing={{ sm: 1, md: 8, lg: 12 }} bgcolor={alpha(theme.palette.secondary.main, 0.85)} >
                <Typography variant="h5" >
                    القاعة الملكية
                </Typography>
                <Grid container flexDirection={'row'} justifyContent={'space-between'} display={{ xs: 'none', sm: 'flex' }}>
                    <Button size="small" onClick={() => reservations.current?.scrollIntoView({ behavior: 'smooth' })} >
                        الحجوزات
                    </Button>
                    <Button size="small" onClick={() => services.current?.scrollIntoView({ behavior: 'smooth' })} >
                        الخدمات
                    </Button>
                    <Button size="small" onClick={() => contactUs.current?.scrollIntoView({ behavior: 'smooth' })} >
                        تواصل معنا
                    </Button>
                </Grid>
                <Button variant="outlined" size="small" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Link component={RouterLink} to={'/admin'} underline={'none'} >
                        تسجيل الدخول
                    </Link>
                </Button>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ display: { xs: 'block', sm: 'none' }, padding: 0 }}
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
                    <MenuItem onClick={() => {
                        main.current?.scrollIntoView({ behavior: 'smooth' });
                        handleClose()
                    }
                    }>الرئيسية</MenuItem>
                    <MenuItem>
                        <Link component={RouterLink} to={'/admin'} underline={'none'} color="black">
                            تسجيل الدخول
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        reservations.current?.scrollIntoView({ behavior: 'smooth' });
                        handleClose()
                    }
                    }>الحجوزات</MenuItem>
                    <MenuItem onClick={() => {
                        services.current?.scrollIntoView({ behavior: 'smooth' });
                        handleClose()
                    }
                    }>الخدمات</MenuItem>
                    <MenuItem onClick={() => {
                        contactUs.current?.scrollIntoView({ behavior: 'smooth' });
                        handleClose()
                    }
                    }>تواصل معنا</MenuItem>
                </Menu>
            </Grid>

            <Grid container size={12} flexDirection={'column'} alignItems={'center'} sx={{ zIndex: -1 }}>
                <Box width={'100%'} height={{ sm: 400, md: 600, lg: 800 }} marginTop={{ xs: 9, sm: 0 }}>
                    <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        <source src={homeVideo} type="video/mp4"></source>
                    </video>
                </Box>
            </Grid>

            <Grid container size={12} flexDirection={'column'} marginTop={10} padding={2} ref={main}>
                <Container maxWidth={'md'}>
                    <ReservationForm refs={{
                        reservations,
                        services
                    }} />
                </Container >
            </Grid>
            <Grid container size={12} bgcolor={'primary.main'} color={'white'} padding={{ xs: 3, sm: 4 }} marginTop={10} ref={contactUs}>

                <Grid container size={6} flexDirection={'column'} spacing={1} >
                    <Typography variant="h5">
                        القاعة الملكية
                    </Typography>
                    <Typography fontSize={14} sx={{ cursor: 'pointer' }} onClick={() => main?.current.scrollIntoView({ behavior: 'smooth' })}>
                        ● الرئيسية
                    </Typography>
                    <Typography fontSize={14} sx={{ cursor: 'pointer' }} onClick={() => reservations?.current.scrollIntoView({ behavior: 'smooth' })}>
                        ● الحجوزات
                    </Typography>
                    <Typography fontSize={14} sx={{ cursor: 'pointer' }} onClick={() => services?.current.scrollIntoView({ behavior: 'smooth' })}>
                        ● الخدمات
                    </Typography>
                    <Typography fontSize={14} sx={{ cursor: 'pointer' }} onClick={() => contactUs?.current.scrollIntoView({ behavior: 'smooth' })}>
                        ● تواصل معنا
                    </Typography>
                </Grid>


                <Grid container size={6} flexDirection={'column'} alignItems={'end'} justifyContent={'start'} spacing={2}>
                    <Grid container justifyContent={'end'} spacing={2} alignItems={'center'}>
                        <BsInstagram fontSize={20} />
                        <BsFacebook fontSize={20} />
                    </Grid>
                    <Grid container justifyContent={'end'} spacing={2} alignItems={'end'}>
                        <Typography>
                            0599921549
                        </Typography>
                        <BsWhatsapp fontSize={20} />
                    </Grid>

                    <Grid container justifyContent={'end'} spacing={2} alignItems={'end'}>
                        <Typography fontSize={10}>
                            طولكرم - شارع نابلس
                        </Typography>
                        <FaMapMarkerAlt fontSize={20} />
                    </Grid>
                </Grid>

            </Grid>
        </Grid >
    )
}

export default Dashboard