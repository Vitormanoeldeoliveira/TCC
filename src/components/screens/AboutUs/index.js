import { Navbar } from "../../ourComponents/Navbar"
import aboutUs from "../../../Images/aboutUs/aboutUs.png"
import planta from "../../../Images/plantinha.png"
import { Avatar, Box, Grid, Typography } from "@mui/material"

import breno from '../../../Images/Creators/breno.jpeg'
import robson from "../../../Images/Creators/robson.jpeg"
import girl1 from '../../../Images/Avatar/girl1.png'
import vitor from "../../../Images/Creators/vitor.jpeg"

const Avatars = [
    {id: 1, image: breno, name: 'Breno Andreazza'},
    {id: 2, image: robson, name: 'Robson Jitukava'},
    {id: 3, image: girl1, name: 'Heitor Strabelli'},
    {id: 4, image: vitor, name: 'Vitor Manoel'},
]

export const AboutUs = () => {
    return (
        <>
            <Navbar />
            <Grid
                container
                sx={{
                    backgroundImage: `url(${aboutUs})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "350vh"
                }}
            >
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    xs={6}
                    sx={{
                        // bgcolor: "red",
                        height: "100vh"
                    }}
                >
                    <Grid
                        sx={{
                            // bgcolor: "yellow",
                            p: 6
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "FontePersonalizada",
                                fontSize: "3em",
                                fontWeight: "1000"
                            }}
                        >
                            Criando a <br></br>primeira muda
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "FontePersonalizada",
                                fontSize: "1em",
                            }}
                        >
                            Nosso sistema Web vêm auxiliar, automatizar, acompanhar, facilitar e 
                            também permitindo que você comece seu próprio plantio. 
                            A ferramenta para cuidar dos ajustes, os trechos chatos de cálculos 
                            e estimativas que toda planta precisa, pode deixar com a gente do Estufa!
                            <Box 
                                component="img" 
                                src={planta} 
                                sx={{
                                    height: "1.5em",
                                    ml: 1
                                }}
                            />
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{height: "100vh"}} ></Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    xs={4}
                    sx={{
                        height: "100vh",
                        // bgcolor: "green",
                        mt: "-15em"
                    }}
                >
                    <Grid
                        sx={{
                            // bgcolor: "yellow",
                            p: 6,
                            mt: "-4em"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "FontePersonalizada",
                                fontSize: "3em",
                                fontWeight: "1000"
                            }}
                        >
                            História
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "FontePersonalizada",
                                fontSize: "1em",
                            }}
                        >
                            O Estufa nasceu da ideia de auxiliar produtores agrícolas no interior de São Paulo, 
                            Santa Fé do Sul, criando uma ferramenta prática para realizar as projeções e 
                            visões de lucro de uma plantação. 
                            A iniciativa foi abraçada como um trabalho de conclusão de curso, 
                            de alunos técnicos em Informática para a Internet, 
                            realizado na escola pública ETEC, uma entre as mais de 300 unidades
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{height: "100vh"}}></Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    xs={6}
                    sx={{
                        // bgcolor: "red",
                        heigth: "100vh",
                        mt: "-40em"
                    }}
                >
                    <Grid
                        sx={{
                            // bgcolor: "yellow",
                            p: 6,
                            mt: "-4em"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "FontePersonalizada",
                                fontSize: "3em",
                                fontWeight: "1000"
                            }}
                        >
                            Quem somos Nós?
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "FontePersonalizada",
                                fontSize: "1em",
                            }}
                        >
                            Os integrantes dessa equipe de produção foram alunos do Terceiro ano com habilitação 
                            Técnica em Informática para Internet, que apenas visavam concluir seu ensino 
                            médio e criaram um sistema inteiro, com a Orientação Pedagógica do professor José Paulo Codinhoto, 
                            os alunos são:
                        </Typography>
                        <Grid 
                            container 
                            spacing={2}
                            justifyContent='center'
                            alignItems='center'
                        >
                            {Avatars.map((image) => (
                                <Grid 
                                    item
                                    container
                                    spacing={2}
                                    xs={1} 
                                    key={image.id}
                                    sx={{
                                        mt: "1em",
                                        mr: "4em"
                                    }}
                                >
                                    <Avatar
                                        src={image.image}
                                        sx={{
                                            height: "5em",
                                            width: "5em",
                                        }} 
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: "FontePersonalizada",
                                            textAlign: "center",
                                            fontSize: "1em",
                                            ml: 2
                                        }}
                                    >
                                        {image.name}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}