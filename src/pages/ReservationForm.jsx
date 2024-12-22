import { alpha, Box, Button, FormGroup, FormLabel, Grid2 as Grid, TextField, Typography } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import img6 from '../images/img6.png'
import img7 from '../images/img7.png'
import img8 from '../images/img8.png'
import theme from "../theme"


const times = [
    { id: 1, time: '12:00 AM', isAvailable: false },
    { id: 2, time: '2:00 PM', isAvailable: true },
    { id: 3, time: '4:00 PM', isAvailable: true },
    { id: 4, time: '6:00 PM', isAvailable: true },
    { id: 5, time: '8:00 PM', isAvailable: true },
    { id: 6, time: '10:00 PM', isAvailable: true },
]

function ReservationForm() {
    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedServices, setSelectedServices] = useState([]);
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')

    const [error, setError] = useState('');

    const isSelected = (service) => {
        return selectedServices.indexOf(service) !== -1;
    }

    const handleServiceClick = (service) => {
        if (isSelected(service))
            return handleDeleteService(service)

        handleAddService(service)
    }

    const handleAddService = (service) => {
        setSelectedServices(arr => [...arr, service]);
    }

    const handleDeleteService = (service) => {
        setSelectedServices(arr => arr.filter((item) => item != service));
    }

    const handleDateChange = (e) => {
        const formattedDate = format(e.$d, 'dd/MM/yyyy');
        console.log(formattedDate);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(() => '')
        if (selectedTime === null)
            setError(() => 'من فضلك اختر وقتاً للحجز')
    }

    return (
        <Grid component='form' onSubmit={handleSubmit} container size={12} flexDirection={'column'} alignItems={'center'} spacing={5} id='reservations'>
            <Typography variant='h5' sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)', }}>
                قم باختيار موعدك من الأوقات المتاحة:
            </Typography>

            <Grid container size={12} flexDirection={'column'} alignItems={'center'} maxWidth={360} paddingY={2} border={2} borderRadius={8}>
                <DateCalendar sx={{
                    borderBottom: 2,
                    width: 280
                }}
                    slotProps={{
                        calendarHeader: {
                            sx: {
                                direction: 'ltr',
                            }
                        }
                    }} onChange={handleDateChange} >

                </DateCalendar>
                <Typography>
                    الوقت
                </Typography>
                <Grid container size={12} flexDirection={'row-reverse'} justifyContent={'center'} paddingBottom={1} spacing={2}>
                    {
                        times.map((time) =>
                            <Button key={time.id}
                                variant={selectedTime === time.time ? 'contained' : 'outlined'}
                                disabled={!time.isAvailable}
                                size={'small'}
                                sx={{
                                    borderRadius: 10,
                                    width: 80,
                                    textDecoration: !time.isAvailable ? 'line-through' : ''
                                }}
                                onClick={() => setSelectedTime(time.time)}
                            >
                                {time.time}
                            </Button>
                        )
                    }

                </Grid>
            </Grid>

            <Grid container flexDirection={'column'} alignItems={'center'} gap={8} paddingY={3}>
                <Typography variant='h5' sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    قم باختيار الخدمات
                </Typography>

                <Grid container flexDirection={'column'} alignItems={'center'} spacing={2} padding={2}
                    sx={{
                        borderRadius: 10,
                        boxShadow: isSelected(0) ? 8 : 0
                    }}
                    onClick={() => handleServiceClick(0)}>
                    <Typography variant='h5' sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        تصوير
                    </Typography>
                    <Box width={240} height={240} borderRadius={8} overflow={'clip'}>
                        <img src={img6} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                </Grid>
                <Grid container flexDirection={'column'} alignItems={'center'} spacing={2} padding={2}
                    onClick={() => handleServiceClick(1)}
                    sx={{
                        borderRadius: 10,
                        boxShadow: isSelected(1) ? 8 : 0
                    }}
                >
                    <Typography variant='h5' sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        ضيافة
                    </Typography>
                    <Box width={240} height={240} borderRadius={8} overflow={'clip'}>
                        <img src={img7} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                </Grid>
                <Grid container flexDirection={'column'} alignItems={'center'} spacing={2} padding={2}
                    onClick={() => handleServiceClick(2)}
                    sx={{
                        borderRadius: 10,
                        boxShadow: isSelected(2) ? 8 : 0
                    }}
                >
                    <Typography variant='h5' sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        إضاءة وتزيين
                    </Typography>
                    <Box width={240} height={240} borderRadius={8} overflow={'clip'}>
                        <img src={img8} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                </Grid>
            </Grid>

            <Grid container flexDirection={'column'} alignItems={'center'} >
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <FormLabel htmlFor='name'>
                        الاسم
                    </FormLabel>
                    <TextField id='name' type='text' required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <FormLabel htmlFor='address'>
                        العنوان
                    </FormLabel>
                    <TextField id='address' type='text' required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <FormLabel htmlFor='number'>
                        الرقم
                    </FormLabel>
                    <TextField id='number' type='text' required
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <FormLabel htmlFor='email'>
                        الايميل
                    </FormLabel>
                    <TextField id='email' type={'email'} required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
            </Grid>
            {
                error &&
                <Typography color={'error'}>
                    {error}
                </Typography>
            }
            <Button size={'large'} variant='contained' type='submit'>
                تأكيد الحجز
            </Button>
        </Grid >
    )
}

export default ReservationForm