import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { pdf } from "@react-pdf/renderer";
import { FormPDF } from "@/components/PDF/FormPDF";

interface BookingInfo {
    RoomName: string;
    sendDate: Date;
    sender: string;
    jobName: string;
    officeLocation: string;
    phoneIn: string;
    phoneOut: string;
    purpose: string;
    startDate: Date;
    endDate: Date;
    capacity: string;
    cfSender: string;
    cfPhone: string;
    SendStatus: string;
}

function FormPDFButton({ booking }: { booking: BookingInfo }) {
    const handleClick = async () => {
        try {
            const blob = await pdf(<FormPDF booking={booking} />).toBlob();
            const url = URL.createObjectURL(blob);

            window.open(url, "_blank");

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 10000);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการสร้าง PDF", error);
        }
    };

    return (
        <Tooltip title="ดูรายละเอียด">
            <IconButton color="info" aria-label="ดูรายละเอียด" onClick={handleClick}>
                <VisibilityIcon />
            </IconButton>
        </Tooltip>
    );
}

export default FormPDFButton;
