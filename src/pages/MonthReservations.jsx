import { Badge, Box, Chip, Collapse, Grid2 as Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Navbar from "../ui/Navbar"
import { Navigate } from "react-router-dom"
import { useAdmin } from "../features/auth/useAdmin"
import { DateCalendar, DayCalendarSkeleton, PickersDay } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import SpinnerLoader from "../ui/SpinnerLoader"
import { serviceName } from "../Enums/services"
import { Delete } from "@mui/icons-material"
import { useReservationsAdmin } from "../features/reservations/useReservationsAdmin"
import { useDispatchReservation } from "../features/reservations/useDispatchReservations"
import Swal from "sweetalert2"
import { useHighlightedDays } from "../features/reservations/useHighlightedDays"
import { timeFormatter } from "../utils/formatters"
import ReservationRow from "../ui/ReservationRow"
import ReservationsTableHeader from "../ui/ReservationsTableHeader"

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

    const { highlightedDays, refetch } = useHighlightedDays(calendarPayload);



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

    useEffect(() => {
        if (payload.action === 'fetchMonth')
            refetch();

    }, [payload, reservations, refetch])

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
                        <ReservationsTableHeader />
                        <TableBody>
                            {
                                reservations?.map((res) =>
                                    <ReservationRow key={res.id} reservation={res} />
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

        </Grid >
    )
}

export default MonthReservations