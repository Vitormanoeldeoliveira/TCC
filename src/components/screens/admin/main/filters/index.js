import { Grid, Button } from "@mui/material"
import { Form, Formik } from "formik"
import { useState } from "react"
import Textfield from "../../../../ourComponents/TextField"

export const FilterUser = ({ setFilter, handleSelect }) => {

    const [formValues, setFormValues] = useState({
        id: "",
        email: "",
        nome: "",
        excluido: false
    })

    const handleSubmit = (values) => {
        console.log(values);
        setFilter(values)
    }

    return (
        <>
            <Formik
                initialValues={{ ...formValues }}
                onSubmit={(values) => handleSubmit(values)}
            >
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Textfield
                                name="email"
                                label="Email"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }} >
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
                </Form>
            </Formik>
        </>
    )
}

export const FilterPlant = () => {
    return (
        <>
            planta
        </>
    )
}

export const FilterPlantation = () => {
    return (
        <>
            plantação
        </>
    )
}

export const FilterHarvest = () => {
    return (
        <>
            arroz
        </>
    )
}