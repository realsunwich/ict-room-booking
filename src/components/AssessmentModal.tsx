'use client';

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, } from '@mui/material';

interface AssessmentItem {
    id: string;
    label: string;
}

interface AssessmentModalProps {
    open: boolean;
    onClose: () => void;
    roomId: string;
}

const formSteps: { title: string; items: AssessmentItem[] }[] = [
    {
        title: '1. ด้านมาตรฐานของการปฏิบัติงาน',
        items: [
            { id: '1.1', label: '1.1 ความพร้อมของอุปกรณ์' },
            { id: '1.2', label: '1.2 การติดต่อประสานงานขอใช้บริการ' },
            { id: '1.3', label: '1.3 ความพร้อมของเจ้าหน้าที่และการปฏิบัติงาน' },
            { id: '1.4', label: '1.4 การส่งข้อมูลไฟล์ภาพและเสียงครบถ้วน' },
            { id: '1.5', label: '1.5 ความเป็นมาตรฐานในการออกแบบหน้าจอระบบสารสนเทศเพื่อการแจ้งซ่อมและติดตามงานอาคารสถานที่', },
        ],
    },
    {
        title: '2. ด้านความเต็มใจในการให้บริการ',
        items: [
            { id: '2.1', label: '2.1 ให้บริการด้วยความสุภาาพ อ่อนโยน' },
            { id: '2.2', label: '2.2 ให้บริการด้วยความเต็มใจ' },
            { id: '2.3', label: '2.3 ให้บริการด้วยอัธยาศัยอันดีทั้งในและนอกเวลา' },
            { id: '2.4', label: '2.4 ให้บริการโดยเท่าเทียมกัน' },
        ],
    },
    {
        title: '3. ด้านคุณภาพการให้บริการ',
        items: [
            { id: '3.1', label: '3.1 ความสามารถในการติดตั้งอุปกรณ์ให้ใช้งานได้อย่างมีประสิทธิภาพ' },
            { id: '3.2', label: '3.2 ความสะดวก รวดเร็วในการให้บริการ' },
            { id: '3.3', label: '3.3 การติดต่อประสานงานการขอใช้บริการเป็นไปด้วยความรวดเร็ว' },
            { id: '3.4', label: '3.4 ความสามารถของผู้ให้บริการในการจัดเตรียมสถานที่ห้องประชุมและการจัดเตรียมให้บริการ' },
        ],
    },
    {
        title: '4. การปรับปรุงการให้บริการ',
        items: [
            { id: '4.1', label: '4.1 การปรับปรุงให้บริการ และอำนวยความสะดวกด้านต่าง ๆ' },
        ],
    },
    {
        title: '5. ความพึงพอใจโดยรวม',
        items: [
            { id: '5.1', label: '5.1 ความพึงพอใจโดยรวมในทุกด้าน' },
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

    const questionGroups: Record<string, string[]> = formSteps.reduce((acc, group) => {
        acc[group.title] = group.items.map(i => i.id);
        return acc;
    }, {} as Record<string, string[]>);

    const questionLabels: Record<string, string> = formSteps
        .flatMap(group => group.items)
        .reduce((acc, cur) => {
            acc[cur.id] = cur.label;
            return acc;
        }, {} as Record<string, string>);

    function groupResponses(rawResponses: Record<string, number>) {
        const grouped: Record<string, Record<string, number>> = {};

        for (const [groupName, keys] of Object.entries(questionGroups)) {
            grouped[groupName] = {};
            keys.forEach((key) => {
                if (rawResponses[key] !== undefined) {
                    grouped[groupName][questionLabels[key]] = rawResponses[key];
                }
            });
        }

        return grouped;
    }

    const totalSteps = 1 + formSteps.length + 1;

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
        } else if (step > 0 && step <= formSteps.length) {
            const currentItems = formSteps[step - 1].items;
            return currentItems.every((item) => responses[item.id] !== undefined);
        } else if (step === totalSteps - 1) {
            return true;
        }
        return false;
    };

    const handleNext = () => {
        if (!validateCurrentStep()) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนดำเนินการต่อ');
            return;
        }
        setStep((prev) => Math.min(prev + 1, totalSteps - 1));
    };

    const handleSubmit = async () => {
        try {
            const groupedResponses = groupResponses(responses);  // แปลง responses ก่อนส่ง

            const res = await fetch('/api/assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId,
                    userInfo,
                    responses: groupedResponses,
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
        } catch (error) {
            console.error('Error submitting assessment:', error);
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
                            <RadioGroup
                                name="role"
                                value={userInfo.role}
                                onChange={handleUserInfoChange}
                                row
                                sx={{
                                    flexDirection: { xs: 'column', sm: 'row' },
                                }}
                            >
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
                                row
                                sx={{
                                    flexDirection: { xs: 'column', sm: 'row' },
                                }}
                            >
                                <FormControlLabel value="ห้องประชุมคณะ ICT" control={<Radio />} label="ห้องประชุมคณะ ICT" />
                                <FormControlLabel value="ห้องประชุมแม่กา" control={<Radio />} label="ห้องประชุมแม่กา" />
                                <FormControlLabel value="ห้องบัณฑิตศึกษา ICT1318" control={<Radio />} label="ห้องบัณฑิตศึกษา ICT1318" />
                                <FormControlLabel value="ลานกิจกรรมใต้ถุนอาคาร ICT" control={<Radio />} label="ลานกิจกรรมใต้ถุนอาคาร ICT" />
                            </RadioGroup>
                        </FormControl>
                    </>
                ) : step > 0 && step <= formSteps.length ? (
                    <>
                        <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'right' }}>
                            หน้า {step} / {formSteps.length}
                        </Typography>
                        <Typography variant="h6" gutterBottom>{formSteps[step - 1].title}</Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: '48.4943%' }}>หัวข้อการประเมิน</TableCell>
                                        <TableCell align="center">5<br />(มากที่สุด)</TableCell>
                                        <TableCell align="center">4<br />(มาก)</TableCell>
                                        <TableCell align="center">3<br />(ปานกลาง)</TableCell>
                                        <TableCell align="center">2<br />(น้อย)</TableCell>
                                        <TableCell align="center">1<br />(น้อยที่สุด)</TableCell>
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
                ) : step === totalSteps - 1 ? (
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
                ) : null}
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setStep((prev) => Math.max(prev - 1, 0))} disabled={step === 0}>
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
