import { Operation, QuestionData } from "../components/Core/Question";
import { Difficulty } from "../difficulty";
import { getRandWithNDigits, sampleSqrtGeo } from "./util";

export const generateAddition = (difficulty: Difficulty): QuestionData => {

    interface AdditionSettings {
        lengthParameter: number, // the number of digits is drawn from a binomial
        carryProbability: number // the probability that the question will require carries
        negativeProbability: number
    }

    let settings : AdditionSettings;
    if(difficulty === Difficulty.Easy) {
        settings = {
            lengthParameter: 0.7,
            carryProbability: 0.2,
            negativeProbability: 0.05
        }
    }
    else if(difficulty === Difficulty.Medium) {
        settings = {
            lengthParameter: 0.5,
            carryProbability: 0.4,
            negativeProbability: 0.15
        }
    }
    else if(difficulty === Difficulty.Hard) {
        settings = {
            lengthParameter: 0.4,
            carryProbability: 0.5,
            negativeProbability: 0.33
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
        if(Math.random() < settings.carryProbability) {
            op2_str = Math.floor((Math.random()*(10-(10-otherDigit))) + (10-otherDigit)).toString() + op2_str;
        }
        else {
            op2_str = Math.floor(Math.random()*(10-otherDigit)).toString() + op2_str;
        }
    }

    let op2 = +op2_str


    if(Math.random() < settings.negativeProbability) op1 *= -1
    if(Math.random() < settings.negativeProbability) op2 *= -1

    return {
        first: op1,
        second: op2,
        operation: Operation.Add,
        answer: op1 + op2
    }
}