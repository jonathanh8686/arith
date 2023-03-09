import { generateQuestion } from '../../generators/oracle'
import { Difficulty } from "../../difficulty"
import { Question, QuestionData } from './Question'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';
import { QATiming, Statistics } from '../../statistics';
import FadeIn from 'react-fade-in/lib/FadeIn';

interface PropType {
    diff: Difficulty
    showResults: () => void,
    returnToTitle: () => void,
    restartGame: () => void,
    setStatistics: (statistics: Statistics) => void;
}

export const Game = (props: PropType) => {
    const [currQuestion, setCurrQuestion] = useState<QuestionData>(() => {
        return generateQuestion(props.diff)
    });
    const [guess, setGuess] = useState("");
    const [score, setScore] = useState(0);
    const [skips, setSkips] = useState(3);
    const [questionDisplayed, setQuestionDisplay] = useState(new Date().getTime());

    const [timings, setTimings] = useState<QATiming[]>([]);

    const totalSeconds = 30;

    const nextQuestion = () => {
        setCurrQuestion(generateQuestion(props.diff))
        setQuestionDisplay(new Date().getTime());
        setGuess("");
    }

    const nextQuestionCB = useCallback(nextQuestion, [props.diff])

    useEffect(() => {
        if (guess === currQuestion.answer.toString()) {
            setTimings(timings.concat([
                {
                    question: currQuestion,
                    delay: new Date().getTime() - questionDisplayed
                }]));
            nextQuestionCB();
            setScore(score + 1);
        }
    }, [guess, currQuestion, questionDisplayed, score, timings, nextQuestionCB])

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

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter" && skips > 0) {
            nextQuestion()
            setSkips(skips => skips - 1);
        }
        if (e.key === "Escape") {
            props.returnToTitle()
        }
        if (e.key === "r") {
            props.restartGame()
            e.preventDefault()
        }
    }

    return (
        <>
            <FadeIn>
                <div className={"transition duration-500 ease-in pointer-events-none absolute top-1 left-1 transform text-xs " + (score === 0 ? "opacity-100" : "opacity-0")}>
                    press "escape" to go back to home
                </div>

                <div className={"transition duration-500 ease-in pointer-events-none absolute top-1 right-1 transform text-xs " + (score === 0 ? "opacity-100" : "opacity-0")}>
                    or "r" to restart
                </div>
            </FadeIn>

            <div className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-massive text-cyan-600">
                {score}
            </div>
            <div className='flex flex-col items-center justify-center h-screen'>
                <Question key={score} {...currQuestion}></Question>
                <div>
                    <input autoFocus type="text" value={guess} className="border-2 border-black text-5xl px-5 py-2 w-96 h-24"
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyDown={(e) => { handleKeyPress(e) }}></input>
                    <div>
                        Skips remaining: {skips}
                        <span className={`px-5 text-xs transition duration-500 ${skips !== 3 ? "opacity-0" : "opacity-100"}`}>
                            <FadeIn>
                                Press ENTER to skip...
                            </FadeIn>
                        </span>
                    </div>
                </div>
            </div>
            <span style={{ transform: `translateX(${100 * ((seconds === 0 ? totalSeconds : (seconds - 1)) / (totalSeconds - 1)) - 100}%)` }}
                className={"transition duration-1000 ease-linear absolute " + (seconds >= totalSeconds / 2 ? "bg-green-400" : (seconds >= totalSeconds / 4 ? "bg-yellow-400" : "bg-red-400")) + " h-1 bottom-0 w-full"}>
            </span>
        </>
    )
}