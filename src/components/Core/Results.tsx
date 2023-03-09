import { Statistics } from "../../statistics"
import { AbilityRadar } from "./AbilityRadar";
import { TimingDisplay } from "./TimingDisplay";

interface PropType {
    stats: Statistics
    startGame: () => void;
    showTitle: () => void;
}

export const Results = (props: PropType) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-7xl p-8">
                    {"Score: " + props.stats.score}
                </div>

                <TimingDisplay timings={props.stats.story}></TimingDisplay>

                <AbilityRadar></AbilityRadar>

                <div className="inline-flex my-10 border-2 border-gray-500 rounded-lg">
                    <button className="bg-cyan-300 hover:bg-blue-100 text-gray-800 font-bold py-2 px-4 rounded-l"
                        onClick={() => {props.showTitle()}}>
                        Return to Home
                    </button>
                    <button className="bg-cyan-500 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-r"
                        onClick={() => {props.startGame()}}>
                        Play Again
                    </button>
                </div>
            </div>
        </>
    )
}