import { Autocomplete, Button, DialogContent, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals";
import Textfield from "../../../ourComponents/TextField";

import YardIcon from '@mui/icons-material/Yard';

import { CREATE_HARVEST, CREATE_PLANTATIONS, UPDATE_PLANTATIONS } from "../../../requires/api.require";
import { useMutation } from "@apollo/client";
import { autoDecodeToken } from "../../Login/token/decodeToken";
import { toast, Toaster } from "react-hot-toast";

import * as Yup from "yup";
import moment from "moment";

export const ModalPlantations = (props) => {
    const {openModal, setOpenModal, refetchTableData, isEdit} = props;

    const decodedToken = autoDecodeToken();

    const [addPlantations] = useMutation(CREATE_PLANTATIONS)
    const [updatePlantations] = useMutation(UPDATE_PLANTATIONS)
    const [addHarvest] = useMutation(CREATE_HARVEST)

    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        descricao: "",
        tipo: "",
        area: "",
        estado: "",
        cidade: "",
        cep: "",
        errorCep: false,
        loading: false
    });

    const [autoComplete, setAutoComplete] = useState("Milho")
    const [autoCompleteType, setAutoCompleteType] = useState("Safra Continua")

    const validation = Yup.object().shape({
        descricao: Yup.string().required("Campo obrigatório").max(30, "Limite de caracteres atingido"),
        area: Yup.string().required("Campo obrigatório").max(30, "Limite de caracteres atingido"),
        cep: Yup.string().required("Campo obrigatório").max(9, "Limite de caracteres atingido"),
    });

    useEffect(() => {
        if(isEdit) {
            setFormValues({ 
                ...isEdit,
                area: isEdit.area.toFixed(2).toString().replace('.', ','),
                estado: isEdit.uf,
                cep: isEdit.cep.toString().replace(/^(\d{5})(\d{0,3})/, '$1-$2')
            })

            setAutoComplete(isEdit.planta.descricao)
            setAutoCompleteType(isEdit.tipo)
        }
    }, [openModal.modalPlantations])

    const plants = [
        'Milho', 
        'Soja', 
        'Feijão', 
        'Melancia', 
        'Café', 
        'Alface', 
        'Repolho', 
        'Laranja',
    ]

    const type = ['Safra Continua', 'Safra Única']

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

    const handleChangeAutoCompleteType = (newValue) => {
        if(newValue) {
            setAutoCompleteType(newValue)
        }
    };

    const handleSubmit = async(values) => {
        setFormValues({
            ...formValues,
            loading: true
        });

        if(formValues.errorCep) {
            return
        }

        if(!isEdit) {
            try{
                const plantations = {
                    descricao: values.descricao,
                    area: Number(values.area.replace(',', '.')),
                    cep: values.cep.replace(/\D/g, ''),
                    cidade: formValues.cidade,
                    uf: formValues.estado,
                    id_planta: 
                        autoComplete === "Milho" ? 1 :
                            autoComplete === "Soja" ? 2 :
                                autoComplete === "Feijão" ? 3 :
                                    autoComplete === "Melância" ? 4 :
                                        autoComplete === "Café" ? 5 :
                                            autoComplete === "Alface" ? 6 :
                                                autoComplete === "Repolho" ? 7 : 8,

                    id_usuario: decodedToken.id,
                    tipo: autoCompleteType
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
                setFormValues({
                    ...formValues,
                    loading: false
                })
                console.log(e);
            }
        } else {
            try {
                const plantations = {
                    descricao: values.descricao,
                    area: Number(values.area.replace(',', '.')),
                    cep: values.cep.replace(/\D/g, ''),
                    cidade: formValues.cidade,
                    uf: formValues.estado,
                    id_planta: 
                        autoComplete === "Milho" ? 1 :
                            autoComplete === "Soja" ? 2 :
                                autoComplete === "Feijão" ? 3 :
                                    autoComplete === "Melancia" ? 4 :
                                        autoComplete === "Café" ? 5 :
                                            autoComplete === "Alface" ? 6 :
                                                autoComplete === "Repolho" ? 7 : 8,
                    id_usuario: decodedToken.id,
                    tipo: autoCompleteType
                }
    
                await updatePlantations({
                    variables: {
                        plantations,
                        updatePlantationId: Number(isEdit.id)
                    }
                })
            } catch {
                setFormValues({
                    ...formValues,
                    loading: false
                })
            }

            toast.success("Cadastro Realizado Com sucesso")
            refetchTableData()
            handleClose()
        }
    }

    const onBlurCep = async(ev) => {
        const cep = ev.target.value
        
        setFormValues({
            ...formValues,
            loading: true
        });

        if(cep.length !== 9){
            setFormValues((formValues) =>  ({
                ...formValues,
                cidade: "",
                estado: "",
                errorCep: true,
                loading: false
            }));
            return;
        }

        try {
            await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => res.json())
                .then((data) => {
                    if(data.localidade) {
                        setFormValues({
                            ...formValues,
                            cidade: data.localidade,
                            estado: data.uf,
                            loading: false
                        })
                    } else {
                        setFormValues({
                            ...formValues,
                            cidade: "",
                            estado: "",
                            errorCep: true,
                            loading: false
                        })
                        // toast.error("Não identificamos o cep informado, tente novamente")
                    }
                })
        } catch {
            setFormValues({
                ...formValues,
                cidade: "",
                estado: "",
            })
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
                            {!isEdit ? "Cadastro de Plantação" : "Edição de Plantação"}
                        </Typography>
                        <YardIcon sx={{ fontSize: "1.3em", ml: "0.2em" }} />
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ ...formValues }}
                        validationSchema={validation}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <Grid container spacing={2} sx={{ p: 2 }} >
                            <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        mt: '1em'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "gray",
                                            textAlign: "center",
                                            fontFamily: "FontePersonalizada"
                                        }}
                                    >
                                        Cidade
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Textfield 
                                        name="cep"
                                        label="CEP"
                                        cepFormat={true}
                                        onKeyUp={(ev) => onBlurCep(ev)}
                                        error={formValues.errorCep}
                                        setError={setFormValues}
                                        helperText={formValues.errorCep ? "Cep Inválido" : ""}
                                    />
                                </Grid>
                                <Grid item xs={0} md={12}></Grid>
                                <Grid item xs={12} md={6}>
                                    <Textfield 
                                        name="estado"
                                        label="UF"
                                        value={formValues.estado}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Textfield 
                                        name="cidade"
                                        label="Cidade"
                                        value={formValues.cidade}
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Typography
                                        sx={{
                                            color: "gray",
                                            textAlign: "center",
                                            fontFamily: "FontePersonalizada"
                                        }}
                                    >
                                        Plantação
                                    </Typography>
                                    <Divider />
                                </Grid>
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
                                                name="planta"
                                                {...params}
                                                label="Planta"
                                                variant="standard"
                                            />
                                        }
                                        value={autoComplete}
                                        onChange={(ev, newValue) => handleChangeAutoComplete(newValue)}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Autocomplete
                                        options={type}
                                        renderInput={
                                            (params) => <TextField
                                                {...params}
                                                name="tipo"
                                                label="Tipo"
                                                variant="standard"
                                            />
                                        }
                                        value={autoCompleteType}
                                        onChange={(ev, newValue) => handleChangeAutoCompleteType(newValue)}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Textfield 
                                        name="area"
                                        label="Área da plantação (ha)"
                                        numeric={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{textAlign:"center"}} >
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={formValues.loading}
                                        sx={{
                                            backgroundColor: "#76a79c",
                                            borderColor: "#76a79c",
                                            "&:hover": {
                                                backgroundColor: "#889c9b",
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