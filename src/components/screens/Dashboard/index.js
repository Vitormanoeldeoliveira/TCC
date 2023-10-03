import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../../ourComponents/Navbar';

import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'; 

import { GET_PLANTATIONS, GET_PROFIT } from '../../requires/api.require';
import { useQuery } from '@apollo/client';
import { autoDecodeToken } from '../Login/token/decodeToken';

import loadingGif from '../../../Images/loading.gif'

import plantinha from '../../../Images/plantinha.png'

const BarChartComponent = () => {
    const decodedToken = autoDecodeToken();

    const {data, loading, refetch} = useQuery(GET_PLANTATIONS, {
        variables: {
          filters: {
            id_usuario: decodedToken.id,
            excluido: false
          }
        }
    })

    const [ userData, setUserData ] = useState({
        labels: "",
        datasets: []
    })

    useEffect(() => {
        if(!loading) {
            setUserData({
                labels: data?.getAllPlantations.map((data) => data.descricao),
                // labels: ["Plantação"],
                datasets: [{
                    label: "Lucro Geral",
                    data: data?.getAllPlantations.map((data) => data.id),
                    // data: ["data"],
                    borderColor: "black",
                    backgroundColor: ["#5b8675", "#da9075"]
                }],
            })
        }
    },[loading])
 
    return (
        <>
            <Navbar />
            {
                data?.getAllPlantations?.length === 0 ? 
                (
                    <>
                        Sem dados
                    </>
                ) :
                (
                    <>
                        {!loading ? 
                            (
                                
                                <Grid container spacing={0}  direction="row" justifyContent="center" alignItems="center" >
                                    <Grid
                                        item xs={12} container
                                        justifyContent="center" alignItems="center"
                                        sx={{
                                            mt: "4em",
                                            textAlign: "center",
                                            height: "9em",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "90%",
                                                height: "100%",
                                                borderRadius: "15px",
                                                bgcolor: "#5b8675",
                                                display: 'inline-flex'
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        textAlign: "left",
                                                        pl: "1em",
                                                        pt: "0.8em",
                                                        color: "snow",
                                                        fontSize: "2.3em",
                                                        fontFamily: 'FontePersonalizada',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    Seja bem vindo, { decodedToken.nome }
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        textAlign: "left",
                                                        pl: "3em",
                                                        color: "#9ebfaa",
                                                        fontSize: "1.5em",
                                                        fontFamily: 'FontePersonalizada',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    Acompanhe seu progresso aqui
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    ml: "auto",
                                                    mt: "1em",
                                                    mr: "4em",
                                                    textAlign: "center",
                                                    // bgcolor: "yellow"
                                                }}
                                            >
                                                <img src={plantinha} width="100em" />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item xs={10}
                                        container spacing={0}
                                        justifyContent="space-around"
                                        alignItems="stretch"
                                        sx={{
                                            height: "auto",
                                            minHeight: "25em",
                                            mt: "1.5em"
                                        }}
                                    >
                                        <Grid 
                                            item xs={12} sm={6} 
                                            sx={{ 
                                                textAlign: "center",
                                                bgcolor: "#c7d7cd", borderRadius: "15px", height: "auto",
                                                minHeight: "22em",
                                            }} 
                                                // container spacing={0} direction="row" 
                                                // justifyContent="center"
                                        >
                                            <Typography
                                                    sx={{
                                                        textAlign: "left",
                                                        mr: "auto",
                                                        fontSize: "2em",
                                                        fontFamily: 'FontePersonalizada',
                                                        fontWeight: 900
                                                    }}
                                                >
                                                    Plantações
                                            </Typography>
                                            <Box
                                                sx={{
                                                    maxHeight: "20em"
                                                }}
                                            >
                                                <Bar 
                                                    data={userData}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid 
                                            item xs={12} sm={5} 
                                            sx={{ 
                                                textAlign: "center", alignItems: "center", minHeight: "22em",
                                                bgcolor: "#c7d7cd", borderRadius: "15px", height: "auto",
                                            }} 
                                            container 
                                            // spacing={0} direction="row" 
                                            justifyContent="center" 
                                        >
                                            <Typography
                                                sx={{
                                                    textAlign: "left",
                                                    mr: "auto",
                                                    fontSize: "2em",
                                                    fontFamily: 'FontePersonalizada',
                                                    fontWeight: 900
                                                }}
                                            >
                                                    Toma no cu Breno
                                            </Typography>
                                            <Box
                                                sx={{
                                                    maxHeight: "20em"
                                                }}
                                            >
                                                <Pie
                                                    data={userData}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container direction="column" justifyContent="center" alignItems="center">
                                    <Grid item xs={6} >
                                        <img src={loadingGif} height="300em" />
                                    </Grid>
                                </Grid>
                            )
                        }
                    </>
                )
            }
            
        </>
    );
}


export default BarChartComponent;