import { Grid } from '@mui/material';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Navbar } from '../../ourComponents/Navbar';


const data = [
{ name: 'Janeiro', vendas: 4000 },
{ name: 'Fevereiro', vendas: 3000 },
{ name: 'Março', vendas: 2000 },
{ name: 'Abril', vendas: 2780 },
{ name: 'Maio', vendas: 1890 },
{ name: 'Junho', vendas: 2390 },
{ name: 'Julho', vendas: 3490 },
{ name: 'Agosto', vendas: 3000 },
{ name: 'Setembro', vendas: 2000 },
{ name: 'Outubro', vendas: 2780 },
{ name: 'Novembro', vendas: 1890 },
{ name: 'Dezembro', vendas: 2390 },
];


const BarChartComponent = () => {
    return (
        <>
            <Navbar />
            <Grid container spacing={2}  direction="row" justifyContent="center" alignItems="center" >
                <Grid item xs={12} sx={{ textAlign: "center", mt: "3em" }} >
                    <BarChart width={900} height={600} data={data} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="vendas" fill="#8884d8" />
                    </BarChart>
                </Grid>
            </Grid>
        </>
    );
}


export default BarChartComponent;