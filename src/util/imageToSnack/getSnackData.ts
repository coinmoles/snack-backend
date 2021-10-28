import { ConfiguredRectangle } from "../interface/ConfiguredRectangle";
import { SnackData } from "../interface/SnackData";
import { ocrSnack } from "./ocrSnack";

export const getSnackData = async (imgUrl: string, configuredRectangles: ConfiguredRectangle[]): Promise<SnackData[]> =>  {
    const snackData: SnackData[] = []

    for (const configuredRectangle of configuredRectangles){
        snackData.push(await ocrSnack(imgUrl, 
            configuredRectangle.dateRectangle,
            configuredRectangle.snackRectangle));
    }

    return snackData
}