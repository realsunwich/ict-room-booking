import { Box, Typography } from "@mui/material";

interface StatusStatsProps {
    statusCounts?: Record<string, number>;
    canceledOrRejected: {
        SendStatus: string;
        RejectReason?: string | null;
        CancelReason?: string | null;
    }[];
}

export default function StatusStats({ statusCounts, canceledOrRejected }: StatusStatsProps) {
    return (
        <Box>
            {statusCounts && (
                <>
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>สถานะคำขอ</Typography>
                    {Object.entries(statusCounts).map(([status, count]) => (
                        <Typography key={status} variant="body2" sx={{ ml: 2 }}>
                            คำขอ{status} จำนวน {count} ครั้ง
                        </Typography>
                    ))}
                </>
            )}

            <Typography variant="subtitle1" fontWeight="bold" mt={2}>รายการที่ถูกยกเลิก / ไม่อนุมัติ</Typography>
            {canceledOrRejected.length > 0 ? (
                canceledOrRejected.map((item, idx) => (
                    <Box key={idx} sx={{ ml: 2, mb: 1 }}>
                        <Typography variant="body2">
                            สถานะคำขอ <strong>{item.SendStatus}</strong>
                        </Typography>
                        {item.CancelReason && (
                            <Typography variant="body2" color="text.secondary">
                                เหตุผล {item.CancelReason}
                            </Typography>
                        )}
                        {item.RejectReason && (
                            <Typography variant="body2" color="text.secondary">
                                เหตุผล {item.RejectReason}
                            </Typography>
                        )}
                    </Box>
                ))
            ) : (
                <Typography variant="body2" sx={{ ml: 2 }}>
                    ไม่มีรายการถูกยกเลิกหรือไม่อนุมัติ
                </Typography>
            )}
        </Box>
    );
}
