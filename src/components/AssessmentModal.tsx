'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, } from '@mui/material';

interface AssessmentModalProps {
    open: boolean;
    onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>แบบประเมินโครงการ</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1">
                    ใส่เนื้อหาแบบประเมินที่นี่ เช่น ฟอร์มคำถาม คะแนน ฯลฯ
                </Typography>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    ปิด
                </Button>
                <Button variant="contained" color="primary">
                    บันทึก
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssessmentModal;
