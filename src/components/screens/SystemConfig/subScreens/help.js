import { useMutation } from "@apollo/client";
import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Textfield from "../../../ourComponents/TextField";
import * as Yup from "yup";
import { autoDecodeToken } from "../../Login/token/decodeToken";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";

const HelpUserScreen = () => {
    const decodedToken = autoDecodeToken();

    const [formValues, setFormValues] = useState({
        assunto: "",
        descricao: "",
        loading: false,
    })

    const validation = Yup.object().shape({
        assunto: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string().required("Campo obrigatório"),
    });

    const handleSubmit = (values) => {
        setFormValues({
            ...formValues,
            loading: true,
        })

        const e = {
            from_name: decodedToken.nome,
            subject: values.assunto,
            message: values.descricao,
            email: decodedToken.email,
        };
        emailjs.send("service_2oztc88", "template_bexg3oa", e, "ujk5gsEJLbt7yfKRG")
        .then((res) => {
            toast.success("Email enviado")
            setFormValues({
                assunto: "",
                descricao: "",
            })
        })
    }

    return(
        <>
            <Grid 
                container 
                spacing={2}
                sx={{
                    minHeight: "100%",
                    maxHeight: "auto"
                }}
            >
                <Grid 
                    item 
                    xs={12}
                >
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontSize: "1.5em",
                            fontWeight: 600
                        }}
                    >
                        Ajuda
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontSize: "1.5em",
                        }}
                    >
                        Versão do sistema:
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontSize: "2em",
                            fontWeight: 700
                        }}
                    >
                        V1.0
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        textAlign: "center",
                        height: "100%"
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "FontePersonalizada",
                            fontSize: "1.2em",
                            textAlign: "left"
                        }}
                    >
                        Reportar bugs
                    </Typography>
                    <Formik
                        initialValues={{ ...formValues }}
                        validationSchema={validation}
                        onSubmit={
                            (values, { resetForm }) => { handleSubmit(values); resetForm() }
                        }
                    >
                        <Form>
                            <Grid container spacing={2} sx={{ p: 2 }} >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Textfield 
                                        name="assunto"
                                        placeholder="Assunto"
                                        contained={true}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Textfield
                                        name="descricao"
                                        placeholder="descrição"
                                        contained={true}
                                        multiline={true}
                                    />
                                </Grid>
                                <Grid 
                                    item 
                                    xs={3} 
                                    sx={{
                                        textAlign:"right",
                                        ml: "auto"
                                    }} 
                                >
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={formValues.loading}
                                        fullWidth
                                        sx={{
                                            color: "black",
                                            backgroundColor: "#76a79c",
                                            borderColor: "#76a79c",
                                            "&:hover": {
                                                backgroundColor: "#889c9b",
                                                borderColor: "#889c9b"
                                            }
                                        }}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Grid>
            </Grid>
            <div><Toaster/></div>
        </>
    )
}

export default HelpUserScreen