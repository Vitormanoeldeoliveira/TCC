import { Box, Button, DialogContent, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals";
import Textfield from "../../../ourComponents/TextField";
import * as Yup from "yup";
import moment from "moment";
import { CREATE_HARVEST, UPDATE_HARVEST } from "../../../requires/api.require";
import { useMutation } from "@apollo/client";
import { toast, Toaster } from "react-hot-toast";
import { FormatColorReset } from "@mui/icons-material";

export const ModalHarvest = (props) => {
    const {openModal, setOpenModal, refetchTableData, isEdit, decript} = props;

    const [addHarvest] = useMutation(CREATE_HARVEST)
    const [updateHarvest] = useMutation(UPDATE_HARVEST)

    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        descricao: "",
        data_safra: moment(new Date()).format("YYYY-MM-DD"),
        loading: false
    })

    const validation = Yup.object().shape({
        descricao: Yup.string().required("Campo obrigatório").max(30, "Limite de caracteres atingido"),
        data_safra: Yup.string().required("Campo obrigatório")
    });

    useEffect(() => {
        if(openModal.modalHarvest) {
            setOpen(true);
            if(isEdit) {
                setFormValues({
                    descricao: isEdit.descricao,
                    data_safra: moment(isEdit.data_safra).format("YYYY-MM-DD")
                })
            }
        }
    }, [openModal.modalHarvest]);

    const handleClose = async () => {
        await setOpen(false);
        setTimeout(() => {
            setOpenModal({
                ...openModal,
                modalHarvest: false
            })
        }, 1000);
    };

    const handleSubmit = async(values) => {
        setFormValues({
            ...formValues,
            loading: true
        })
        if(!isEdit) {
            try {
                await addHarvest({
                    variables: {
                        harvest: {
                            data_safra: values.data_safra,
                            descricao: values.descricao,
                            id_plantacao: Number(decript)
                        }
                    }
                })
        
                toast.success("Cadastro Realizado Com sucesso")
                refetchTableData()
                handleClose()
            } catch (e){
                setFormValues({
                    ...formValues,
                    loading: false
                })
                console.log(e);
            }
        } else {
            try {
                await updateHarvest({
                    variables: {
                        updateHarvestId: Number(isEdit.id),
                        harvest: {
                            descricao: values.descricao,
                            data_safra: values.data_safra,
                            id_plantacao: Number(decript)
                        }
                    }
                })
            } catch (e) {
                setFormValues({
                    ...formValues,
                    loading: false
                })
                console.log(e)
            }

            toast.success("Cadastro Realizado Com sucesso")
            refetchTableData()
            handleClose()
        }
    }

    return (
        <>
            <BootstrapDialog open={open} fullWidth={true} maxWidth="md" >
                <BootstrapDialogTitle 
                    id="customized-dialog-title" 
                    onClose={handleClose} 
                    sx={{
                        bgcolor: "#da8f73",
                        color: "white"
                    }}
                >
                    <Box
                        sx={{
                            display: "inline-flex"
                        }}
                    >
                        <Typography
                            fontSize="1em"
                        >
                            {!isEdit ? "Criar Safra" : "Editar Safra"}
                        </Typography>
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ ...formValues }}
                        validationSchema={validation}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <Grid 
                                container
                                spacing={2}
                                sx={{
                                    py: 2
                                }}
                            >
                                <Grid item xs={12}>
                                    <Textfield 
                                        name="descricao"
                                        label="Descrição"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textfield 
                                        name="data_safra"
                                        label="Data da Safra"
                                        type="Date"
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{textAlign:"center"}} >
                                    <Button
                                        variant="cointaned"
                                        disabled={formValues.loading}
                                        type="submit"
                                        sx={{
                                            backgroundColor: "#9abadb",
                                            color: "white",
                                            borderColor: "#b4cfce",
                                            "&:hover": {
                                                backgroundColor: "#9adbb5",
                                                borderColor: "#b4cfce"
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
    )
}