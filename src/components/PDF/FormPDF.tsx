import { useEffect } from 'react';
import { registerTHNiramitFont } from '@/utils/registerFonts';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface BookingInfo {
    RoomName: string;
    sendDate: Date;
    sender: string;
    jobname: string;
    phoneIn: string;
    phoneOut: string;
    department: string;
    purpose: string;
    startDate: Date;
    endDate: Date;
    capacity: string;
    cfSender: string;
    cfPhone: string;
    SendStatus: string;
}

export const FormPDF = ({ booking }: { booking: BookingInfo }) => {
    useEffect(() => {
        registerTHNiramitFont();
    }, []);

    const cm = (value: number) => value * 28.35;

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Th Niramit',
            backgroundColor: '#f4f4f4',
            paddingTop: cm(0.54),
            paddingBottom: cm(2.54),
            paddingLeft: cm(2.54),
            paddingRight: cm(2.54),
        },
        title: {
            fontSize: 10,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
        },
        section: {
            marginBottom: 10,
        },
        label: {
            fontSize: 10,
            fontWeight: 'bold',
        },
        text: {
            fontSize: 10,
        },
    });

    const formatDate = (date: Date) =>
        new Date(date).toLocaleString('th-TH', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image
                    src="http://localhost:3000/images/brand.png"
                    style={{ width: 50, height: 60, alignSelf: 'center' }}
                />
                <Text style={styles.title}>แบบฟอร์มขอใช้ห้องประชุมคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>ข้อมูลผู้ใช้งาน</Text>
                    <Text style={styles.text}>ด้วยข้าพเจ้า {booking.sender}</Text>
                </View>

            </Page>
        </Document>
    );
};