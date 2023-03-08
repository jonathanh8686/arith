import { Operation, QuestionData } from "../components/Core/Question";
import { Difficulty } from "../difficulty";
import { getRandWithNDigits } from "./util";


export const generateMultiplication = (difficulty: Difficulty): QuestionData => {
    interface MultiplicationSettings {
        op1MaxLength: number
        op2MaxLength: number
        forcedEasyProbability: number
    }

    let settings: MultiplicationSettings
    if (difficulty === Difficulty.Easy) {
        settings = {
            op1MaxLength: 2,
            op2MaxLength: 1,
            forcedEasyProbability: 0.5
        }
    }
    else if (difficulty === Difficulty.Medium) {
        settings = {
            op1MaxLength: 2,
            op2MaxLength: 2,
            forcedEasyProbability: 0.2
        }
    }
    else if (difficulty === Difficulty.Hard) {
        settings = {
            op1MaxLength: 3,
            op2MaxLength: 3,
            forcedEasyProbability: 0.1
        }
    }
    else {
        throw new Error("Undefined Difficulty, could not define settings")
    }


    let op1: number, op2: number
    if (Math.random() < settings.forcedEasyProbability) {
        op1 = Math.ceil(Math.random() * 15);
        op2 = Math.ceil(Math.random() * 15);
    }
    else {
        op1 = getRandWithNDigits(Math.floor(Math.random() * settings.op1MaxLength + 1));
        op2 = getRandWithNDigits(Math.floor(Math.random() * settings.op2MaxLength + 1));
    }

    return {
        first: op1,
        second: op2,
        operation: Operation.Multiply,
        answer: op1 * op2
    }
}

