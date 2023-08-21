import { Autocomplete, Button, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals";
import Textfield from "../../../ourComponents/TextField";

import YardIcon from '@mui/icons-material/Yard';

import { CREATE_PLANTATIONS, UPDATE_PLANTATIONS } from "../../../requires/api.require";
import { useMutation } from "@apollo/client";
import { autoDecodeToken } from "../../Login/token/decodeToken";
import { toast, Toaster } from "react-hot-toast";

export const ModalPlantations = (props) => {
    const {openModal, setOpenModal, refetchTableData, isEdit} = props;

    const decodedToken = autoDecodeToken();

    const [addPlantations] = useMutation(CREATE_PLANTATIONS)
    const [updatePlantations] = useMutation(UPDATE_PLANTATIONS)

    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        descricao: "",
        tipo: "",
        area: ""
    });

    const [autoComplete, setAutoComplete] = useState(null)

    useEffect(() => {
        if(isEdit) {
            setFormValues(isEdit)
            setAutoComplete(isEdit.planta.nome)
        }
    }, [openModal.modalPlantations])

    const plants = ['Tomate', 'Alface']

    useEffect(() => {
        if(openModal.modalPlantations) {
            setOpen(true);
        }
    }, [openModal.modalPlantations]);

    const handleClose = async () => {
        await setOpen(false);
        setTimeout(() => {
            setOpenModal({
                ...openModal,
                modalPlantations: false
            })
        }, 1000);
    };

    const handleChangeAutoComplete = (newValue) => {
        if(newValue) {
            setAutoComplete(newValue)
        }
    };

    const handleSubmit = async(values) => {
        if(!isEdit) {
            try{
                const plantations = {
                    descricao: values.descricao,
                    area: Number(values.area),
                    id_cidade: 1,
                    id_planta: autoComplete === "Tomate" ? 1 : 2,
                    id_usuario: decodedToken.id,
                    tipo: values.tipo
                }
    
                await addPlantations({
                    variables: {
                        plantations
                    }
                })
    
                toast.success("Cadastro Realizado Com sucesso")
                refetchTableData()
                handleClose()
            }catch (e){
                console.log(e);
            }
        } else {
            const plantations = {
                descricao: values.descricao,
                area: Number(values.area),
                id_cidade: 1,
                id_planta: autoComplete === "Tomate" ? 1 : 2,
                id_usuario: decodedToken.id,
                tipo: values.tipo
            }

            await updatePlantations({
                variables: {
                    plantations,
                    updatePlantationId: Number(isEdit.id)
                }
            })

            toast.success("Cadastro Realizado Com sucesso")
            refetchTableData()
            handleClose()
        }
    }

    return(
        <>
            <BootstrapDialog open={open} fullWidth={true} maxWidth="md" >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                    <Box
                        sx={{
                            display: "inline-flex"
                        }}
                    >
                        <Typography
                            fontSize="1em"
                        >
                            Criar Plantação
                        </Typography>
                        <YardIcon sx={{ fontSize: "1.3em", ml: "0.2em" }} />
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ ...formValues }}
                        // validationSchema={validation}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <Grid container spacing={2} sx={{ p: 2 }} >
                                <Grid item xs={12}>
                                    <Textfield
                                        name="descricao"
                                        label="Descrição"
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Autocomplete
                                        options={plants}
                                        renderInput={
                                            (params) => <TextField
                                                {...params}
                                                name="planta"
                                                label="Planta"
                                                variant="standard"
                                            />
                                        }
                                        value={autoComplete}
                                        onChange={(ev, newValue) => handleChangeAutoComplete(newValue)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Textfield 
                                        name="tipo"
                                        label="Tipo"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Textfield 
                                        name="area"
                                        label="Área da plantação"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{textAlign:"center"}} >
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        sx={{
                                            color: "#b5cfce",
                                            borderColor: "#b5cfce",
                                            "&:hover": {
                                                color: "#889c9b",
                                                borderColor: "#889c9b"
                                            }
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </DialogContent>
            </BootstrapDialog>
            <div><Toaster/></div>
        </>
    );
}