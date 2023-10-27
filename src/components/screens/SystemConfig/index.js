import { Divider, Grid, Typography } from "@mui/material"
import { useState } from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteUserScreen from "./subScreens/delete"
import HelpUserScreen from "./subScreens/help";

export const SystemConfig = () => {
    const [selected, setSelected] = useState({
        help: true,
        deleted: false,
        acess: false
    })

    const handlePage = (ev) => {
        console.log(ev);
        const page = ev

        if(page == 'help') {
            setSelected({
                help: true,
                deleted: false,
                acess: false
            })
        } else if(page == 'deleted') {
            setSelected({
                help: false,
                deleted: true,
                acess: false
            })
        } else {
            setSelected({
                help: false,
                deleted: false,
                acess: true
            })
        }
    }

    const backToInit = () => {
        const novaURL = 'http://localhost:3000/dashboard'
        window.location.href = novaURL;
    }

    return (
        <Grid 
            container 
            spacing={2} 
            sx={{
                minHeight: "100vh",
                maxHeight: "auto",
                m: 0,
                p: 0
            }}
        >
            <Grid 
                item 
                xs={3}
                sx={{
                    bgcolor: "#75a79c",
                    minHeight: "100%",
                    maxHeight: "auto",
                    textAlign: "right"
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: 'FontePersonalizada',
                        fontWeight: 700,
                        fontSize: "1.2em"
                    }}
                >
                    Configurações do sistema
                </Typography>
                <Divider 
                    sx={{
                        textAlign: "right",
                        ml: "auto",
                        mr: "1em",
                        width: "18em",
                        fontWeight: 900
                    }}
                />
                <Typography
                    onClick={() => handlePage("help")}
                    sx={{
                        ml: "2.5em",
                        mt: "1em",
                        mr: "2em",
                        fontSize: "1.2em",
                        borderRadius: "1em",
                        pl: "0.5em",
                        textAlign: "left",
                        fontFamily: 'FontePersonalizada',
                        cursor: "pointer",
                        bgcolor: selected.help ? "white" : "default"
                    }}
                >
                    Ajuda
                </Typography>
                <Typography
                    onClick={() => handlePage("deleted")}
                    sx={{
                        ml: "2.5em",
                        mr: "2em",
                        fontSize: "1.2em",
                        borderRadius: "1em",
                        pl: "0.5em",
                        textAlign: "left",
                        fontFamily: 'FontePersonalizada',
                        cursor: "pointer",
                        bgcolor: selected.deleted ? "white" : "default"
                    }}
                >
                    Excluir conta
                </Typography>
            </Grid>
            <Grid item xs={8} >
                {
                    selected.acess && (
                        <>
                            Tela inexistente
                        </>
                    )
                }
                {
                    selected.deleted && (
                        <>
                            <DeleteUserScreen />
                        </>
                    )
                }
                {
                    selected.help && (
                        <>
                            <HelpUserScreen />
                        </>
                    )
                }
            </Grid>
            <Grid 
                item 
                xs={1}
            >
                <HighlightOffIcon
                    onClick={() => backToInit()}
                    sx={{
                        cursor: "pointer",
                        fontSize: "4em",
                        "&:hover": {
                            color: "red",
                            color: "red"
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
}