import { useMutation } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Delete } from "../../../deleteConfirm";
import { DELETE_USER } from "../../../requires/api.require"
import { autoDecodeToken } from "../../Login/token/decodeToken";

const DeleteUserScreen = () => {
    const decodedToken = autoDecodeToken();

    const [delUser] = useMutation(DELETE_USER)

    const [boolean, setBoolean] = useState({
        modalDelete: false,
        deleteConfirmed: false,
        idToDelete: "",
    })

    useEffect(() => {
        if(boolean.deleteConfirmed) {
          try {
            delUser({
              variables: {
                deleteUserId: Number(boolean.idToDelete)
              }
            })
    
            setBoolean(() => ({
              ...boolean,
                deleteConfirmed: false,
                idToDelete: "",
            }))

            localStorage.setItem('token', "");

            const novaURL = 'http://localhost:3000'
            window.location.href = novaURL;
          } catch (e) {
            console.log(e);
          }
        }
    }, [boolean.deleteConfirmed])
    

    const deleteConfirm = () => {
        setBoolean({
            ...boolean,
            modalDelete: true,
            idToDelete: decodedToken.id
        })
    }

    return(
        <>
            <Grid 
                container 
                spacing={2}
                sx={{
                    minHeight: "100%",
                    maxHeight: "auto"
                }}
            >
                <Grid item xs={12} >
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontWeight: 700,
                            fontSize: "2em"
                        }}
                    >
                        Excluir conta
                    </Typography>
                </Grid>
                <Grid 
                    item 
                    xs={12} 
                    sx={{
                        textAlign: "center",
                        height: "100%"
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontSize: "3em"
                        }}
                    >
                        Tem certeza que deseja
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontSize: "3em"
                        }}
                    >
                        excluir sua conta?
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontSize: "1.4em"
                        }}
                    >
                        Sentiremos sua falta :(
                    </Typography>
                    <Button
                      variant="contained"
                      type="submit"
                      color="error"
                      onClick={() => deleteConfirm()}
                      sx={{
                        mt: "3em",
                        width: "15em"
                      }}
                    >
                      Excluir
                    </Button>
                </Grid>
            </Grid>
            {boolean.modalDelete && (
                <Delete
                    openDialog={boolean}
                    setOpenDialog={setBoolean}
                />
            )}
        </>
    )
}

export default DeleteUserScreen