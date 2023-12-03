import { useMutation, } from "@apollo/client";
import { Box, Button, DialogContent, Divider, Grid, Typography } from "@mui/material"
import { differenceInDays, parseISO } from "date-fns";
import { Form, Formik } from "formik"
import moment from "moment";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals"
import Textfield from "../../../ourComponents/TextField";
import { CREATE_HARVEST_EXPENSE, CREATE_PROFIT, UPDATE_HARVEST_EXPENSE, UPDATE_PROFIT } from "../../../requires/api.require";
import { autoDecodeToken } from "../../Login/token/decodeToken";

export const ModalProfit = (props) => {
    const {
        openModal,
        setOpenModal,
        refetchTableData,
        isEdit,
        valuesExpense,
        valuesProfit,
    } = props;

    const decodedToken = autoDecodeToken()

    const [open, setOpen] = useState(false);

    const [addHarvestExpense] = useMutation(CREATE_HARVEST_EXPENSE)
    const [updateHarvestExpense] = useMutation(UPDATE_HARVEST_EXPENSE)
    const [addProfit] = useMutation(CREATE_PROFIT)
    const [updateProfit] = useMutation(UPDATE_PROFIT)

    const [formValues, setFormValues] = useState({
        gasto: {
            adubo: "",
            insumo: "",
            calcario: "",
            inicial: "",
            hora_trabalhada: "",
            hora_trabalho: ""
        },
        lucro: {
            qtd_venda: "",
            valor_venda: "",
            periodo_venda: moment(new Date()).format("YYYY-MM-DD"),
            tempo_total: 0,
            lucro_dia: "",
        },
        lucroGasto: "",
        loading: false,
        campoErro: false
    })

    useEffect(() => {
        if (openModal.modalRenda) {
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

    const valueInsert = async () => {
        const parsedDate1 = parseISO(valuesProfit?.data?.getAllProfit[0]?.periodo_venda);
        const parsedDate2 = parseISO(isEdit?.data_safra);

        const daysDifference = Math.abs(differenceInDays(parsedDate2, parsedDate1));

        setFormValues({
            ...formValues,
            lucro: {
                qtd_venda: !valuesProfit.data?.getAllProfit[0] ? ""
                    : valuesProfit.data.getAllProfit[0]?.qtd_venda,
                valor_venda: !valuesProfit.data?.getAllProfit[0] ? ""
                    : valuesProfit.data.getAllProfit[0]?.valor_venda.toFixed(2).toString().replace('.', ','),
                periodo_venda: !valuesProfit.data?.getAllProfit[0] ? moment(new Date()).format("YYYY-MM-DD")
                    : moment(valuesProfit.data?.getAllProfit[0]?.periodo_venda).format("YYYY-MM-DD"),
                tempo_total: !valuesProfit.data?.getAllProfit[0] ? 0 :
                    (
                        daysDifference
                    ),
                lucro_dia: !valuesProfit.data?.getAllProfit[0] ? "" :
                    (
                        ((
                            valuesProfit.data.getAllProfit[0]?.qtd_venda *
                            valuesProfit.data.getAllProfit[0]?.valor_venda
                        ) - (
                                valuesExpense.data.getAllHarvestExpense[0]?.preco_adubo +
                                valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario +
                                valuesExpense.data.getAllHarvestExpense[0]?.preco_insumos +
                                valuesExpense.data.getAllHarvestExpense[0]?.valor_inicial +
                                (
                                    (
                                        valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalho *
                                        valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalhada
                                    ) * (
                                        (
                                            daysDifference
                                        )
                                    )
                                )
                            )) / (
                            daysDifference
                        )
                    ).toFixed(2).toString().replace('.', ','),
            },
            gasto: {
                adubo: !valuesExpense.data?.getAllHarvestExpense[0] ? ""
                    : valuesExpense.data?.getAllHarvestExpense[0]?.preco_adubo.toFixed(2).toString().replace('.', ','),
                insumo: !valuesExpense.data?.getAllHarvestExpense[0] ? ""
                    : valuesExpense.data?.getAllHarvestExpense[0]?.preco_insumos.toFixed(2).toString().replace('.', ','),
                calcario: !valuesExpense.data?.getAllHarvestExpense[0] ? ""
                    : valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario.toFixed(2).toString().replace('.', ','),
                inicial: !valuesExpense.data?.getAllHarvestExpense[0] ? ""
                    : valuesExpense.data?.getAllHarvestExpense[0]?.valor_inicial.toFixed(2).toString().replace('.', ','),
                hora_trabalhada: !valuesExpense.data?.getAllHarvestExpense[0] ? ""
                    : valuesExpense?.data?.getAllHarvestExpense[0]?.hora_trabalhada.toFixed(2).toString().replace('.', ','),
                hora_trabalho: !valuesExpense.data?.getAllHarvestExpense[0] ? ""
                    : valuesExpense?.data?.getAllHarvestExpense[0]?.hora_trabalho.toFixed(2).toString().replace('.', ',')
            },
            lucroGasto: !valuesProfit.data?.getAllProfit[0] ? "" :
                (
                    (
                        valuesProfit.data.getAllProfit[0]?.qtd_venda *
                        valuesProfit.data.getAllProfit[0]?.valor_venda
                    ) - (
                        valuesExpense.data.getAllHarvestExpense[0]?.preco_adubo +
                        valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario +
                        valuesExpense.data.getAllHarvestExpense[0]?.preco_insumos +
                        valuesExpense.data.getAllHarvestExpense[0]?.valor_inicial +
                        (
                            valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalho *
                            valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalhada
                        ) * (
                            daysDifference
                        )
                    )
                ).toFixed(2).toString().replace('.', ',')
        })
    }

    const handleSubmit = async (values) => {
        setFormValues({
            ...formValues,
            loading: true,
        });

        const parsedDate1 = parseISO(values.lucro.periodo_venda);
        const parsedDate2 = parseISO(isEdit?.data_safra);

        const daysDifference = Math.abs(differenceInDays(parsedDate2, parsedDate1));

        // if (Number(daysDifference) <= 0) {
        if (
            values.lucro.periodo_venda <= isEdit?.data_safra
        ) {
            setFormValues({
                ...formValues,
                loading: false,
                campoErro: true
            })
            return
        }

        const dataExpense = values.gasto
        const dataProfit = values.lucro

        const harvestExpense = {
            id_safra: Number(isEdit?.id),
            preco_adubo: Number(dataExpense?.adubo.replace(',', '.')),
            preco_calcario: Number(dataExpense?.calcario.replace(',', '.')),
            preco_insumos: Number(dataExpense?.insumo.replace(',', '.')),
            valor_inicial: Number(dataExpense?.inicial.replace(',', '.')),
            hora_trabalho: Number(dataExpense?.hora_trabalho.replace(',', '.')),
            hora_trabalhada: Number(dataExpense?.hora_trabalhada.replace(',', '.'))
        }

        const profit = {
            valor_venda: Number(dataProfit?.valor_venda.replace(',', '.')),
            qtd_venda: Number(dataProfit?.qtd_venda),
            periodo_venda: dataProfit?.periodo_venda,
            id_safra: Number(isEdit?.id),
            id_usuario: Number(decodedToken?.id)
        }

        if (!valuesExpense.data?.getAllHarvestExpense[0]) {
            try {
                const idExpense = await addHarvestExpense({
                    variables: { harvestExpense }
                })

                await addProfit({
                    variables: {
                        profit: {
                            ...profit,
                            id_gasto: Number(idExpense.data.createHarvestExpense?.id)
                        }
                    }
                })
            } catch (e) {
                setFormValues({
                    ...formValues,
                    loading: false
                })
                console.log(e);
            }
        } else {
            const idExpense = Number(valuesExpense.data.getAllHarvestExpense[0]?.id)
            const idProfit = Number(valuesProfit.data.getAllProfit[0]?.id)

            try {
                await updateHarvestExpense({
                    variables: {
                        harvestExpense,
                        updateHarvestExpenseId: Number(idExpense),
                    }
                })

                updateProfit({
                    variables: {
                        profit: {
                            ...profit,
                            id_gasto: Number(valuesExpense.data.getAllHarvestExpense[0]?.id),
                        },
                        updateProfitId: Number(idProfit),
                    }
                })
            } catch (e) {
                setFormValues({
                    ...formValues,
                    loading: false
                })
                console.log(e);
            }
        }

        toast.success("Dados salvos com sucesso")
        refetchTableData()
        handleClose()
        // const novaURL = 'http://localhost:3000/harvest'
        // window.location.href = novaURL;
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
                            Receitas e Despesas
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
                                        Investimento
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.adubo"
                                        numeric={true}
                                        label="Gastos em adubo"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.insumo"
                                        numeric={true}
                                        label="Gastos em defensivos"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.calcario"
                                        numeric={true}
                                        label="Gastos em calcario"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.inicial"
                                        numeric={true}
                                        label="Gasto inicial"
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
                                        Funcionário (opicional)
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.hora_trabalho"
                                        numeric={true}
                                        label="Custo da hora de trabalho"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="gasto.hora_trabalhada"
                                        numeric={true}
                                        label="Horas trabalhadas por dia"
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
                                        Vendas
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucro.periodo_venda"
                                        type="Date"
                                        label="Fim da colheita"
                                        error={formValues.campoErro}
                                        setError={setFormValues}
                                        helperText={formValues.campoErro ? "Data Inválida" : ""}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={6}
                                >
                                    <Textfield
                                        name="lucro.tempo_total"
                                        disabled
                                        label="Periodo de tempo(dias)"
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
                                        numeric={true}
                                        label="Valor da venda"
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
                                        Lucro geral
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Textfield
                                        disabled
                                        variant="filled"
                                        name="lucro.lucro_dia"
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
                                            color: formValues.lucroGasto >= 0 ? "green" : "red"
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: "center" }} >
                                    <Button
                                        variant="cointaned"
                                        type="submit"
                                        disabled={formValues.loading}
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
            <div><Toaster /></div>
        </>
    )
}