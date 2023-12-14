import { Box, Button, DialogContent, Divider, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import moment from "moment";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Textfield from "../../../../ourComponents/TextField";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const Profit = ({ isEdit, handleClose }) => {
    const [formValues, setFormValues] = useState({
        periodo: isEdit?.days?.periodo,
        lucro_dia: isEdit?.days?.lucro_dia,
        lucro_total: isEdit?.days?.lucro_total
    })

    const handleSubmit = async (values) => {
        toast.success("Dados salvos com sucesso")
        handleClose()
    }

    return (
        <>
            <Box sx={{ width: "100%", textAlign: "center", my: 3 }} >
                {
                    Number(formValues.lucro_total.toString().replace(',', '.')) > 100 ?
                        (
                            <>
                                <CheckCircleOutlineIcon
                                    sx={{
                                        fontSize: "6em",
                                        color: "#60bca9"
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: "#60bca9"
                                    }}
                                >
                                    Safra bem sucedida
                                </Typography>
                            </>
                        ) : (
                            <>
                                <ErrorOutlineIcon
                                    sx={{
                                        fontSize: "6em",
                                        color: "#9b3d25"
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: "#9b3d25"
                                    }}
                                >
                                    Parece que a safra não foi lucrativa
                                </Typography>
                            </>
                        )
                }
            </Box>
            <Formik
                initialValues={{ ...formValues }}
                // validationSchema={validation}
                onSubmit={(values) => handleSubmit(values)}
            >
                <Form>
                    <Grid container spacing={2} sx={{ py: 2 }} >
                        <Grid
                            item
                            xs={12} md={4}
                        >
                            <Textfield
                                name="periodo"
                                label="Duração da Safra(dias)"
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12} md={4}
                        >
                            <Textfield
                                name="lucro_dia"
                                label="Lucro por dia"
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12} md={4}
                        >
                            <Textfield
                                name="lucro_total"
                                label="Lucro total"
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