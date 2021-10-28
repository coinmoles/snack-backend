import { DateTime } from "luxon";
import { SnackData } from "../interface/SnackData";
import { SnackText } from "../interface/SnackText";

export const postSnackData = async (snackTexts: SnackText[], year: number, month: number) => {
    let date = DateTime.fromObject({
        year,
        month,
        day: 1
    }).setLocale("ko-KR")
    while (![1, 2, 3, 4].includes(date.weekday)) {
        date = date.plus({ days: 1 })
    }
    for (const snackText of snackTexts) {
        if (snackText.dateText === '')
            continue
        if ([1, 2, 3].includes(date.weekday))
            date = date.plus({ days: 1 });
        else if (date.weekday === 4)
            date = date.plus({ days: 4 });

        const snackData: SnackData = {
            year: date.year,
            month: date.month,
            day: date.day,
            snack: snackText.snackText
        }
    }
}