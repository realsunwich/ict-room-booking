export interface BookingInfo {
    bookingID: number;
    RoomName: string;
    sendDate: Date;
    sender: string;
    phoneIn: number;
    phoneOut: number;
    officeLocation: string;
    purpose: string;
    startDate: Date;
    endDate: Date;
    capacity: number;
    cfSender: string;
    cfPhone: number;
    SendStatus: string;

    createdAt: Date;
    updatedAt: Date;
    RecordStatus: string;
}

export function tranformBooking(bookingInfo: BookingInfo[], bookingID: number): BookingInfo[] {
    return bookingInfo.map((bookingInfomation) => ({
        bookingID: bookingID,
        RoomName: bookingInfomation.RoomName,
        sendDate: bookingInfomation.sendDate,
        sender: bookingInfomation.sender,
        phoneIn: bookingInfomation.phoneIn,
        phoneOut: bookingInfomation.phoneOut,
        officeLocation: bookingInfomation.officeLocation,
        purpose: bookingInfomation.purpose,
        startDate: bookingInfomation.startDate,
        endDate: bookingInfomation.endDate,
        capacity: bookingInfomation.capacity,
        cfSender: bookingInfomation.cfSender,
        cfPhone: bookingInfomation.cfPhone,
        SendStatus: bookingInfomation.SendStatus,

        createdAt: bookingInfomation.createdAt,
        updatedAt: bookingInfomation.updatedAt,
        RecordStatus: 'N',
    }));
}