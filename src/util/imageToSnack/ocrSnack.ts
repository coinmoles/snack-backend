import { Rectangle } from "tesseract.js";
import { SnackData } from "../interface/SnackData";
import { ocr } from "./ocr";

export const ocrSnack = async (imgUrl: string, dateRectangle: Rectangle, snackRectangle: Rectangle): Promise<SnackData> => {
    const dateText = await ocr(imgUrl, dateRectangle);
    const snackText = await ocr(imgUrl, snackRectangle);

    return {
        dateText,
        snackText
    };
}