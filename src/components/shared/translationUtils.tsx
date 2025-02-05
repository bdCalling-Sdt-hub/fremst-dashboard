import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const translateEndpoint = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

export const translateText = async (text: string, targetLang: string): Promise<string> => {
    try {
        const response = await axios.post(translateEndpoint, {
            q: text,
            target: targetLang,
        });
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        return text; 
    }
};