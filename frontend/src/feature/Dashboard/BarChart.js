import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";


const data = [
    {
        name: "Khu vực 1",
        "Quý 1": 9209,
        "Quý 2": 6951,
        "Quý 3": 8342,
        "Quý 4": 6489,
    },
    {
        name: "Khu vực 2",
        "Quý 1": 9019,
        "Quý 2": 3157,
        "Quý 3": 8786,
        "Quý 4": 3352,
    },
    {
        name: "Khu vực 3",
        "Quý 1": 9860,
        "Quý 2": 5581,
        "Quý 3": 7272,
        "Quý 4": 4541,
    },
    {
        name: "Khu vực 4",
        "Quý 1": 6999,
        "Quý 2": 8900,
        "Quý 3": 6814,
        "Quý 4": 9212,
    },
    {
        name: "Khu vực 5",
        "Quý 1": 6732,
        "Quý 2": 5511,
        "Quý 3": 4517,
        "Quý 4": 3997,
    }
];

const toPercent = (decimal, fixed = 0) =>
    `${(decimal * 100).toFixed(2)}%`;

const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
};

const renderTooltipContent = (o) => {
    const { payload = [], label } = o;
    const total = payload.reduce(
        (result, entry) => result + entry.value,
        0
    );

    return (
        <div className="customized-tooltip-content" style={{ background: '#fff', padding: '10px' }}>
            <p className="total" style={{ padding: '0px' }}>{`${label} (Total: ${total})`}</p>
            <div className="list">
                {payload.map((entry, index) => (
                    <div key={`item-${index}`} style={{ color: `${entry.color}`, padding: " 5px 20px 5px 0px", listStyle: 'none' }}>
                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function App() {
    return (
        <BarChart
            width={750}
            height={400}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={renderTooltipContent}/>
            <Legend />
            <Bar dataKey="Quý 1" fill="#E14D2A" />
            <Bar dataKey="Quý 2" fill="#FD841F" />
            <Bar dataKey="Quý 3" fill="#3E6D9C" />
            <Bar dataKey="Quý 4" fill="#001253" />
        </BarChart>
    );
}
