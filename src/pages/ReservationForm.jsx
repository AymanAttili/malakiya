import { Box, Button, FormLabel, Grid2 as Grid, TextField, Typography } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import img6 from '../images/img6.png'
import img7 from '../images/img7.png'
import img8 from '../images/img8.png'
import { usePawnedReservations } from '../features/reservations/usePawnedReservations';
import { useTimes } from '../features/times/useTimes';
import { useReserve } from '../features/reservations/useReserve';
import { MuiTelInput } from 'mui-tel-input';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';


function ReservationForm({ refs }) {
    const today = useRef(dayjs())

    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedDate, setSelectedDate] = useState(() => format(today.current.$d, 'yyyy-MM-dd'))
    const [selectedServices, setSelectedServices] = useState([]);
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');

    const { pawnedReservations, isError, isLoading, refetch } = usePawnedReservations(selectedDate);
    const { reserve, isError: isErrorServing, error: errorServing, isLoading: isServing } = useReserve();

    const { times } = useTimes(pawnedReservations)

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

    const handleDateChange = async (e) => {
        const formattedDate = format(e.$d, 'yyyy-MM-dd');
        setSelectedDate(formattedDate);
        setSelectedTime(null)
    }

    const resetForm = () => {
        setSelectedTime(null);
        setAddress('')
        setEmail('')
        setError('')
        setName('')
        setNumber('')
        setSelectedServices([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(() => '')
        if (selectedTime === null)
            setError(() => 'من فضلك اختر وقتاً للحجز')

        const payload = {
            name,
            email,
            number,
            address,
            date: selectedDate,
            time: selectedTime,
            services: selectedServices
        }
        await reserve(payload)

        if (!isErrorServing)
            resetForm();

    }

    return (
        <Grid component='form' onSubmit={handleSubmit} container size={12} flexDirection={'column'} alignItems={'center'} spacing={5} id='reservations'>
            <Typography variant='h5'>
                قم باختيار موعدك من الأوقات المتاحة:
            </Typography>

            <Grid container size={12} flexDirection={'column'} alignItems={'center'} maxWidth={360} paddingY={2} border={2} borderRadius={8} ref={refs?.reservations}>
                <DateCalendar
                    minDate={today.current}
                    defaultValue={today.current}
                    sx={{
                        borderBottom: 2,
                        width: 280
                    }}
                    slotProps={{
                        calendarHeader: {
                            sx: {
                                direction: 'ltr',
                            }
                        }
                    }}
                    onChange={handleDateChange}
                >

                </DateCalendar>
                <Typography>
                    الوقت
                </Typography>
                <Grid container size={12} flexDirection={'row-reverse'} justifyContent={'center'} paddingBottom={1} spacing={2}>
                    {
                        times.map((time) =>
                            <Button key={time.id}
                                variant={selectedTime === time.val ? 'contained' : 'outlined'}
                                disabled={!time.isAvailable}
                                size={'small'}
                                sx={{
                                    borderRadius: 10,
                                    width: 80,
                                    textDecoration: !time.isAvailable ? 'line-through' : ''
                                }}
                                onClick={() => setSelectedTime(time.val)}
                            >
                                {time.time}
                            </Button>
                        )
                    }

                </Grid>
            </Grid>

            <Grid container flexDirection={'column'} alignItems={'center'} gap={8} paddingY={3} ref={refs?.services}>
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
                        fullWidth
                    />
                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <FormLabel htmlFor='address'>
                        العنوان
                    </FormLabel>
                    <TextField id='address' type='text' required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <FormLabel htmlFor='number'>
                        الرقم
                    </FormLabel>
                    <MuiTelInput
                        id='number' required
                        value={number}
                        onChange={(e) => setNumber(e)}
                        fullWidth
                    />

                </Grid>
                <Grid container size={12} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                    <FormLabel htmlFor='email'>
                        الايميل
                    </FormLabel>
                    <TextField id='email' type={'email'} required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                </Grid>
            </Grid>
            {
                error &&
                <Typography color={'error'}>
                    {error}
                </Typography>
            }
            <LoadingButton
                type="submit"
                disabled={isLoading || isServing}
                fullWidth
                size={'large'}
                variant="contained"
                aria-label="Login"
                loading={isServing}
            >
                تأكيد الحجز
            </LoadingButton>

        </Grid >
    )
}

export default ReservationForm