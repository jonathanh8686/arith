import { QuestionData, Operation } from "./components/Core/Question"
import { Difficulty } from "./difficulty";


const solve = (first: number, second: number, op: Operation): number => {
    switch (op) {
        case Operation.Add:
            return first + second;
        case Operation.Subtract:
            return first - second;
        case Operation.Multiply:
            return first * second;
        case Operation.Divide:
            return first / second;
        default:
            throw new Error("Undefined operation in solve")
    }
}

const generateAddition = (difficulty: Difficulty): QuestionData => {
    let lowerBound, upperBound;
    if (difficulty === Difficulty.Easy) {
        lowerBound = 0
        upperBound = 20
    }
    else if (difficulty === Difficulty.Medium) {
        lowerBound = 0
        upperBound = 100
    }
    else if (difficulty === Difficulty.Hard) {
        lowerBound = -1000
        upperBound = 10000
    }

    if (lowerBound === undefined || upperBound === undefined) {
        throw new Error("Undefined Difficulty, could not find lower/upper bound settings");
    }
    const first = Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
    const second = Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
    return {
        first: first,
        second: second,
        operation: Operation.Add,
        answer: solve(first, second, Operation.Add)
    }
}

const generateSubtraction = (difficulty: Difficulty): QuestionData => {
    let firstUpper, firstLower;
    let secondUpper, secondLower;

    let flippedProbability;

    if (difficulty === Difficulty.Easy) {
        firstUpper = 0
        firstLower = 50

        secondUpper = 0
        secondLower = 20

        flippedProbability = 0
    }
    else if (difficulty === Difficulty.Medium) {
        firstUpper = 0
        firstLower = 100

        secondUpper = 0
        secondLower = 100

        flippedProbability = 0.25
    }
    else if (difficulty === Difficulty.Hard) {
        firstUpper = -1000
        firstLower = 10000

        secondUpper = -1000
        secondLower = 10000

        flippedProbability = 0.5
    }

    if (firstUpper === undefined || firstLower === undefined || secondUpper === undefined || secondLower === undefined || flippedProbability === undefined) {
        throw new Error("Undefined Difficulty, could not find lower/upper bound settings");
    }

    const first = Math.floor(Math.random() * (firstUpper - firstLower)) + firstLower
    const second = Math.floor(Math.random() * (secondUpper - secondLower)) + secondLower

    const isFlipped = Math.random() < flippedProbability;

    const op1 = isFlipped ? Math.min(first, second) : Math.max(first, second)
    const op2 = isFlipped ? Math.max(first, second) : Math.min(first, second)

    return {
        first: op1,
        second:op2,
        operation: Operation.Subtract,
        answer: solve(op1, op2, Operation.Subtract)
    }
}

const generateMultiplication = (difficulty: Difficulty): QuestionData => {
    let lowerBound, upperBound;
    if (difficulty === Difficulty.Easy) {
        lowerBound = 0
        upperBound = 15
    }
    else if (difficulty === Difficulty.Medium) {
        lowerBound = -10
        upperBound = 20
    }
    else if (difficulty === Difficulty.Hard) {
        lowerBound = -100
        upperBound = 1000
    }

    if (lowerBound === undefined || upperBound === undefined) {
        throw new Error("Undefined Difficulty, could not find lower/upper bound settings");
    }
    const first = Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
    const second = Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
    return {
        first: first,
        second: second,
        operation: Operation.Multiply,
        answer: solve(first, second, Operation.Multiply)
    }
}

const generateDivision = (difficulty: Difficulty): QuestionData => {
    let firstUpper, firstLower;
    let answerUpper, answerLower;

    if (difficulty === Difficulty.Easy) {
        firstUpper = 0
        firstLower = 50

        answerUpper = 1
        answerLower = 10
    }
    else if (difficulty === Difficulty.Medium) {
        firstUpper = 0
        firstLower = 100

        answerUpper = 1
        answerLower = 10
    }
    else if (difficulty === Difficulty.Hard) {
        firstUpper = -1000
        firstLower = 10000

        answerUpper = 1
        answerLower = 10
    }

    if (firstUpper === undefined || firstLower === undefined || answerUpper === undefined || answerLower === undefined)
        throw new Error("Undefined Difficulty, could not find lower/upper bound settings");

    let first = Math.floor(Math.random() * (firstUpper - firstLower)) + firstLower
    let answer = Math.floor(Math.random() * (answerUpper - answerLower)) + answerLower

    // make sure answer or first is never 0
    while(answer === 0) answer = Math.floor(Math.random() * (answerUpper - answerLower)) + answerLower
    while(first === 0) first = Math.floor(Math.random() * (answerUpper - answerLower)) + answerLower

    return {
        first: first * answer,
        second: first,
        operation: Operation.Divide,
        answer: answer
    }
}


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