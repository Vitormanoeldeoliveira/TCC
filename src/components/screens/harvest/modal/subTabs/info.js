import { Box, Button, DialogContent, Divider, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import moment from "moment";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Textfield from "../../../../ourComponents/TextField";

export const InfoHarvest = ({ isEdit, handleClose }) => {
    const [formValues, setFormValues] = useState({
        plantacao: {
            descricao: isEdit?.plantacao?.descricao,
            tipo: isEdit?.plantacao?.tipo,
            data: moment(isEdit?.plantacao?.created_at).format("DD/MM/YYYY"), //alerta
            cidade: isEdit?.plantacao?.cidade,
            estado: isEdit?.plantacao?.uf,
            area: isEdit?.plantacao?.area.toFixed(2).toString().replace('.', ',')
        },
        planta: {
            descricao: isEdit?.plantacao?.planta?.descricao,
            area: isEdit?.plantacao?.planta?.area.toFixed(2).toString().replace('.', ','),
            adubo: isEdit?.plantacao?.planta?.qtd_adubo.toFixed(2).toString().replace('.', ','),
            agua: isEdit?.plantacao?.planta?.qtd_agua.toFixed(2).toString().replace('.', ','),
            calcario: isEdit?.plantacao?.planta?.qtd_calcario.toFixed(2).toString().replace('.', ','),
            insumos: isEdit?.plantacao?.planta?.qtd_insumos.toFixed(2).toString().replace('.', ',')
        },
        plantaPlantacao: {
            plantaPorPlantacao: (
                (isEdit?.plantacao?.area * 10000) /
                isEdit?.plantacao?.planta?.area
            ).toFixed(0)
        },
        safra: {
            descricao: isEdit?.descricao,
            data_safra: moment(isEdit?.data_safra).format("DD/MM/YYYY"),
        },
    })

    const handleSubmit = async (values) => {
        toast.success("Dados salvos com sucesso")
        handleClose()
    }

    return (
        <>
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
                                label="Área da plantação (ha)"
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
                                label="Espaçamento da planta (m)"
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12} md={6}
                        >
                            <Textfield
                                name="planta.adubo"
                                label="Adubo necessário (kg)"
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12} md={6}
                        >
                            <Textfield
                                name="planta.agua"
                                label="Água necessária (l/ha)"
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12} md={6}
                        >
                            <Textfield
                                name="planta.calcario"
                                label="Calcário necessário (kg)"
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12} md={6}
                        >
                            <Textfield
                                name="planta.insumos"
                                label="Defensores necessários (kg)"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }} >
                            <Button
                                variant="cointaned"
                                type="submit"
                                sx={{
                                    backgroundColor: "#5E86DB",
                                    color: "white",
                                    borderColor: "#b4cfce",
                                    "&:hover": {
                                        backgroundColor: "#4E6FB5",
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
            <div><Toaster /></div>
        </>
    )
}