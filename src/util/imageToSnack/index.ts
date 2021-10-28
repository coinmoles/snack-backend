import { DateTime } from "luxon";
import { ConfiguredRectangle } from "../interface/ConfiguredRectangle";
import { configureRectangles } from "./configureRectangles";
import { extractYearAndMonth } from "./extractYearAndMonth";
import { getSnackText } from "./getSnackText";
import { getTitle } from "./getTitle";
import { tableDetect } from "./tableDetect";

export const snackImage = async (imgUrl: string): Promise<void> => {
    const rectangles = await tableDetect(imgUrl);
    const configuredRectangles: ConfiguredRectangle[] = configureRectangles(rectangles);
    const snackTexts = await getSnackText(imgUrl, configuredRectangles);
    const title = await getTitle(imgUrl);
    const { year, month } = extractYearAndMonth(title);

    
}