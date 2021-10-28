import { Options, PythonShell } from "python-shell"
import { Rectangle } from "tesseract.js"
import { promisify } from "util"

const runPromise = promisify(PythonShell.run)

export const tableDetect = async (imgUrl: string): Promise<Rectangle[]> => {
    const options: Options = {
        mode: "json",
        pythonPath: "",
        pythonOptions: ["-u"],
        scriptPath: "",
        args: [imgUrl]
    }

    const rectangles = await runPromise("src/util/imageToSnack/tableDetect.py", options)

    if (rectangles === undefined)
        throw new Error()
    
    return rectangles;
}