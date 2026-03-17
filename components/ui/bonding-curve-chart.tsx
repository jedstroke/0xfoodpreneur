"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { slots: 0, price: 150000, label: "Early Bird" },
    { slots: 20, price: 150000, label: "Early Bird" },
    { slots: 21, price: 175000, label: "Tier 2" },
    { slots: 50, price: 175000, label: "Tier 2" },
    { slots: 51, price: 250000, label: "Standard" },
    { slots: 100, price: 250000, label: "Standard" },
    { slots: 101, price: 350000, label: "Late Entry" },
    { slots: 150, price: 500000, label: "Final" },
]

export function BondingCurveChart() {
    return (
        <div className="w-full h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="slots"
                        stroke="#525252"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#525252"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₦${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#171717", border: "1px solid #262626", borderRadius: "8px" }}
                        itemStyle={{ color: "#fff" }}
                        formatter={(value: number) => [`₦${value.toLocaleString()}`, "Price"]}
                    />
                    <Area
                        type="stepAfter"
                        dataKey="price"
                        stroke="var(--primary)"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
