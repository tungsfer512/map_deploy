import React, {  } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = [
    {
        name: "Tháng 1",
        "Tuần 1": 4000,
        "Tuần 2": 2400,
        "Tuần 3": 2400,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 2",
        "Tuần 1": 4000,
        "Tuần 2": 2400,
        "Tuần 3": 2400,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 3",
        "Tuần 1": 4000,
        "Tuần 2": 2400,
        "Tuần 3": 2400,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 4",
        "Tuần 1": 4000,
        "Tuần 2": 2400,
        "Tuần 3": 2400,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 5",
        "Tuần 1": 4000,
        "Tuần 2": 2400,
        "Tuần 3": 2400,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 6",
        "Tuần 1": 4000,
        "Tuần 2": 2400,
        "Tuần 3": 2400,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 7",
        "Tuần 1": 3000,
        "Tuần 2": 1398,
        "Tuần 3": 1398,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 8",
        "Tuần 1": 2000,
        "Tuần 2": 9800,
        "Tuần 3": 9800,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 9",
        "Tuần 1": 2780,
        "Tuần 2": 3908,
        "Tuần 3": 3908,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 10",
        "Tuần 1": 1890,
        "Tuần 2": 4800,
        "Tuần 3": 4800,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 11",
        "Tuần 1": 2390,
        "Tuần 2": 3800,
        "Tuần 3": 3800,
        "Tuần 4": 2784,
    },
    {
        name: "Tháng 12",
        "Tuần 1": 3490,
        "Tuần 2": 4300,
        "Tuần 3": 4300,
        "Tuần 4": 2784,
    }
];

export default class StackBarChart extends React.Component {
    render() {
        return (
            <BarChart
                width={1200}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Tuần 1" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Tuần 2" stackId="a" fill="#8884d8" />
                <Bar dataKey="Tuần 3" stackId="a" fill="red" />
                <Bar dataKey="Tuần 4" stackId="a" fill="black" />
            </BarChart>
        );
    }
}
