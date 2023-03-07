import { generateQuestion } from '../../oracle'
import { Difficulty } from "../../difficulty"
import { Question } from './Question'
import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';
import { QATiming, Statistics } from '../../statistics';

interface PropType {
    diff: Difficulty
    showResults: () => void,
    setStatistics: (statistics: Statistics) => void;
}

export const Game = (props: PropType) => {
    const [currQuestion, setCurrQuestion] = useState(generateQuestion(props.diff));
    const [guess, setGuess] = useState("");
    const [score, setScore] = useState(0);
    const [questionDisplayed, setQuestionDisplay] = useState(new Date().getTime());

    const [timings, setTimings] = useState<QATiming[]>([]);

    const totalSeconds = 30;

    const nextQuestion = () => {
        setCurrQuestion(generateQuestion(props.diff))
    }

    useEffect(() => {
        if (guess === currQuestion.answer.toString()) {
            setTimings(timings.concat([
                {
                    question: currQuestion,
                    delay: new Date().getTime() - questionDisplayed
                }]));

            setQuestionDisplay(new Date().getTime());

            nextQuestion();
            setGuess("");
            setScore(score + 1);
        }
    }, [guess])

    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + totalSeconds)

    const {
        seconds
    } = useTimer({
        expiryTimestamp: currentTime, onExpire: () => {
            props.setStatistics({
                story: timings,
                score: score
            })
            props.showResults();
        }
    });

    return (
        <>
            <div className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-massive text-cyan-600">
                {score}
            </div>
            <div className='flex flex-col items-center justify-center h-screen'>
                <Question key={score} {...currQuestion}></Question>
                <div>
                    <input type="text" value={guess} className="border-2 border-black text-5xl px-5 py-2 w-96 h-24"
                        onChange={(e) => setGuess(e.target.value)}></input>
                </div>
            </div>
            <span  style={{transform: `translateX(${100*((seconds==0?totalSeconds:(seconds-1))/(totalSeconds-1)) - 100}%)`}}
                className={"transition duration-1000 ease-linear absolute " + (seconds >= totalSeconds/2 ? "bg-green-400": (seconds >= totalSeconds/ 4? "bg-yellow-400" : "bg-red-400")) + " h-1 bottom-0 w-full"}>
            </span>
        </>
    )

}