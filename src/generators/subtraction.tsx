import { Operation, QuestionData } from "../components/Core/Question";
import { Difficulty } from "../difficulty";
import { getRandWithNDigits, sampleSqrtGeo } from "./util";

export const generateSubtraction = (difficulty: Difficulty): QuestionData => {

    interface SubtractionSettings {
        lengthParameter: number, // the number of digits is drawn from a binomial
        borrowProbability: number // the probability that the question will require carries
        negativeProbability: number
    }

    let settings : SubtractionSettings;
    if(difficulty === Difficulty.Easy) {
        settings = {
            lengthParameter: 0.8,
            borrowProbability: 0.2,
            negativeProbability: 0.05
        }
    }
    else if(difficulty === Difficulty.Medium) {
        settings = {
            lengthParameter: 0.5,
            borrowProbability: 0.4,
            negativeProbability: 0.1
        }
    }
    else if(difficulty === Difficulty.Hard) {
        settings = {
            lengthParameter: 0.4,
            borrowProbability: 0.5,
            negativeProbability: 0.1
        }
    }
    else {
        throw new Error("Invalid difficulty, settings not assigned");
    }


    let op1 = getRandWithNDigits(sampleSqrtGeo(settings.lengthParameter))
    const op1_str = op1.toString()

    const secondLength = sampleSqrtGeo(settings.lengthParameter)
    let op2_str = "";
    for (let i = 0; i < secondLength; i++) {
        if(i >= op1_str.length) {
            op2_str = Math.floor(Math.random()*10).toString() + op2_str;
            continue
        }

        const otherDigit = +op1_str.charAt(op1_str.length - i - 1)
        if(Math.random() < settings.borrowProbability) {
            op2_str = (Math.floor((Math.random()*(10-otherDigit))) + otherDigit).toString() + op2_str;
        }
        else {
            op2_str = (Math.floor((Math.random()*otherDigit))).toString() + op2_str;
        }
    }

    let op2 = +op2_str
    if(Math.random() < settings.negativeProbability) op1 *= -1

    return {
        first: op1,
        second: op2,
        operation: Operation.Subtract,
        answer: op1 - op2
    }
}
