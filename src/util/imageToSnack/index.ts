import { DateTime } from "luxon";
import { ConfiguredRectangle } from "../interface/ConfiguredRectangle";
import { configureRectangles } from "./configureRectangles";
import { extractYearAndMonth } from "./extractYearAndMonth";
import { getSnackData } from "./getSnackData";
import { getTitle } from "./getTitle";
import { tableDetect } from "./tableDetect";

export const snackImage = async (imgUrl: string): Promise<void> => {
    const rectangles = await tableDetect(imgUrl);
    const configuredRectangles: ConfiguredRectangle[] = configureRectangles(rectangles);
    const snackData = await getSnackData(imgUrl, configuredRectangles);
    const title = await getTitle(imgUrl);
    const { year, month } = extractYearAndMonth(title);

    let date = DateTime.fromObject({
        year,
        month,
        day: 1
    }).setLocale("ko-KR")
    while (![1, 2, 3, 4].includes(date.weekday)) {
        date = date.plus({ days: 1 })
    }
    for (const snack of snackData) {
        if (snack.dateText === '')
            continue
        if ([1, 2, 3].includes(date.weekday))
            date = date.plus({ days: 1 });
        else if (date.weekday === 4)
            date = date.plus({ days: 4 });
    }
}