import { QuestionData, Operation } from "../components/Core/Question"
import { Difficulty } from "../difficulty";
import { generateAddition } from "./addition";
import { generateDivision } from "./division";
import { generateMultiplication } from "./multiplication";
import { generateSubtraction } from "./subtraction";

export const generateQuestion = (difficulty: Difficulty): QuestionData => {
    let selectedOperation: Operation = Math.floor(Math.random() * 4)
    switch (selectedOperation) {
        case Operation.Add:
            return generateAddition(difficulty);
        case Operation.Subtract:
            return generateSubtraction(difficulty);
        case Operation.Multiply:
            return generateMultiplication(difficulty);
        case Operation.Divide:
            return generateDivision(difficulty);
    }
}