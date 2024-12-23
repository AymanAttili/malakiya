import { alpha, Box, Button, Container, Grid2 as Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import MenuIcon from '@mui/icons-material/Menu';

import theme from "../theme"
import img1 from '../images/img1.png'
import img5 from '../images/img5.png'
import img4 from '../images/img4.png'
import ReservationForm from "./ReservationForm";
import { useState } from "react";

function Dashboard() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Grid container flexDirection={'column'} size={12} minHeight={'100dvh'} alignItems={'center'} color={'primary.main'}>
            <Grid container flexDirection={'row'} position={'absolute'}
                justifyContent={{ xs: 'space-between', sm: 'start' }}
                top={0} size={12} paddingY={2} paddingX={4} spacing={{ md: 8, lg: 12 }} bgcolor={alpha(theme.palette.secondary.main, 0.85)} >
                <Typography variant="h5" >
                    القاعة الملكية
                </Typography>
                <Grid container flexDirection={'row'} justifyContent={'space-between'} display={{ xs: 'none', sm: 'flex' }}>
                    <Button>
                        الرئيسية
                    </Button>
                    <Button>
                        الحجوزات
                    </Button>
                    <Button>
                        الخدمات
                    </Button>
                    <Button>
                        تواصل معنا
                    </Button>
                </Grid>
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
                    <MenuItem onClick={handleClose}>الرئيسية</MenuItem>
                    <MenuItem onClick={handleClose}>الحجوزات</MenuItem>
                    <MenuItem onClick={handleClose}>الخدمات</MenuItem>
                    <MenuItem onClick={handleClose}>تواصل معنا</MenuItem>
                </Menu>
            </Grid>

            <Grid container size={12} flexDirection={'column'} alignItems={'center'}>
                <Box width={'100%'} height={600} >
                    <img src={img1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Button variant="outlined" sx={{ marginTop: -40, marginBottom: 40, fontSize: 24, borderColor: 'white', color: "white", bgcolor: alpha(theme.palette.primary.main, 0.8) }}>
                    احجز عرسك الآن!
                </Button>
            </Grid>


            <Grid container size={12} flexDirection={'column'} spacing={10} padding={2}>
                <Container maxWidth={'md'}>
                    <Grid container size={12} flexDirection={'column'} spacing={5}>
                        <Typography maxWidth={500} sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)', }}>
                            إختيار التفاصيل مهم جداً ، لذلك نقدم لك العديد من الإقتراحات لتناسبك في يوم زفافك.
                        </Typography>
                        <Box sx={{
                            width: {
                                xs: 130,
                                sm: 200
                            },
                            height: {
                                xs: 170,
                                sm: 300
                            }
                        }} alignSelf={'end'} borderRadius={5} overflow={'clip'}>
                            <img src={img5} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Box sx={{
                            width: {
                                xs: 130,
                                sm: 200
                            },
                            height: {
                                xs: 170,
                                sm: 300
                            },
                            marginLeft: {
                                xs: 20,
                                sm: 30
                            },
                            marginTop: {
                                xs: -8,
                                sm: -15
                            },
                            marginBottom: 15
                        }} alignSelf={'end'} borderRadius={5} overflow={'clip'}>
                            <img src={img4} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                    </Grid>

                    <ReservationForm />

                </Container >
            </Grid>
            <Grid container size={12} bgcolor={'third.main'} color={'white'} padding={4} marginTop={10}>

                <Grid container size={6} flexDirection={'column'} spacing={1}>
                    <Typography variant="h5" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)', }}>
                        القاعة الملكية
                    </Typography>
                    <Typography fontSize={14} >
                        ● الرئيسية
                    </Typography>
                    <Typography fontSize={14}>
                        ● الحجوزات
                    </Typography>
                    <Typography fontSize={14}>
                        ● الخدمات
                    </Typography>
                    <Typography fontSize={14}>
                        ● تواصل معنا
                    </Typography>
                </Grid>


                <Grid container size={6} flexDirection={'column'} alignItems={'end'} justifyContent={'space-between'}>
                    <Grid container justifyContent={'end'} spacing={4} alignItems={'end'}>
                        <BsInstagram fontSize={32} />
                        <BsFacebook fontSize={32} />
                    </Grid>
                    <Grid container justifyContent={'end'} spacing={2} alignItems={'end'}>
                        <Typography>
                            0599921549
                        </Typography>
                        <BsWhatsapp fontSize={32} />
                    </Grid>

                    <Grid container justifyContent={'end'} spacing={2} alignItems={'end'}>
                        <Typography>
                            0599921549
                        </Typography>
                        <FaMapMarkerAlt fontSize={32} />
                    </Grid>
                </Grid>

            </Grid>
        </Grid >
    )
}

export default Dashboard