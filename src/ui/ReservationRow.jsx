import { Chip, Collapse, Grid2 as Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { timeFormatter } from "../utils/formatters"
import { serviceName } from "../Enums/services"
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { useDispatchReservation } from "../features/reservations/useDispatchReservations"
import Swal from "sweetalert2"
import { useState } from "react"

function ReservationRow({ reservation }) {
    const [open, setOpen] = useState(false)

    const { reservationDispatch } = useDispatchReservation();
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e.target.innerText)
            .then(() => {
                alert('Text copied to clipboard!');
            })
            .catch((err) => {
                alert('Failed to copy text: ' + err);
            });
    }

    const handleApprove = async () => {
        const confirm = await Swal.fire({
            title: 'هل تريد تأكيد الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: 'green',
        })

        if (confirm.isConfirmed)
            await reservationDispatch({ action: 'approve', payload: { id: reservation.id } })
    }
    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: 'هل تريد حذف الطلب؟',
            confirmButtonText: 'موافق',
            cancelButtonText: 'لاحقاً',
            showCancelButton: true,
            confirmButtonColor: '#d32f2f',
        })

        if (confirm.isConfirmed) {
            await reservationDispatch({ action: 'delete', payload: { id: reservation.id } })
        }
    }
    return (
        <>
            <TableRow key={reservation.id}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                    {reservation.users[0].name}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                    {reservation.date}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                    {timeFormatter(reservation.time)}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                    <table>
                        {reservation.services?.map((service) => <li key={service.id}>{serviceName[service.value]}</li>)}
                    </table>

                </TableCell>
                <TableCell sx={{ textAlign: 'right' }} >
                    <Typography onClick={copyToClipboard} sx={{ cursor: 'copy' }} width={'fit-content'}>
                        {reservation.users[0].number}
                    </Typography>
                </TableCell>
                <TableCell >
                    <Grid container justifyContent={'center'} spacing={1}>
                        {
                            reservation.approved ? <Chip color="success" label='تم التأكيد' />
                                :
                                <>
                                    <Chip color="primary" clickable label='مراجعة' onClick={() => handleApprove()} />
                                    <Chip color="error" clickable label='رفض' onClick={() => handleDelete()} />
                                </>
                        }
                    </Grid>
                </TableCell>
                <TableCell>
                    {
                        reservation.approved &&
                        <IconButton onClick={() => handleDelete(reservation.id)} >
                            <Delete color="error" />
                        </IconButton>
                    }

                </TableCell>
            </TableRow>
            <TableRow key={`${reservation.id}a`}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }} >الايميل</TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }} >العنوان</TableCell>
                                    <TableCell sx={{ textAlign: 'right', color: 'white', bgcolor: 'primary.main' }} >ملاحظات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow key={`${reservation.id}b`}>
                                    <TableCell sx={{ textAlign: 'right' }} >{reservation.users[0].email}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }} >{reservation.users[0].address}</TableCell>
                                    <TableCell sx={{ textAlign: 'right' }} >{reservation.notes}</TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow >
        </>
    )
}

export default ReservationRow