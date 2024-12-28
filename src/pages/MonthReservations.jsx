import { Badge, Chip, Grid2 as Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Navbar from "../ui/Navbar"
import { Navigate } from "react-router-dom"
import { useAdmin } from "../features/auth/useAdmin"
import { DateCalendar, DayCalendarSkeleton, PickersDay } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { useRef, useState } from "react"
import SpinnerLoader from "../ui/SpinnerLoader"
import { serviceName } from "../Enums/services"
import { Delete } from "@mui/icons-material"
import { useReservationsAdmin } from "../features/reservations/useReservationsAdmin"
import { useDispatchReservation } from "../features/reservations/useDispatchReservations"
import Swal from "sweetalert2"
import { useHighlightedDays } from "../features/reservations/useHighlightedDays"
import { useQueryClient } from "@tanstack/react-query"

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (

        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} today={isSelected} />
    );
}


function MonthReservations() {
    const today = useRef(dayjs())
    const [payload, setPayload] = useState({ action: 'fetchMonth', payload: { month: today.current.$M + 1, year: today.current.$y } })
    const [calendarPayload, setCalendarPayload] = useState({ month: today.current.$M + 1, year: today.current.$y })

    const { isAuthenticated, isLoading: fetchingAdmin } = useAdmin()
    const { reservations, isLoading } = useReservationsAdmin(payload)
    const { reservationDispatch } = useDispatchReservation();

    const { highlightedDays } = useHighlightedDays(calendarPayload);


    const handleApprove = async (id) => { // Fixing 
        const confirm = await Swal.fire({
            title: 'هل تريد تأكيد الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: 'green',
        })

        if (confirm.isConfirmed)
            await reservationDispatch({ action: 'approve', payload: { id } })
    }
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'هل تريد حذف الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: '#d32f2f',
        })

        if (confirm.isConfirmed) {
            await reservationDispatch({ action: 'delete', payload: { id } })
        }
    }

    const handleMonthChange = (date) => {
        setPayload(() => {
            return {
                action: 'fetchMonth',
                payload: {
                    month: date.$M + 1,
                    year: date.$y
                }
            }
        })

        setCalendarPayload(() => {
            return {
                month: date.$M + 1,
                year: date.$y
            }
        })
    }

    const handleDayChange = (date) => {
        setPayload({
            action: 'fetchDay',
            payload: {
                date
            }
        })
    }


    if (fetchingAdmin)
        return <SpinnerLoader />

    if (!isAuthenticated)
        return <Navigate replace to='/login' />
    return (
        <Grid container flexDirection={'column'} minHeight={'100dvh'} color={'primary.main'}>
            <Navbar />

            <DateCalendar
                onMonthChange={handleMonthChange} // update to currMonthRes
                onChange={handleDayChange} // update to currDayRes
                loading={isLoading}
                renderLoading={() => <DayCalendarSkeleton />}

                slots={{
                    day: ServerDay,
                }}
                slotProps={{
                    day: {
                        highlightedDays,
                    },
                    calendarHeader: {
                        sx: {
                            direction: 'ltr',
                        }
                    }
                }}
            />



            <Grid container size={12} flexDirection={'column'} >
                <TableContainer sx={{ maxWidth: '100dvw', maxHeight: '70dvh', overflow: 'auto' }} >
                    <Table stickyHeader >
                        <TableHead >
                            <TableRow >
                                <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }} >
                                    الاسم
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }} >
                                    اليوم
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }}>
                                    الساعة
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }}>
                                    الخدمات المضافة
                                </TableCell>
                                <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }}>
                                    رقم الهاتف
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white', bgcolor: 'primary.main' }}>
                                    حالة الطلب
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', color: 'white', bgcolor: 'primary.main' }}>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                reservations?.map((res) =>
                                    <TableRow key={res.id}>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            {res.name}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            {res.date}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            {res.time}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            <table>
                                                {res.services?.map((service) => <li key={service}>{serviceName[service]}</li>)}
                                            </table>

                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            {res.number}
                                        </TableCell>
                                        <TableCell >
                                            <Grid container justifyContent={'center'} spacing={1}>
                                                {
                                                    res.approved ? <Chip color="success" label='تم التأكيد' />
                                                        :
                                                        <>
                                                            <Chip color="primary" clickable label='مراجعة' onClick={() => handleApprove(res.id)} />
                                                            <Chip color="error" clickable label='رفض' onClick={() => handleDelete(res.id)} />
                                                        </>
                                                }
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(res.id)} >
                                                <Delete color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            }


                        </TableBody>

                    </Table>
                    {
                        reservations?.length === 0 &&
                        <Typography variant="h6" textAlign={'center'} paddingTop={3}>
                            لا يوجد حجوزات حالية...
                        </Typography>
                    }
                </TableContainer>
            </Grid>

        </Grid>
    )
}

export default MonthReservations