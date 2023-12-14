import {
    Grid,
    DialogContent,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
    Typography,
    Button,
    Box,
    createTheme,
    ThemeProvider,
} from "@mui/material";

import { BootstrapDialog, BootstrapDialogTitle } from "../../ourComponents/Modals";

import { useEffect, useState } from "react";

import Carousel from "react-elastic-carousel"
import './carousel.css'

import dash1 from '../../../Images/ajuda/dash 1.png'
import dash2 from '../../../Images/ajuda/dash 2.png'
import dash3 from '../../../Images/ajuda/dash 3.png'
import dash4 from '../../../Images/ajuda/dash 4.png'
import dash5 from '../../../Images/ajuda/dash 5.png'
import plant1 from '../../../Images/ajuda/plant 1.png'
import plant2 from '../../../Images/ajuda/plant 2.png'
import plant3 from '../../../Images/ajuda/plant 3.png'
import plant4 from '../../../Images/ajuda/plant 4.png'
import safra1 from '../../../Images/ajuda/safra 1.png'
import safra2 from '../../../Images/ajuda/safra 2.png'
import safra3 from '../../../Images/ajuda/safra 3.png'
import safra4 from '../../../Images/ajuda/safra 4.png'
import safra5 from '../../../Images/ajuda/safra 5.png'

const Help = ({ openModal, setOpenModal, screen }) => {

    useEffect(() => {
        if (!openModal) {
            setOpenModal(true);
        }
    }, [setOpenModal]);

    const styles = {
        carouselImage: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "500px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
            margin: "0 auto",
        },
    };

    const Dashboard = [
        { name: "imagem 1", image: dash1 },
        { name: "imagem 2", image: dash2 },
        { name: "imagem 3", image: dash3 },
        { name: "imagem 4", image: dash4 },
        { name: "imagem 5", image: dash5 },
    ];

    const Plantacao = [
        { name: "imagem 1", image: plant1 },
        { name: "imagem 2", image: plant2 },
        { name: "imagem 3", image: plant3 },
        { name: "imagem 4", image: plant4 },
    ];

    const Safra = [
        { name: "imagem 1", image: safra1 },
        { name: "imagem 2", image: safra2 },
        { name: "imagem 3", image: safra3 },
        { name: "imagem 4", image: safra4 },
        { name: "imagem 5", image: safra5 },
    ];

    const handleClose = async () => {
        setTimeout(() => {
            setOpenModal(false);
        }, 200);
    };

    return (
        <>
            <BootstrapDialog open={openModal} fullWidth={true} maxWidth="md" sx={{ maxHeight: 'auto' }} >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                    <Box
                        sx={{
                            display: "inline-flex"
                        }}
                    >
                        <Typography
                            fontSize="1em"
                        >
                            Ajuda, Tela: {screen}
                        </Typography>
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent>
                    {
                        screen === "Dashboard" ? (
                            <Grid container spacing={2} alignItems="center" justifyContent="center" >
                                <Grid item xs={12} sx={{ height: "auto", py: 1, my: 2, }}>
                                    <Carousel
                                        enableAutoPlay={true}
                                        autoPlaySpeed={60000}
                                        showArrows={true}
                                    >
                                        {Dashboard.map((Dashboard, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    margin: 0,
                                                    position: "relative",
                                                }}
                                            >
                                                <Box>
                                                    <img src={Dashboard.image} alt={Dashboard.name} style={styles.carouselImage} />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Carousel>
                                </Grid>
                            </Grid>
                        ) :
                            screen === "Plantações" ? (
                                <Grid 
                                    container 
                                    spacing={2} 
                                    alignItems="center" 
                                    justifyContent="center"
                                >
                                    <Grid item xs={12} sx={{ height: "auto", py: 1, my: 2, }}>
                                        <Carousel
                                            enableAutoPlay={true}
                                            autoPlaySpeed={60000}
                                            showArrows={true}
                                        >
                                            {Plantacao.map((Plantacao, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        margin: 0,
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Box>
                                                        <img src={Plantacao.image} alt={Plantacao.name} style={styles.carouselImage} />
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Carousel>
                                    </Grid>
                                </Grid>
                            ) :
                                screen === "Safras" && (
                                    <Grid container spacing={2} alignItems="center" justifyContent="center" >
                                        <Grid item xs={12} sx={{ height: "auto", py: 1, my: 2, }}>
                                            <Carousel
                                                enableAutoPlay={true}
                                                autoPlaySpeed={60000}
                                                showArrows={true}
                                            >
                                                {Safra.map((Safra, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            margin: 0,
                                                            position: "relative",
                                                        }}
                                                    >
                                                        <Box>
                                                            <img src={Safra.image} alt={Safra.name} style={styles.carouselImage} />
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Carousel>
                                        </Grid>
                                    </Grid>
                                )
                    }
                    <Box
                        sx={{
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={() => handleClose()}
                            sx={{
                                backgroundColor: "#76a79c",
                                borderColor: "#76a79c",
                                "&:hover": {
                                    backgroundColor: "#889c9b",
                                    borderColor: "#889c9b"
                                }
                            }}
                        >
                            Concluir
                        </Button>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
};

export default Help