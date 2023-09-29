import { Box, Button, DialogContent, Divider, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import moment from "moment";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals"
import Textfield from "../../../ourComponents/TextField";


export const ModalInfoHarvest = (props) => {
    const {
        openModal, 
        setOpenModal,
        isEdit,
    } = props;

    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({
        plantacao: {
            descricao: "",
            tipo: "",
            data: "",
            cidade: "",
            estado: "",
            area: "",
        },
        planta: {
            descricao: "",
            area: "",
            adubo: "",
            agua: "",
            calcario: "",
            insumos: ""
        },
        plantaPlantacao: {
            plantaPorPlantacao: ""
        },
        safra: {
            descricao: "",
            data_safra: moment(new Date()).format("YYYY-MM-DD")
        }
    })

    useEffect(() => {
        if(openModal.modalInfo) {
            setOpen(true);

            valueInsert()
        }
    }, [openModal.modalInfo]);

    const handleClose = async () => {
        await setOpen(false);
        setTimeout(() => {
            setOpenModal({
                ...openModal,
                modalInfo: false
            })
        }, 1000);
    };

    const valueInsert = async() => {
        setFormValues({
            ...formValues,
            plantacao: {
                descricao: isEdit?.plantacao?.descricao,
                tipo: isEdit?.plantacao?.tipo,
                data: moment(isEdit?.plantacao?.created_at).format("YYYY-MM-DD"),
                cidade: isEdit?.plantacao?.cidade?.nome,
                estado: isEdit?.plantacao?.cidade?.estado?.uf,
                area: isEdit?.plantacao?.area
            },
            planta: {
                descricao: isEdit?.plantacao?.planta?.nome,
                area: isEdit?.plantacao?.planta?.area,
                adubo: isEdit?.plantacao?.planta?.qtd_adubo,
                agua: isEdit?.plantacao?.planta?.qtd_agua,
                calcario: isEdit?.plantacao?.planta?.qtd_calcario,
                insumos: isEdit?.plantacao?.planta?.qtd_insumos
            },
            plantaPlantacao: {
                plantaPorPlantacao: (isEdit?.plantacao?.area / isEdit?.plantacao?.planta?.area)
            },
            safra: {
                descricao: isEdit?.descricao,
                data_safra: moment(isEdit?.data_safra).format("YYYY-MM-DD"),
            },
        })
    }

    const handleSubmit = async(values) => {
        toast.success("Dados salvos com sucesso")
        handleClose()
    }

    return (
        <>
            <BootstrapDialog open={open} fullWidth={true} maxWidth="lg" >
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
                            Safra: {formValues.safra.descricao}
                        </Typography>
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ ...formValues }}
                        // validationSchema={validation}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <Grid container spacing={2} sx={{ py: 2 }} >
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
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Textfield
                                        name="plantacao.descricao"
                                        label="Descrição"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="plantacao.data"
                                        label="Data de Criação"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="plantacao.tipo"
                                        label="Tipo"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="plantacao.area"
                                        label="Área da plantação"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="plantaPlantacao.plantaPorPlantacao"
                                        label="Quantidade de Plantas disponíveis"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="plantacao.estado"
                                        label="Estado"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="plantacao.cidade"
                                        label="Cidade"
                                        disabled
                                    />
                                </Grid>
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
                                        Planta
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="planta.descricao"
                                        label="Nome da planta"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="planta.area"
                                        label="Espaçamento da planta"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="planta.adubo"
                                        label="Adubo necessário"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="planta.agua"
                                        label="Agua necessária"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="planta.calcario"
                                        label="Calcário necessário"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="planta.insumos"
                                        label="Insumos necessários"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{textAlign:"center"}} >
                                    <Button
                                        variant="cointaned"
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