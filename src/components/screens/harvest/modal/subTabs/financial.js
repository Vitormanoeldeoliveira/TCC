import { useMutation, } from "@apollo/client";
import { Button, Divider, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import moment from "moment";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Textfield from "../../../../ourComponents/TextField";
import { CREATE_HARVEST_EXPENSE, CREATE_PROFIT, UPDATE_HARVEST_EXPENSE, UPDATE_PROFIT } from "../../../../requires/api.require";
import { autoDecodeToken } from "../../../Login/token/decodeToken";

export const Financial = ({ isEdit, valuesExpense, valuesProfit, isSelected, refetchTableData, handleClose }) => {
    const decodedToken = autoDecodeToken()

    const [addHarvestExpense] = useMutation(CREATE_HARVEST_EXPENSE)
    const [updateHarvestExpense] = useMutation(UPDATE_HARVEST_EXPENSE)
    const [addProfit] = useMutation(CREATE_PROFIT)
    const [updateProfit] = useMutation(UPDATE_PROFIT)

    const [formValues, setFormValues] = useState({
        lucro: {
            qtd_venda: !valuesProfit.data?.getAllProfit[0] ? ""
                : valuesProfit.data.getAllProfit[0]?.qtd_venda,
            valor_venda: !valuesProfit.data?.getAllProfit[0] ? ""
                : valuesProfit.data.getAllProfit[0]?.valor_venda.toFixed(2).toString().replace('.', ','),
            periodo_venda: !valuesProfit.data?.getAllProfit[0] ? moment(new Date()).format("YYYY-MM-DD")
                : moment(valuesProfit.data?.getAllProfit[0]?.periodo_venda).format("YYYY-MM-DD"),
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
        loading: false,
        campoErro: false
    })

    const handleSubmit = async (values) => {
        setFormValues({
            ...formValues,
            loading: true,
        });

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


                toast.success("Dados salvos com sucesso")
                refetchTableData()

                handleClose()
                const novaURL = 'http://localhost:3000/harvest'
                window.location.href = novaURL;
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


                toast.success("Dados salvos com sucesso")
                refetchTableData()

                handleClose()
            } catch (e) {
                setFormValues({
                    ...formValues,
                    loading: false
                })
                console.log(e);
            }
        }
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
                        <Grid item xs={0} md={6} ></Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }} >
                            <Button
                                variant="cointaned"
                                type="submit"
                                disabled={formValues.loading}
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