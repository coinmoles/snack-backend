import { DateTime } from "luxon";
import { dbCreate } from "../dbRelated/SnackRepo";
import { SnackData } from "../interface/SnackData";
import { SnackText } from "../interface/SnackText";

export const postSnackData = async (snackTexts: SnackText[], year: number, month: number): Promise<void> => {
    let date = DateTime.fromObject({
        year,
        month,
        day: 1
    }).setLocale("ko-KR")
    while (![1, 2, 3, 4].includes(date.weekday)) {
        date = date.plus({ days: 1 })
    }

    for (const snackText of snackTexts) {
        const snackData: SnackData = {
            year: date.year,
            month: date.month,
            day: date.day,
            snack: snackText.snackText.replace(/ /g, "")
        }
        
        if (!/^[\s,\\/]*$/g.test(snackData.snack)){
            dbCreate(snackData);
            await new Promise(f => setTimeout(f, 1000));
        }

        if (snackText.dateText !== '') {
            if ([1, 2, 3].includes(date.weekday))
                date = date.plus({ days: 1 });
            else if (date.weekday === 4)
                date = date.plus({ days: 4 });
        }
    }   
}