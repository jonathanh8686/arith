import { useEffect, useState } from "react";

export enum Operation {
    Add = 0,
    Subtract = 1,
    Multiply = 2,
    Divide = 3
}

export interface QuestionData {
    first: number,
    second: number,
    operation: Operation,
    answer: number
}

export const toReadableOperation = (o: Operation): string => {
    switch (o) {
        case Operation.Add:
            return "+";
        case Operation.Subtract:
            return "-";
        case Operation.Multiply:
            return "×";
        case Operation.Divide:
            return "÷";
    }
}

export const Question = (questionData: QuestionData) => {

    const [operationText, setOperationText] = useState("");

    useEffect(() => {
        setOperationText(toReadableOperation(questionData.operation))
    }, [questionData])
    return (
        <>
            <div className="flex text-8xl py-5">
                {`${questionData.first} ${operationText} ${questionData.second}`}
            </div>
        </>
    )
}