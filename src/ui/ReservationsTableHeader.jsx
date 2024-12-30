import { TableCell, TableHead, TableRow } from "@mui/material"

function ReservationsTableHeader() {
    return (
        <TableHead >
            <TableRow >
                <TableCell width={20} sx={{ bgcolor: 'primary.main' }}></TableCell>
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
    )
}

export default ReservationsTableHeader