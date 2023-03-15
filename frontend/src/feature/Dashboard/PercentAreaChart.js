import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const data = [
    {
        name: "Tháng 1",
        "Khu vực 1": 1678,
        "Khu vực 2": 2297,
        "Khu vực 3": 1516,
        "Khu vực 4": 1500,
        "Khu vực 5": 1567,
    },
    {
        name: "Tháng 2",
        "Khu vực 1": 2892,
        "Khu vực 2": 1395,
        "Khu vực 3": 1586,
        "Khu vực 4": 1847,
        "Khu vực 5": 1771,
    },
    {
        name: "Tháng 3",
        "Khu vực 1": 2482,
        "Khu vực 2": 593,
        "Khu vực 3": 1417,
        "Khu vực 4": 2447,
        "Khu vực 5": 2900,
    },
    {
        name: "Tháng 4",
        "Khu vực 1": 662,
        "Khu vực 2": 508,
        "Khu vực 3": 1652,
        "Khu vực 4": 1097,
        "Khu vực 5": 2867,
    },
    {
        name: "Tháng 5",
        "Khu vực 1": 1843,
        "Khu vực 2": 2415,
        "Khu vực 3": 1055,
        "Khu vực 4": 2959,
        "Khu vực 5": 1225,
    },
    {
        name: "Tháng 6",
        "Khu vực 1": 1900,
        "Khu vực 2": 2454,
        "Khu vực 3": 2919,
        "Khu vực 4": 2759,
        "Khu vực 5": 1359,
    },
    {
        name: "Tháng 7",
        "Khu vực 1": 2714,
        "Khu vực 2": 2422,
        "Khu vực 3": 2762,
        "Khu vực 4": 1217,
        "Khu vực 5": 502,
    },
    {
        name: "Tháng 8",
        "Khu vực 1": 2396,
        "Khu vực 2": 2281,
        "Khu vực 3": 2422,
        "Khu vực 4": 2385,
        "Khu vực 5": 2649,
    },
    {
        name: "Tháng 9",
        "Khu vực 1": 2920,
        "Khu vực 2": 1920,
        "Khu vực 3": 1830,
        "Khu vực 4": 2429,
        "Khu vực 5": 1446,
    },
    {
        name: "Tháng 10",
        "Khu vực 1": 2382,
        "Khu vực 2": 1287,
        "Khu vực 3": 866,
        "Khu vực 4": 2195,
        "Khu vực 5": 1837,
    },
    {
        name: "Tháng 11",
        "Khu vực 1": 2727,
        "Khu vực 2": 2693,
        "Khu vực 3": 869,
        "Khu vực 4": 667,
        "Khu vực 5": 1184,
    },
    {
        name: "Tháng 12",
        "Khu vực 1": 1518,
        "Khu vực 2": 1265,
        "Khu vực 3": 1751,
        "Khu vực 4": 2163,
        "Khu vực 5": 2839,
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


export default function PercentAreaChart() {
    return (
        <AreaChart 
            width={1200}
            height={500}
            data={data}
            stackOffset="expand"
            margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 30
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" dy={15}/>
            <YAxis tickFormatter={toPercent} dx={-15}/>
            <Tooltip content={renderTooltipContent} />
            <Area
                type="monotone"
                dataKey="Khu vực 1"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                activeDot
            />
            <Area
                type="monotone"
                dataKey="Khu vực 2"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
                activeDot
            />
            <Area
                type="monotone"
                dataKey="Khu vực 3"
                stackId="1"
                stroke="orange"
                fill="orange"
                activeDot
            />
            <Area
                type="monotone"
                dataKey="Khu vực 4"
                stackId="1"
                stroke="red"
                fill="red"
                activeDot
            />
            <Area
                type="monotone"
                dataKey="Khu vực 5"
                stackId="1"
                stroke="blue"
                fill="blue"
                activeDot
            />
        </AreaChart>
    );
}
