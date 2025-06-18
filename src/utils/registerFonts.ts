import { Font } from '@react-pdf/renderer';

const registerFontClientSide = () => {
    console.log("Registering font...");
    Font.register({
        family: 'Th Niramit',
        fonts: [
            {
                src: 'http://localhost:3000/fonts/Niramit-Bold.ttf',
                fontWeight: 'bold',
            },
            {
                src: 'http://localhost:3000/fonts/Niramit-Regular.ttf',
                fontWeight: 'normal',
            },
        ],
    });
};

export const registerTHNiramitFont = () => {
    if (typeof window !== 'undefined') {
        registerFontClientSide();
    }
};
