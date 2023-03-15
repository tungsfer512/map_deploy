import React from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Line,
    LineChart,
    Legend
} from "recharts";

const data = [
    {
        name: "Khu vực 1",
        "Khối lượng": 30991,
        "Số thùng": 51
    },
    {
        name: "Khu vực 2",
        "Khối lượng": 24314,
        "Số thùng": 120
    },
    {
        name: "Khu vực 3",
        "Khối lượng": 27254,
        "Số thùng": 83
    },
    {
        name: "Khu vực 4",
        "Khối lượng": 31925,
        "Số thùng": 75
    },
    {
        name: "Khu vực 5",
        "Khối lượng": 20757,
        "Số thùng": 103
    }
];

export default function MyLineChart() {
    return (
        <LineChart width={1200} height={550} data={data} 
            margin={{ top: 50, right: 20, left: 10, bottom: 10 }}>
            <XAxis dataKey="name" dy={10} />
            <YAxis yAxisId={'left'} dx={-15} orientation={'left'} label={{ value: 'Khối lượng rác (kg)', angle: 0, position: 'insideTopLeft', dy: -35 }} />
            <YAxis yAxisId={'right'} dx={15} orientation={"right"} label={{ value: 'Số lượng thùng rác đã đổ', angle: 0, position: 'insideTopRight', dy: -35 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line yAxisId={'left'} type="monotone" dataKey="Khối lượng" stroke="#8884d8" fillOpacity={1} fill="url(#colorKL)" label />
            <Line yAxisId={'right'} type="monotone" dataKey="Số thùng" stroke="#82ca9d" fillOpacity={1} fill="url(#colorST)" label />
        </LineChart>
    );
}
