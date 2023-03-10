import { QATiming } from "../../statistics"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { toReadableOperation } from "./Question";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "Seconds spent on each question"

        },
        tooltip: {
            callbacks: {
                label: (context: any) => {
                    return context.parsed.y + " seconds";
                }
            }
        }
    },
    scales: {
        y: {
            ticks: {
                callback: (value: any, index: number, ticks: any) => {
                    return value.toString() + 's'
                }

            }

        },
        x: {

        }

    }
};

interface PropType {
    timings: QATiming[]
}

export const TimingDisplay = (props: PropType) => {

    let labels = props.timings.map((qatime) => {
        let q = qatime.question;
        return `${q.first.toString()} ${toReadableOperation(q.operation)} ${q.second.toString()}`;
    })


    const data = {
        labels: labels,
        datasets: [
            {
                data: props.timings.map((timing, index) => { return { x: index, y: timing.delay / 1000 } }),
                backgroundColor: props.timings.map((timing) => {
                    return `rgba(${Math.pow(timing.delay, 1) / 10}, 150, 180, 0.7)`
                }),
                borderWidth: 2,
                borderRadius: 9,
                borderSkipped: false,
            },
        ],
    };

    return (
        <>
            <div className="w-2/3">
                <Bar options={options} data={data} />
            </div>
        </>
    )
}