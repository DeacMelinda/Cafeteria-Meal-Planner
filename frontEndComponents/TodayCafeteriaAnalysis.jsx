import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie } from 'recharts';
import { useAuth } from "./Auth";
import { useState } from "react";
import "../TodayCafeteria.css";

export const TodayCafeteriaAnalysis = () => {

    const auth = useAuth();
    const [ barChart, setBarChart ] = useState(true);

    const menuItems = auth.user.todayMenu ?  auth.user.todayMenu.menuItems : [];

    const getDataBar = () => {
        let dataArray = [];
        for(let i = 0; i < menuItems.length; i++) {
            dataArray.push({"name": menuItems[i].menuItem,
                            "orders": menuItems[i].orders})
        }
        return dataArray;
    }

    const dataBar = getDataBar();

    const getDataPie = () => {
        let dataArray = [];
        for(let i = 0; i < menuItems.length; i++) {
            dataArray.push({"name": menuItems[i].menuItem,
                            "value": menuItems[i].orders})
        }
        return dataArray;
    }

    const dataPie = getDataPie();

    return (
        auth.user.todayMenu && <div className="analysisCard">
        <button type="button" onClick={(e) => setBarChart(true)}>Bar Chart</button>
        <button type="button" onClick={(e) => setBarChart(false)}>Pie Chart</button>
        
        {
            barChart && 
            
            <div className="chartsDiv">
                <br/>
                <br/>
                <br/>

                <BarChart
                width={700}
                height={300}
                data={dataBar}
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
            </div>
        }

        {
            !barChart &&
            <div className="chartsDiv">
                <PieChart position="relative" width={500} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={dataPie}
                        cx={200}
                        cy={200}
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </div>
        }
        </div>
)
}
