import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Box, Button, DialogContent, Divider, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import moment from "moment";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals"
import Textfield from "../../../ourComponents/TextField";
import { CREATE_HARVEST_EXPENSE, CREATE_PROFIT, GET_HARVEST_EXPENSE } from "../../../requires/api.require";

export const ModalProfit = (props) => {
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
            tempo_total: moment(new Date()).format("YYYY-MM-DD"),
            lucro_dia: "",
        },
        lucroGasto: "",
    })

    useEffect(() => {
        if(openModal.modalRenda) {
            setOpen(true);

            valueInsert()
        }
    }, [openModal.modalRenda]);

    const handleClose = async () => {
        await setOpen(false);
        setTimeout(() => {
            setOpenModal({
                ...openModal,
                modalRenda: false
            })
        }, 1000);
    };

    const valueInsert = async() => {
        setFormValues({
            ...formValues,
            lucro: {
                qtd_venda: !valuesProfit.data.getAllProfit[0] ? "" 
                    : valuesProfit.data.getAllProfit[0].qtd_venda,
                valor_venda: !valuesProfit.data.getAllProfit[0] ? "" 
                    : valuesProfit.data.getAllProfit[0].valor_venda,
                periodo_venda: !valuesProfit.data.getAllProfit[0] ? moment(new Date()).format("YYYY-MM-DD") 
                    : moment(valuesProfit.data.getAllProfit[0].periodo_venda).format("YYYY-MM-DD"),
                tempo_total: !valuesProfit.data.getAllProfit[0] ? moment(new Date()).format("YYYY-MM-DD") :
                ( 
                    Number(moment(valuesProfit.data.getAllProfit[0].periodo_venda).format("MM"))
                    - Number(moment(isEdit.data_safra).format("MM")) + (
                        Number(moment(valuesProfit.data.getAllProfit[0].periodo_venda).format("MM"))
                            - Number(moment(isEdit.data_safra).format("MM")) > 1 ?
                        " Meses" : " Mês"
                    )
                ),
                lucro_dia: !valuesProfit.data.getAllProfit[0] ? "" :
                ( 
                    ((
                        valuesProfit.data.getAllProfit[0]?.qtd_venda * 
                        valuesProfit.data.getAllProfit[0]?.valor_venda
                    ) - (
                        valuesExpense.data.getAllHarvestExpense[0]?.preco_adubo +
                        valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario +
                        valuesExpense.data.getAllHarvestExpense[0]?.preco_insumos +
                        valuesExpense.data.getAllHarvestExpense[0]?.valor_inicial
                    )) / (
                        (Number(moment(valuesProfit.data.getAllProfit[0].periodo_venda).format("MM"))
                            - Number(moment(isEdit.data_safra).format("MM"))) * 30
                    )
                ),
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
            lucroGasto: !valuesProfit.data.getAllProfit[0] ? "" :
            (
                (
                    valuesProfit.data.getAllProfit[0]?.qtd_venda * 
                    valuesProfit.data.getAllProfit[0]?.valor_venda
                ) - (
                    valuesExpense.data.getAllHarvestExpense[0]?.preco_adubo +
                    valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario +
                    valuesExpense.data.getAllHarvestExpense[0]?.preco_insumos +
                    valuesExpense.data.getAllHarvestExpense[0]?.valor_inicial
                )
            )
        })
    }

    const handleSubmit = async(values) => {
        const dataExpense = values.gasto
        const dataProfit = values.lucro

        if(!valuesExpense.data.getAllHarvestExpense[0]) {
            try {
                await addHarvestExpense({
                    variables: {
                        harvestExpense: {
                            id_safra: Number(isEdit.id),
                            preco_adubo: Number(dataExpense.adubo),
                            preco_calcario: Number(dataExpense.calcario),
                            preco_insumos: Number(dataExpense.insumo),
                            valor_inicial: Number(dataExpense.inicial)
                        }
                    }
                })
            } catch (e) {
                console.log(e);
            }
            try {
                await addProfit({
                    variables: {
                        profit: {
                            valor_venda: Number(dataProfit.valor_venda),
                            qtd_venda: Number(dataProfit.qtd_venda),
                            periodo_venda: dataProfit.periodo_venda,
                            id_safra: Number(isEdit.id),
                            id_gasto: 1,
                        }
                    }
                })
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
            } catch (e) {
                console.log(e);
            }
        }

        toast.success("Dados salvos com sucesso")
        handleClose()
        const novaURL = 'http://localhost:3000/harvest'
        window.location.href = novaURL;
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
                            Lucros e Gastos
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
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.adubo"
                                        type="number"
                                        label="Valor investido em adubo"
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
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.hora_trabalho"
                                        type="number"
                                        label="Custo da hora de trabalho"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.hora_trabalhada"
                                        type="number"
                                        label="Horas trabalhadas por dia"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucro.periodo_venda"
                                        type="Date"
                                        label="Fim da colheita"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucro.tempo_total"
                                        disabled
                                        label="Periodo de tempo"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Textfield
                                        name="lucro.lucro_dia"
                                        disabled
                                        label="Lucro por dia"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Textfield
                                        name="lucroGasto"
                                        label="Lucro Total Obtido"
                                        disabled
                                        sx={{
                                            color: formValues.lucroGasto > 0 ? "green" : "red"
                                        }}
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