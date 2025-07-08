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

interface FormPDFButtonProps {
    booking: BookingInfo;
    signatureUrl?: string;
}

function FormPDFButton({ booking, signatureUrl }: FormPDFButtonProps) {
    const handleClick = async () => {
        try {
            const blob = await pdf(<FormPDF booking={booking} signatureUrl={signatureUrl} />).toBlob();
            const url = URL.createObjectURL(blob);
            console.log("Sender : ",booking.sender)
            console.log("signature : ",signatureUrl)
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

