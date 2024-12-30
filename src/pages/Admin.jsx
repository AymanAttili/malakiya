import { Navigate } from "react-router-dom"
import { useAdmin } from "../features/auth/useAdmin"
import { Checkbox, Chip, FormControlLabel, Grid2 as Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Swal from "sweetalert2"
import { useReservationsAdmin } from "../features/reservations/useReservationsAdmin"
import { useState } from "react"
import SpinnerLoader from "../ui/SpinnerLoader"
import { useDispatchReservation } from "../features/reservations/useDispatchReservations"
import { serviceName } from "../Enums/services"
import { Delete } from "@mui/icons-material"
import Navbar from "../ui/Navbar"
import { timeFormatter } from "../utils/formatters"
import ReservationsTableHeader from "../ui/ReservationsTableHeader"
import ReservationRow from "../ui/ReservationRow"

function Admin() {
    const { isAuthenticated } = useAdmin()
    const [notApproved, setNotApproved] = useState(true);
    const { reservations, isLoading } = useReservationsAdmin({ action: notApproved ? 'fetchNotApprovedOnly' : 'fetchAllUpcoming' })
    const { reservationDispatch } = useDispatchReservation();


    const handleApprove = async (id) => { // Fixing 
        const confirm = await Swal.fire({
            title: 'هل تريد تأكيد الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: 'green',
        })

        if (confirm.isConfirmed)
            reservationDispatch({ action: 'approve', payload: { id } })
    }
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'هل تريد حذف الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: '#d32f2f',
        })

        if (confirm.isConfirmed)
            reservationDispatch({ action: 'delete', payload: { id } })

    }

    if (!isAuthenticated)
        return <Navigate replace to='/login' />


    return (
        <Grid container flexDirection={'column'} minHeight={'100dvh'} color={'primary.main'}>
            <Navbar />

            <Grid container flexDirection={'column'} padding={{ sm: 2 }} alignItems={'center'} marginTop={{ xs: 5, sm: 2 }}>
                <Grid container size={12} justifyContent={'end'} paddingY={2}>
                    <FormControlLabel labelPlacement={'start'} control={
                        <Checkbox checked={!notApproved} onChange={() => setNotApproved(val => !val)} />
                    } label="جميع الحجوزات" />
                </Grid>
                {
                    isLoading ? <SpinnerLoader />
                        :

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
                }
            </Grid>
        </Grid >
    )
}

export default Admin