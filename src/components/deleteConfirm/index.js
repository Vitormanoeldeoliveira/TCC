import { Button, DialogContent, Grid, InputAdornment, Typography } from "@mui/material"
import Textfield from "../ourComponents/TextField";

import { BootstrapDialog, BootstrapDialogTitle } from "../ourComponents/Modals/index";
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Formik, Form } from "formik"

import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

export const Delete = (props) => {

    const {
        setOpenDialog, 
        openDialog, 
        validadeValue, 
        setValidadeValue,
        // modalControl,
        // setModalControl,
    } = props

    const [open, setOpen] = useState(false)

    const handleClose = async () => {
        setOpenDialog({
        ...openDialog,
            modalDelete: false
        });
    };

    const handleSubmit = async(values) => {
        setOpenDialog({
            ...openDialog,
            modalDelete: false,
            deleteConfirmed: true
        });
    };

    return(
        <>
            <BootstrapDialog
                open={openDialog.modalDelete}
                fullWidth={true}
                maxWidth="xs"
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    <Typography
                        sx={{
                            fontFamily: 'FontePersonalizada',
                            fontSize: "0.9em",
                            color: "white",
                            fontWeight: "700"
                        }}
                    >
                        ATENÇÃO
                    </Typography>
                </BootstrapDialogTitle>
                <DialogContent>
                    <Grid
                        justifyContent="center" 
                        container 
                        spacing={2}
                        sx={{ 
                        ml: "auto", 
                        width: "100%",
                        }} 
                    >
                        <Grid item xs={12} sx={{m: 0, p: 0, mt:"2em"}} >
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "1.2em",
                                    fontWeight: "700"
                                }}
                            >
                                Tem certeza que deseja excluir o registro?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{m: 0, p: 0, mt:"1em"}} >
                            <Button
                                onClick={() => handleSubmit()}
                                variant="outlined"
                                color="error"
                                type="submit"
                                fullWidth 
                            >
                                Sim
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
            <div><Toaster/></div>
        </>
    )
}