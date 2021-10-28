import { Rectangle } from "tesseract.js";
import { ConfiguredRectangle } from "../interface/ConfiguredRectangle";

const compareHugeDiff = (num1: number, num2: number): 1 | 0 | -1 => {
    if (num1 - num2 < 10 && num2 - num1 < 10)
        return 0
    else if (num1 < num2)
        return -1
    else
        return 1
}

const compareRect = (rect1: Rectangle, rect2: Rectangle): 1 | 0 | -1 => {
    if (compareHugeDiff(rect1.top, rect2.top) === -1)
        return -1
    else if (compareHugeDiff(rect1.top, rect2.top) === 1)
        return 1
    else if (compareHugeDiff(rect1.left, rect2.left) === -1)
        return -1
    else if (compareHugeDiff(rect1.left, rect2.left) === 1)
        return 1
    else
        return 0
}

export const configureRectangles = (rectangles: Rectangle[]): ConfiguredRectangle[] => {
    const dateRectangles = rectangles.filter(rectangle => 20 < rectangle.height && rectangle.height < 60)
        .sort(compareRect);
    const snackRectangles = rectangles.filter(rectangle => 160 > rectangle.height && rectangle.height > 80)
        .sort(compareRect);
    const configuredRectangles: ConfiguredRectangle[] = []
    
    for (let i = 0; i < dateRectangles.length; i++) {
        configuredRectangles.push({
            dateRectangle: dateRectangles[i],
            snackRectangle: snackRectangles[i]
        })
    }

    return configuredRectangles;
}