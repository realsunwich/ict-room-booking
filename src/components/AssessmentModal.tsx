'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel,
    FormControl,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';

interface AssessmentItem {
    id: string;
    label: string;
}

interface AssessmentModalProps {
    open: boolean;
    onClose: () => void;
    roomId: string;
}

// แบบประเมินแต่ละหน้า
const formSteps: { title: string; items: AssessmentItem[] }[] = [
    {
        title: '1. ด้านมาตรฐานของการปฏิบัติงาน',
        items: [
            { id: '1.1', label: 'ความพร้อมของอุปกรณ์' },
            { id: '1.2', label: 'การติดตั้งระบบงานของผู้ใช้บริการ' },
            { id: '1.3', label: 'ความพร้อมของเจ้าหน้าที่และการปฏิบัติงาน' },
            { id: '1.4', label: 'การส่งมอบข้อมูลให้ผู้ใช้งานและมีครบถ้วน' },
            {
                id: '1.5',
                label: 'ความชัดเจนของมาตรฐานในการตอบสนองการแจ้งซ่อมและจัดการเหตุการณ์',
            },
        ],
    },
    {
        title: '2. ด้านการให้บริการ',
        items: [
            { id: '2.1', label: 'การให้คำแนะนำหรือการสื่อสารจากเจ้าหน้าที่' },
            { id: '2.2', label: 'การตอบสนองต่อปัญหาได้รวดเร็ว' },
            { id: '2.3', label: 'ความประทับใจในการใช้บริการโดยรวม' },
        ],
    },
];

const AssessmentModal: React.FC<AssessmentModalProps> = ({ open, onClose, roomId }) => {
    const [step, setStep] = useState(0);
    const [responses, setResponses] = useState<Record<string, number>>({});
    const [comment, setComment] = useState('');
    const [userInfo, setUserInfo] = useState({
        gender: '',
        role: '',
        meetingRoom: '',
    });

    const totalSteps = 1 + formSteps.length; // Step 0 = user info, Steps 1-N = assessments

    const handleRadioChange = (itemId: string, value: number) => {
        setResponses((prev) => ({ ...prev, [itemId]: value }));
    };

    const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const validateCurrentStep = () => {
        if (step === 0) {
            return userInfo.gender && userInfo.role && userInfo.meetingRoom;
        } else {
            const currentItems = formSteps[step - 1].items;
            return currentItems.every((item) => responses[item.id] !== undefined);
        }
    };

    const handleNext = () => {
        if (!validateCurrentStep()) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนดำเนินการต่อ');
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/assessments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId,
                    userInfo,
                    responses,
                    comment,
                }),
            });

            if (res.ok) {
                alert('บันทึกแบบประเมินเรียบร้อยแล้ว');
                onClose();
                setStep(0);
                setResponses({});
                setUserInfo({ gender: '', role: '', meetingRoom: '' });
                setComment('');
            } else {
                const error = await res.json();
                alert('เกิดข้อผิดพลาด: ' + error.message);
            }
        } catch (err) {
            alert('ไม่สามารถส่งข้อมูลได้');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>แบบประเมินโครงการ</DialogTitle>
            <DialogContent dividers>
                {step === 0 ? (
                    <>
                        <Typography variant="h6" gutterBottom>ข้อมูลทั่วไป</Typography>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>เพศ</FormLabel>
                            <RadioGroup
                                name="gender"
                                value={userInfo.gender}
                                onChange={handleUserInfoChange}
                                row
                            >
                                <FormControlLabel value="ชาย" control={<Radio />} label="ชาย" />
                                <FormControlLabel value="หญิง" control={<Radio />} label="หญิง" />
                                <FormControlLabel value="อื่น ๆ" control={<Radio />} label="อื่น ๆ" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>สถานะภาพ</FormLabel>
                            <RadioGroup name="role" value={userInfo.role} onChange={handleUserInfoChange}>
                                <FormControlLabel value="ผู้บริหาร" control={<Radio />} label="ผู้บริหาร" />
                                <FormControlLabel value="อาจารย์" control={<Radio />} label="อาจารย์" />
                                <FormControlLabel
                                    value="เจ้าหน้าที่สายสนับสนุน"
                                    control={<Radio />}
                                    label="เจ้าหน้าที่สายสนับสนุน"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>เลือกห้องประชุม</FormLabel>
                            <RadioGroup
                                name="meetingRoom"
                                value={userInfo.meetingRoom}
                                onChange={handleUserInfoChange}
                            >
                                <FormControlLabel value="ห้องประชุมคณะ ICT" control={<Radio />} label="ห้องประชุมคณะ ICT" />
                                <FormControlLabel value="ห้องประชุมแม่กา" control={<Radio />} label="ห้องประชุมแม่กา" />
                                <FormControlLabel value="ห้องบัณฑิตศึกษา ICT1318" control={<Radio />} label="ห้องบัณฑิตศึกษา ICT1318" />
                                <FormControlLabel value="ลานกิจกรรมใต้ถุนอาคาร ICT" control={<Radio />} label="ลานกิจกรรมใต้ถุนอาคาร ICT" />
                            </RadioGroup>
                        </FormControl>
                    </>
                ) : step < totalSteps - 1 ? (
                    <>
                        <Typography variant="h6" gutterBottom>{formSteps[step - 1].title}</Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: '40%' }}>หัวข้อการประเมิน</TableCell>
                                        {[5, 4, 3, 2, 1].map((score) => (
                                            <TableCell key={score} align="center">
                                                {score}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formSteps[step - 1].items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.label}</TableCell>
                                            {[5, 4, 3, 2, 1].map((score) => (
                                                <TableCell key={score} align="center">
                                                    <FormControlLabel
                                                        control={
                                                            <Radio
                                                                checked={responses[item.id] === score}
                                                                onChange={() => handleRadioChange(item.id, score)}
                                                                value={score}
                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>ข้อเสนอแนะเพิ่มเติม/ปัญหา เพื่อปรับปรุงคุณภาพการให้บริการ</Typography>
                        <TextField
                            label="หากมีข้อเสนอแนะ กรุณาระบุ"
                            multiline
                            fullWidth
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setStep((prev) => prev - 1)} disabled={step === 0}>
                    ย้อนกลับ
                </Button>
                {step < totalSteps - 1 ? (
                    <Button onClick={handleNext} variant="contained" color="primary">
                        ถัดไป
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        บันทึก
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AssessmentModal;
