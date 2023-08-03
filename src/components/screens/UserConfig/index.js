import { Avatar, Box, Button, Divider, Grid, IconButton, Typography } from "@mui/material"
import { Navbar } from "../../ourComponents/Navbar"

import { autoDecodeToken } from "../Login/token/decodeToken";
import { useState } from "react";
import EditAvatar from "./Modals/EditAvatar";
import { UpdateUser } from "./Modals/updateUser";

export const UserConfig = () => {
    const decodedToken = autoDecodeToken();

    const [openModal, setOpenModal] = useState({
        modalEditAvatar: false,
        modalUpdateUser: false
    });

    const handleChangeAvatar = () => {
        setOpenModal({
            ...openModal,
            modalEditAvatar: true
        });
    };

    const handleChangeData = () => {
        console.log("oi");
        setOpenModal({
            ...openModal,
            modalUpdateUser: true
        });
    }

    const logout = () => {
        localStorage.setItem('token', "");

        const novaURL = 'http://localhost:3000'
        window.location.href = novaURL;
    };

    return (
        <>
            <Navbar />
            <Divider sx={{ backgroundColor: 'black', margin: '0', height: 3.5 }} />
            <Grid 
                container 
                // spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    mt: 0,
                    // height: `${heigth}px`,
                    m: 0,
                    p: 0,
                    // height: "100vh",
                    // bgcolor: "lightblue"
                }}
            >
                <Grid 
                    item 
                    xs={6}
                    sx={{
                        mt: "10em"
                    }}
                >
                    <Box
                        sx={{
                            display: "inline-flex"
                        }}
                    >
                        <IconButton
                            onClick={() => handleChangeAvatar()}
                        >
                            <Avatar 
                                alt="Remy Sharp" 
                                src={decodedToken.avatar} 
                                sx={{
                                    // ml: "2em",
                                    height: "5em",
                                    cursor: "pointer",
                                    width: "5em"
                                }} 
                            />
                        </IconButton>
                        <Typography
                            fontSize="2em"
                            sx={{
                                ml: "0.3em",
                                mt: "0.8em",
                                fontWeight: 700,
                                fontFamily: 'FontePersonalizada',
                            }}
                        >
                            {decodedToken.nome}
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        fontSize="2em"
                        onClick={() => handleChangeData()}
                        sx={{
                            // ml: "0.3em",
                            mt: "0.8em",
                            fontWeight: 700,
                            fontFamily: 'FontePersonalizada',
                            cursor: "pointer",
                            "&:hover": {
                                color: "lightblue",
                            },
                        }}
                    >
                        Gerenciar conta
                    </Typography>
                    <Divider 
                        sx={{
                            backgroundColor: 'black',
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        mt: "3em"
                    }}
                >
                    <Button
                        variant="contained"
                        fullWidth
                        color="error"
                        onClick={() => logout()}
                        sx={{
                            fontFamily: 'FontePersonalizada',
                            fontWeight: 700,
                            fontSize: "1em",
                            width: "17em"
                        }}
                    >
                        Sair
                    </Button>
                </Grid>
                {openModal.modalEditAvatar && (
                    <EditAvatar 
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                    />
                )}

                {openModal.modalUpdateUser && (
                    <UpdateUser 
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                    />
                )}
            </Grid>
        </>
    )
}