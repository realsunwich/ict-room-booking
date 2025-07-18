import { useEffect } from 'react';
import { registerTHNiramitFont } from '@/utils/registerFonts';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface BookingInfo {
    RoomName: string;
    sendDate: Date;
    sender: string;
    jobName: string;
    phoneIn: string;
    phoneOut: string;
    officeLocation: string;
    purpose: string;
    startDate: Date;
    endDate: Date;
    capacity: string;
    cfSender: string;
    cfPhone: string;
    SendStatus: string;
    approvedNumber: string;
}

export const FormPDF = ({ booking, signatureUrl, includeApprovalSignature = false, approvalDate
}: { booking: BookingInfo, signatureUrl?: string; includeApprovalSignature?: boolean; approvalDate?: string; }) => {
    useEffect(() => {
        registerTHNiramitFont();
    }, []);

    const formatPhoneNumber = (phone: string) => {
        const digits = phone.replace(/\D/g, "");
        if (digits.length === 10) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        } else if (digits.length === 9) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
        return phone;
    };

    const cm = (value: number) => value * 28.35;

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Th Niramit',
            backgroundColor: '#ffffff',
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
            marginBottom: 5,
        },
        text: {
            fontSize: 10,
            marginBottom: 8,
            lineHeight: 1.5,
            wordBreak: 'break-word',
        },
        noteBox1: {
            position: 'absolute',
            top: cm(1),
            right: cm(1),
            width: cm(6.3),
            padding: cm(0.3),
            border: '1 solid #000',
            fontSize: 8,
            fontWeight: 'bold',
        },
        boxApproval: {
            border: '1 solid #000',
            padding: cm(0.5),
            marginTop: cm(1),
            width: '50%',
            fontSize: 10,
            justifyContent: 'center',
            alignSelf: 'flex-end',
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.noteBox1}>
                    <Text>
                        งานโสตทัศนศึกษา-๐๑ เลขที่ {booking.approvedNumber
                            ? ` ${booking.approvedNumber}`
                            : '............../..............'}
                    </Text>
                </View>

                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    src="http://localhost:3000/images/brand.png"
                    style={{ width: 80, height: 90, alignSelf: 'center', marginBottom: cm(1) }}
                />

                <Text style={styles.title}>แบบฟอร์มขอใช้ห้องประชุมคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา</Text>

                <View>
                    <Text style={[styles.text, { textAlign: 'right', paddingRight: cm(1), marginBottom: cm(0.5), marginTop: cm(0.5) }]}>
                        วันที่ {booking.sendDate.toLocaleDateString("th-TH", { dateStyle: "long" })}
                    </Text>
                </View>

                <View style={styles.section}>

                    <View>
                        <Text
                            style={[
                                styles.text,
                                {
                                    textAlign: 'justify',
                                    textIndent: cm(1),
                                },
                            ]}
                        >
                            {`ด้วยข้าพเจ้า ${booking.sender} ตำแหน่ง ${booking.jobName} หมายเลขโทรศัพท์ติดต่อ ${formatPhoneNumber(
                                booking.phoneOut
                            )} หมายเลขโทรศัพท์ภายใน ${booking.phoneIn ? formatPhoneNumber(booking.phoneIn) : 'ไม่มีหมายเลขภายใน'
                                } สังกัดหน่วยงาน ${booking.officeLocation} มีความประสงค์จะขอใช้ห้องและโสตทัศนูปกรณ์เพื่อ ${booking.purpose
                                } ณ ${booking.RoomName} ในวันที่ ${booking.startDate.toLocaleDateString('th-TH', {
                                    dateStyle: 'long',
                                })} เวลา ${booking.startDate.toLocaleTimeString('th-TH', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })} น. ถึงวันที่ ${booking.endDate.toLocaleDateString('th-TH', {
                                    dateStyle: 'long',
                                })} เวลา ${booking.endDate.toLocaleTimeString('th-TH', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })} น. รวมจำนวนผู้เข้าร่วมทั้งสิ้น ${booking.capacity} คน    `}
                        </Text>
                    </View>

                    <Text style={[styles.text, { textAlign: 'justify' }]}>
                        {'      '}ทั้งนี้ ข้าพเจ้ายินดีที่จะดูแลรับผิดชอบและปฏิบัติตามเงื่อนไข / ข้อปฏิบัติของการใช้บริการห้อง
                        ประชุมคณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา
                    </Text>

                    <View style={{ marginTop: cm(0.5), alignItems: 'flex-start' }}>
                        <Text style={[styles.text, { textAlign: 'left', paddingLeft: cm(1), marginBottom: cm(0.5) }]}>
                            จึงเรียนมาเพื่อโปรดพิจารณาอนุญาต
                        </Text>
                    </View>
                    <View style={{ marginTop: cm(0.5), alignItems: 'flex-end' }}>
                        <View style={{ alignItems: 'center', paddingRight: cm(1) }}>
                            {/* eslint-disable jsx-a11y/alt-text */}
                            {signatureUrl && (
                                <Image
                                    src={signatureUrl}
                                    style={{
                                        width: cm(3),
                                        height: cm(1.5),
                                        marginBottom: -cm(0.55),
                                        marginLeft: cm(1),
                                        objectFit: 'contain',
                                    }}
                                />
                            )}
                            <Text style={[styles.text]}>
                                ลงชื่อ..........................................................
                            </Text>

                            {includeApprovalSignature ? (
                                <>
                                    <Text style={[styles.text, { marginBottom: -cm(0.2) }]} >
                                        ผู้ขอใช้บริการ
                                    </Text>
                                    <Image
                                        src="/uploads/signatures/signature_64021193_up_ac_th.png"
                                        style={{
                                            width: cm(4),
                                            height: cm(2),
                                            marginBottom: -cm(0.5),
                                            marginLeft: cm(1),
                                            objectFit: "contain",
                                        }}
                                    />
                                    <Text style={[styles.text]}>ลงชื่อ..........................................................</Text>
                                    <Text style={[styles.text]}>{` นายอนุวัฒน์ โลมากุล `}</Text>
                                    <Text style={[styles.text]}>นักวิชาการโสตทัศนศึกษา</Text>
                                    <Text style={[styles.text]}>
                                        วันที่ {approvalDate}
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text style={[styles.text]}>ผู้ขอใช้บริการ</Text>
                                    <Text style={[styles.text]}>ลงชื่อ..........................................................</Text>
                                    <Text style={[styles.text]}>นักวิชาการโสตทัศนศึกษา</Text>
                                    <Text style={[styles.text]}>วันที่.................../.................../...................</Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>
                <View style={[styles.boxApproval, { alignItems: 'center', }]}>
                    <Text style={[styles.text]}>
                        เสนอ      [  ] อนุมัติ            [  ] ไม่อนุมัติ
                    </Text>
                    <Text style={[styles.text]}>
                        ลงชื่อ..........................................................
                    </Text>
                    <Text style={[styles.text]}>
                        {` ดร. เกวรินทร์ จันทร์ดำ `}
                    </Text>
                    <Text style={[styles.text]}>
                        รองคณบดีฝ่ายยุทธศาสตร์และพัฒนาองค์กร
                    </Text>
                    <Text style={[styles.text]}>วันที่.................../.................../...................</Text>
                </View>
            </Page>
        </Document>
    );
};