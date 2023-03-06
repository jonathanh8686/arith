import { Difficulty } from "../../difficulty"

interface PropType {
    diff: Difficulty
    setDiff: (newDiff: Difficulty) => void
}

export const TitleScreen = (props: PropType) => {
    const inactiveDifficultyColor = "bg-grey-200"
    const easyDifficultyStyle = "bg-green-300"
    const mediumDifficultyStyle = "bg-yellow-200"
    const hardDifficultyStye = "bg-red-200"

    const sharedButtonStyle = "w-60"

    return (
        <>
            <p className="text-5xl">arith</p>
            <div className="text-center grid p-5 gap-4 place-items-center">
                <div>
                <button className= {sharedButtonStyle + " ring-green-100 ring-4 rounded-md " + (props.diff === Difficulty.Easy ? easyDifficultyStyle : inactiveDifficultyColor)}
                    onClick={() => { props.setDiff(Difficulty.Easy) }}>
                    Easy
                </button>
                </div>
                <div>
                <button className={sharedButtonStyle + " ring-yellow-100 ring-4 rounded-md " + (props.diff === Difficulty.Medium ? mediumDifficultyStyle : inactiveDifficultyColor)}
                    onClick={() => { props.setDiff(Difficulty.Medium) }}>
                    Medium
                </button>

                </div>
                <div>
                <button className={sharedButtonStyle + " ring-red-100 ring-4 rounded-md " + (props.diff === Difficulty.Hard ? hardDifficultyStye : inactiveDifficultyColor)}
                    onClick={() => { props.setDiff(Difficulty.Hard) }}>
                    Hard
                </button>

                </div>
            </div>

            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Start
            </button>

        </>
    )
}