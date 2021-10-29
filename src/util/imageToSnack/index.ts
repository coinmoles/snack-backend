import { DateTime } from "luxon";
import { ConfiguredRectangle } from "../interface/ConfiguredRectangle";
import { configureRectangles } from "./configureRectangles";
import { extractYearAndMonth } from "./extractYearAndMonth";
import { getSnackText } from "./getSnackText";
import { getTitle } from "./getTitle";
import { postSnackData } from "./postSnackData";
import { tableDetect } from "./tableDetect";

export const imageToSnack = async (imgUrl: string): Promise<void> => {
    const title = await getTitle(imgUrl);
    const { year, month } = extractYearAndMonth(title);

    const rectangles = await tableDetect(imgUrl);
    const configuredRectangles: ConfiguredRectangle[] = configureRectangles(rectangles);
    const snackTexts = await getSnackText(imgUrl, configuredRectangles);
    
    postSnackData(snackTexts, year, month);    
}