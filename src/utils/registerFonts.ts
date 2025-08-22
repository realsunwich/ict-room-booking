import { Font } from '@react-pdf/renderer';
import path from 'path';

export const registerTHSarabunFont = () => {
    Font.register({
        family: 'Sarabun',
        fonts: [
            {
                src: path.join(process.cwd(), 'fonts', 'Sarabun-Bold.ttf'),
                fontWeight: 'bold',
            },
            {
                src: path.join(process.cwd(), 'fonts', 'Sarabun-Regular.ttf'),
                fontWeight: 'normal',
            },
        ],
    });
};
