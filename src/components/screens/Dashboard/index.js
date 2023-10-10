import { Box, Grid, InputAdornment, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../../ourComponents/Navbar';

import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'; 

import { GET_PLANTATIONS, GET_PROFIT } from '../../requires/api.require';
import { useQuery } from '@apollo/client';
import { autoDecodeToken } from '../Login/token/decodeToken';

import { differenceInDays, parseISO } from "date-fns";

import loadingGif from '../../../Images/loading.gif'

import nuvens from '../../../Images/dashboard/nuvens.png'
import nuvensCenter from '../../../Images/dashboard/dashboard.png'

const BarChartComponent = () => {
    const decodedToken = autoDecodeToken();

    const {data, loading, refetch} = useQuery(GET_PROFIT, {
        variables: {
          filters: {
            id_usuario: decodedToken.id,
            excluido: false
          }
        }
    })

    console.log(data);

    const [ userData, setUserData ] = useState({
        labels: "",
        datasets: []
    })

    useEffect(() => {
        if(!loading) {
            setUserData({
                labels: data?.getAllProfit.map((data) => data.lucroSafra.plantacao.descricao),
                // labels: ["Plantação"],
                datasets: [{
                    label: "Lucro Geral",
                    data: data?.getAllProfit.map((data) =>
                        {
                            const parsedDate1 = parseISO(data.periodo_venda);
                            const parsedDate2 = parseISO(data.lucroSafra.data_safra);
                            const daysDifference = Math.abs(differenceInDays(parsedDate2, parsedDate1))
                            
                            const count = (
                                (
                                    (
                                        data?.qtd_venda * 
                                        data?.valor_venda
                                    ) - (
                                        data.lucroGasto?.preco_adubo +
                                        data.lucroGasto?.preco_calcario +
                                        data.lucroGasto?.preco_insumos +
                                        data.lucroGasto?.valor_inicial +
                                        (
                                            data.lucroGasto?.hora_trabalho *
                                            data.lucroGasto?.hora_trabalhada
                                        ) * (
                                            daysDifference
                                        )
                                    )
                                )
                            )
                            return count
                        }
                    ),
                    borderColor: "black",
                    backgroundColor: ["#5b8675", "#da9075", "black"]
                }],
            })
        }
    },[loading])

    const newUrl = () => {
        const novaURL = 'http://localhost:3000/plantations'
        window.location.href = novaURL;
    }
 
    const isMobile = useMediaQuery('(max-width: 920px)')

    return (
        <>
            <Navbar />
            {
                data?.getAllProfit?.length === 0 ? 
                (
                    <>
                        <Grid container spacing={2} >
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
                                        display: { xs: "block", md: 'inline-flex' }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            ml: { xs: "auto", md: 0 },
                                            mr: { xs: "auto", md: 0 }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                textAlign: { xs: "center", md: "left" },
                                                pl: { xs: "auto", md: "1em" },
                                                pt: "0.8em",
                                                color: "snow",
                                                fontSize: { xs: "1em", md: "2.3em" },
                                                fontFamily: 'FontePersonalizada',
                                                fontWeight: 700
                                            }}
                                        >
                                            Seja bem vindo, { decodedToken.nome }
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textAlign: { xs: "center", md: "left" },
                                                pl: { xs: 0, md: "1.5em" },
                                                color: "#9ebfaa",
                                                fontSize: { xs: "0.8", md: "1.5em" },
                                                fontFamily: 'FontePersonalizada',
                                                fontWeight: 700
                                            }}
                                        >
                                            Sem Dados!
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            ml: { xs: 0, md: "auto" },
                                            mt: { xs: "1em", md: "1.5em"},
                                            mr: { xs: 0, md: "4em" },
                                            textAlign: "center",
                                        }}
                                    >
                                        <Box 
                                            component="img" 
                                            src={nuvens}
                                            sx={{
                                                height: { xs: "2em", md: "5em" }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid 
                                item xs={12} 
                                container spacing={2} 
                                justifyContent="center" alignItems="center" 
                                sx={{ mt: "2em", height: "50vh" }} 
                            >
                                <Grid item xs={12} sm={6} textAlign="center">
                                    <img src={nuvensCenter} /> <br></br>
                                    <Box sx={{ mt: "1em", display: "inline-flex" }}>
                                        <Typography
                                            fontSize="1.3em"
                                            fontFamily="FontePersonalizada"
                                            sx={{ color: "#646464" }}
                                        >
                                            Você ainda{" "}
                                            <Box
                                                sx={{
                                                    color: "red", display: "inline-flex"
                                                }}
                                            >
                                                não
                                            </Box>
                                            {" "} teve progresso nas plantações :(
                                        </Typography>
                                    </Box>
                                    <Typography
                                        fontSize="1.6em"
                                        fontFamily="FontePersonalizada"
                                        fontWeight='600'
                                        sx={{ cursor: "pointer", color: "#47796b" }}
                                        onClick={() => newUrl()}
                                    >
                                        Aguarde a proxima safra ou <br></br> Crie uma plantação!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
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
                                                display: { xs: "block", md: 'inline-flex' }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    ml: { xs: "auto", md: 0 },
                                                    mr: { xs: "auto", md: 0 }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        textAlign: { xs: "center", md: "left" },
                                                        pl: { xs: "auto", md: "1em" },
                                                        pt: "0.8em",
                                                        color: "snow",
                                                        fontSize: { xs: "1em", md: "2.3em" },
                                                        fontFamily: 'FontePersonalizada',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    Seja bem vindo, { decodedToken.nome }
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        textAlign: { xs: "center", md: "left" },
                                                        pl: { xs: 0, md: "1.5em" },
                                                        color: "#9ebfaa",
                                                        fontSize: { xs: "0.8", md: "1.5em" },
                                                        fontFamily: 'FontePersonalizada',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    Acompanhe seu progresso aqui!
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    ml: { xs: 0, md: "auto" },
                                                    mt: { xs: "1em", md: "1.5em"},
                                                    mr: { xs: 0, md: "4em" },
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Box 
                                                    component="img" 
                                                    src={nuvens}
                                                    sx={{
                                                        height: { xs: "2em", md: "5em" }
                                                    }}
                                                />
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
                                                container
                                                justifyContent="center"
                                        >
                                            <Grid item xs={12}>
                                                <Typography
                                                        sx={{
                                                            textAlign: "left",
                                                            ml: "1em",
                                                            fontSize: "1.8em",
                                                            fontFamily: 'FontePersonalizada',
                                                            fontWeight: 900
                                                        }}
                                                    >
                                                        Receita
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item xs={12}
                                                container
                                                justifyContent="center"
                                                sx={{
                                                    maxHeight: "20em",
                                                    textAlign: "center"
                                                }}
                                            >
                                                <Bar    
                                                    data={userData}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid 
                                            item xs={12} sm={5} 
                                            sx={{ 
                                                textAlign: "center", 
                                                alignItems: "center",
                                                bgcolor: "#c7d7cd", 
                                                borderRadius: "15px", 
                                                height: "auto",
                                                mt: { xs: "1em", sm: 0 }
                                            }} 
                                            container
                                            justifyContent="center" 
                                        >
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        textAlign: "left",
                                                        ml: "1em",
                                                        fontSize: "1.8em",
                                                        fontFamily: 'FontePersonalizada',
                                                        fontWeight: 900
                                                    }}
                                                >
                                                    Plantações e Safras
                                                </Typography>
                                            </Grid>
                                            <Grid 
                                                item xs={12}
                                                container
                                                justifyContent="center" 
                                                sx={{
                                                    maxHeight: "20em"
                                                }}
                                            >
                                                <Pie
                                                    data={userData}
                                                />
                                            </Grid>
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