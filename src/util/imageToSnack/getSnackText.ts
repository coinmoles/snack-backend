import { ConfiguredRectangle } from "../interface/ConfiguredRectangle";
import { SnackText } from "../interface/SnackText";
import { ocrSnack } from "./ocrSnack";

export const getSnackText = async (imgUrl: string, configuredRectangles: ConfiguredRectangle[]): Promise<SnackText[]> =>  {
    const snackTexts: SnackText[] = []

    for (const configuredRectangle of configuredRectangles){
        snackTexts.push(await ocrSnack(imgUrl, 
            configuredRectangle.dateRectangle,
            configuredRectangle.snackRectangle));
    }

    return snackTexts
}