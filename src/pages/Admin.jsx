import { Navigate } from "react-router-dom"
import { useAdmin } from "../features/auth/useAdmin"
import { alpha, Button, Checkbox, Chip, FormControlLabel, Grid2 as Grid, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import theme from "../theme"
import Swal from "sweetalert2"
import { useLogout } from "../features/auth/useLogout"
import { useReservationsAdmin } from "../features/reservations/useReservationsAdmin"
import { useState } from "react"
import SpinnerLoader from "../ui/SpinnerLoader"
import { useDispatchReservation } from "../features/reservations/useDispatchReservations"
import { serviceName } from "../Enums/services"

function Admin() {
    const { isAuthenticated } = useAdmin()
    const { logout } = useLogout();
    const [notApproved, setNotApproved] = useState(true);
    const { reservations, isLoading } = useReservationsAdmin(notApproved)
    const { reservationDispatch } = useDispatchReservation();

    console.table(reservations)
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

    const handleApprove = async (id) => {
        const confirm = await Swal.fire({
            title: 'هل تريد تأكيد الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: 'green'
        })

        if (confirm)
            reservationDispatch({ action: 'approve', payload: { id } })
    }
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'هل تريد حذف الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: '#d32f2f'
        })

        if (confirm)
            reservationDispatch({ action: 'delete', payload: { id } })

    }

    if (!isAuthenticated)
        return <Navigate replace to='/login' />

    if (isLoading)
        return <SpinnerLoader />

    return (
        <Grid container flexDirection={'column'} minHeight={'100dvh'} color={'primary.main'}>
            <Grid container flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                size={12} paddingY={2} paddingX={4} spacing={{ md: 8, lg: 12 }} bgcolor={alpha(theme.palette.secondary.main, 0.85)} >
                <Typography variant="h5" >
                    القاعة الملكية
                </Typography>
                <Button variant="contained" onClick={handleLogout}>
                    تسجيل الخروج
                </Button>
            </Grid>

            <Grid container flexDirection={'column'} padding={{ sm: 2 }} alignItems={'center'}>
                <Grid container size={12} justifyContent={'end'}>
                    <FormControlLabel labelPlacement={'start'} control={
                        <Checkbox checked={notApproved} onChange={() => setNotApproved(val => !val)} />
                    } label="إظهار غير المؤكدة فقط" />
                </Grid>

                <Grid container size={12} flexDirection={'column'} >
                    <TableContainer sx={{ maxWidth: '100dvw', maxHeight: '80dvh', overflow: 'auto' }} >
                        <Table stickyHeader >
                            <TableHead >
                                <TableRow >
                                    <TableCell sx={{ textAlign: 'right', color: 'primary.main', bgcolor: 'secondary.main' }} >
                                        الاسم
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'primary.main', bgcolor: 'secondary.main' }} >
                                        اليوم
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'primary.main', bgcolor: 'secondary.main' }}>
                                        الساعة
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'primary.main', bgcolor: 'secondary.main' }}>
                                        الخدمات المضافة
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'primary.main', bgcolor: 'secondary.main' }}>
                                        رقم الهاتف
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'primary.main', bgcolor: 'secondary.main' }}>
                                        العنوان
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'primary.main', bgcolor: 'secondary.main' }}>
                                        الايميل
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', color: 'primary.main', bgcolor: 'secondary.main' }}>
                                        حالة الطلب
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
                                            <TableCell sx={{ textAlign: 'right' }}>
                                                {res.address}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'right' }}>
                                                {res.email}
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
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Admin