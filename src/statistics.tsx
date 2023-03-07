import { QuestionData } from "./components/Core/Question";

export interface Statistics {
    story: QATiming[]
    score: number
}

export interface QATiming {
    question: QuestionData
    delay: number
}