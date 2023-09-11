import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Box, Button, DialogContent, Divider, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import moment from "moment";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals"
import Textfield from "../../../ourComponents/TextField";
import { CREATE_HARVEST_EXPENSE, CREATE_PROFIT, GET_HARVEST_EXPENSE } from "../../../requires/api.require";

export const ModalInfoHarvest = (props) => {
    const {
        openModal, 
        setOpenModal, 
        refetchTableData, 
        isEdit, 
        valuesExpense, 
        valuesProfit, 
        decript
    } = props;

    const [open, setOpen] = useState(false);

    const [addHarvestExpense] = useMutation(CREATE_HARVEST_EXPENSE)
    const [addProfit] = useMutation(CREATE_PROFIT)

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
        gasto: {
            adubo: "",
            insumo: "",
            calcario: "",
            inicial: ""
        },
        lucro: {
            qtd_venda: "",
            valor_venda: "",
            periodo_venda: moment(new Date()).format("YYYY-MM-DD"),
        },
        lucroGasto: "",
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
            lucro: {
                qtd_venda: !valuesProfit.data.getAllProfit[0] ? "" 
                    : valuesProfit.data.getAllProfit[0].qtd_venda,
                valor_venda: !valuesProfit.data.getAllProfit[0] ? "" 
                    : valuesProfit.data.getAllProfit[0].valor_venda,
                periodo_venda: !valuesProfit.data.getAllProfit[0] ? moment(new Date()).format("YYYY-MM-DD") 
                    : moment(valuesProfit.data.getAllProfit[0].periodo_venda).format("YYYY-MM-DD"),
            },
            gasto: {
                adubo: !valuesExpense.data.getAllHarvestExpense[0] ? "" 
                    : valuesExpense.data.getAllHarvestExpense[0].preco_adubo,
                insumo: !valuesExpense.data.getAllHarvestExpense[0] ? "" 
                    : valuesExpense.data.getAllHarvestExpense[0].preco_calcario,
                calcario: !valuesExpense.data.getAllHarvestExpense[0] ? "" 
                    : valuesExpense.data.getAllHarvestExpense[0].preco_insumos,
                inicial: !valuesExpense.data.getAllHarvestExpense[0] ? "" 
                    : valuesExpense.data.getAllHarvestExpense[0].valor_inicial,
            },
            lucroGasto:
                ((
                    valuesProfit.data.getAllProfit[0]?.qtd_venda * 
                    valuesProfit.data.getAllProfit[0]?.valor_venda
                ) - (
                    valuesExpense.data.getAllHarvestExpense[0]?.preco_adubo +
                    valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario +
                    valuesExpense.data.getAllHarvestExpense[0]?.preco_insumos +
                    valuesExpense.data.getAllHarvestExpense[0]?.valor_inicial
                ))
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
                                        Gastos e Lucros
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.adubo"
                                        type="number"
                                        label="Valor investido em adubo"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.insumo"
                                        type="number"
                                        label="Valor investido em insumos"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.calcario"
                                        type="number"
                                        label="Valor investido em calcario"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.inicial"
                                        type="number"
                                        label="Valor inicial investido"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucro.qtd_venda"
                                        type="number"
                                        label="Quantidade vendida"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucro.valor_venda"
                                        type="number"
                                        label="Valor da venda"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucro.periodo_venda"
                                        type="Date"
                                        label="Tempo de venda"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucroGasto"
                                        label="Lucro Obtido"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{textAlign:"center"}} >
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        sx={{
                                            color: "#da8f73",
                                            borderColor: "#da8f73",
                                            "&:hover": {
                                                color: "#e2c9c2",
                                                borderColor: "#e2c9c2"
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