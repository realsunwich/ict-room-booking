import { Font } from '@react-pdf/renderer';
import path from 'path';

export const registerTHNiramitFont = () => {
    Font.register({
        family: 'Th Niramit',
        fonts: [
            {
                src: path.join(process.cwd(), 'fonts', 'Niramit-Bold.ttf'),
                fontWeight: 'bold',
            },
            {
                src: path.join(process.cwd(), 'fonts', 'Niramit-Regular.ttf'),
                fontWeight: 'normal',
            },
        ],
    });
};
