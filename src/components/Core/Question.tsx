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

export const Question = (questionData: QuestionData) => {

    const [operationText, setOperationText] = useState("");

    useEffect(() => {
        switch (questionData.operation) {
            case Operation.Add:
                setOperationText("+");
                break;
            case Operation.Subtract:
                setOperationText("-");
                break;
            case Operation.Multiply:
                setOperationText("×");
                break;
            case Operation.Divide:
                setOperationText("÷");
                break;
        }
    }, [questionData])
    return (
        <>
            <div className="flex text-8xl py-5">
                {`${questionData.first} ${operationText} ${questionData.second}`}
            </div>
        </>
    )
}