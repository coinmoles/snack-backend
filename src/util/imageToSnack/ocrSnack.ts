import { Rectangle } from "tesseract.js";
import { SnackText } from "../interface/SnackText";
import { ocr } from "./ocr";

export const ocrSnack = async (imgUrl: string, dateRectangle: Rectangle, snackRectangle: Rectangle): Promise<SnackText> => {
    const dateText = await ocr(imgUrl, dateRectangle);
    const snackText = await ocr(imgUrl, snackRectangle);

    return {
        dateText,
        snackText
    };
}