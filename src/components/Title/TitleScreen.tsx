import FadeIn from "react-fade-in/lib/FadeIn"
import { Difficulty } from "../../difficulty"

interface PropType {
    diff: Difficulty
    setDiff: (newDiff: Difficulty) => void
    startGame: () => void
}

export const TitleScreen = (props: PropType) => {
    const inactiveDifficultyColor = "bg-grey-200"
    const easyDifficultyStyle = "bg-green-300"
    const mediumDifficultyStyle = "bg-yellow-200"
    const hardDifficultyStye = "bg-red-200"

    const sharedButtonStyle = "w-60 transition duration-300"

    return (
        <>
            <div className="text-center p-5">
                <FadeIn>
                    <p className="text-5xl">arith 🧮</p>
                </FadeIn>
                <div className="text-center grid p-5 gap-4 place-items-center">
                    <FadeIn delay={120}>
                        <button className={sharedButtonStyle + " ring-green-100 ring-4 rounded-md " + (props.diff === Difficulty.Easy ? easyDifficultyStyle : inactiveDifficultyColor)}
                            onClick={() => { props.setDiff(Difficulty.Easy) }}>
                            easy 🥳
                        </button>
                    </FadeIn>
                    <FadeIn delay={240}>
                        <button className={sharedButtonStyle + " ring-yellow-100 ring-4 rounded-md " + (props.diff === Difficulty.Medium ? mediumDifficultyStyle : inactiveDifficultyColor)}
                            onClick={() => { props.setDiff(Difficulty.Medium) }}>
                            medium 🤓
                        </button>

                    </FadeIn>
                    <FadeIn delay={360}>
                        <button className={sharedButtonStyle + " ring-red-100 ring-4 rounded-md " + (props.diff === Difficulty.Hard ? hardDifficultyStye : inactiveDifficultyColor)}
                            onClick={() => { props.setDiff(Difficulty.Hard) }}>
                            hard 😵‍💫
                        </button>
                    </FadeIn>
                </div>

                <FadeIn delay={450}>
                    <button className="transition duration-300 ring-blue-300 ring-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full w-40"
                        onClick={() => { props.startGame() }}>
                        play
                    </button>

                </FadeIn>
            </div>
        </>
    )
}