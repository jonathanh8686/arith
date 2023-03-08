import { QuestionData, Operation } from "../components/Core/Question";
import { Difficulty } from "../difficulty";

export const generateDivision = (difficulty: Difficulty): QuestionData => {
      interface DivisionSettings {
        maxOperand: number
    }

    let settings: DivisionSettings
    if (difficulty === Difficulty.Easy) {
        settings = {
            maxOperand: 200
        }
    }
    else if (difficulty === Difficulty.Medium) {
        settings = {
            maxOperand: 1000
        }
    }
    else if (difficulty === Difficulty.Hard) {
        settings = {
            maxOperand: 10000
        }
    }
    else {
        throw new Error("Undefined Difficulty, could not define settings")
    }

    const op1 = Math.floor(Math.random() * settings.maxOperand);

    let divisors = []
    for(let i =1 ; i <= op1; i++) {
        if(op1 % i === 0)
            divisors.push(i);
    }

    if(divisors.length <= 4) {
        return generateDivision(difficulty);
    }

    const op2 = divisors[Math.floor((Math.random()) * divisors.length - 1) + 1];

    return {
        first: op1,
        second: op2,
        operation: Operation.Divide,
        answer: op1/op2
    }
}