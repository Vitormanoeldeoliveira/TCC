import { 
  Grid, 
  DialogContent, 
  InputAdornment, 
  IconButton, 
  useTheme, 
  useMediaQuery, 
  Typography,
  Button,
  Box
} from "@mui/material";

import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals";
import * as Yup from "yup";

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useEffect, useState } from "react";
import { Form, Formik } from "formik";

import Textfield from "../../../ourComponents/TextField";

import { ValidateEmail } from "../dialog";

import { CREATEVALIDATECODE } from "../../../requires/api.require";
import { useLazyQuery, useMutation } from "@apollo/client";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const RegisterScreen = (props) => {
  const [validateCode, {loading, error}] = useMutation(CREATEVALIDATECODE)

  const {setOpenModal} = props;

  const [open, setOpen] = useState(false)

  const [ dialogOpen, setDialogOpen ] = useState(false)

  useEffect(() => {
    setOpen(true);
  }, [setOpenModal]);

  const handleClose = async () => {
    await setOpen(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 1000);
  };

  const [formValues, setFormValues] = useState({
    nome:"",
    email:"",
    senha:"",
    campoErro: false,
    validade: false,
    valido: ""
  });

  const validation = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Preencha corretamente").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
  });

  const [passwordView, setPasswordView] = useState(false)

  const handleSubmit = async(values) => {
    const { data } = await validateCode({
      variables: {
        data: {
          email: values.email,
          verifyCode: true
        }
      }
    })

    setFormValues({
      ...formValues,
      ...values,
      valido: data,
    })
    
    setDialogOpen(true)
  };

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
              Cadastro de Usuário
            </Typography>
            <PersonOutlineIcon sx={{ fontSize: "1.3em", ml: "0.2em" }} />
          </Box>
        </BootstrapDialogTitle>
        <DialogContent>
          <>
            <Formik
              initialValues={{ ...formValues }}
              validationSchema={validation}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
                <Grid container spacing={2} sx={{ p:2 }} >
                  <Grid item xs={12}>
                    <Textfield
                      name="nome"
                      size="small"
                      fullWidth
                      label="Nome"
                      autoComplete="off"                 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      name="email"
                      size="small"
                      fullWidth
                      label="Email"
                      autoComplete="off"
                      error={formValues.campoErro}
                      setError={setFormValues}
                      helperText={formValues.campoErro ? "Email já cadastrado" : ""}                
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      name="senha"
                      size="small"
                      fullWidth
                      label="Senha"
                      type={passwordView ? "text" : "password"}
                      autoComplete="off"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityIcon 
                              onClick={() => passwordView ? setPasswordView(false) : setPasswordView(true)}
                              sx={{
                                cursor:"pointer",
                                "&:hover": {
                                  color: "#52a0e3", // Define a cor da borda quando o mouse está sobre o componente
                                },
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}               
                    />
                  </Grid>
                  <Grid item xs={12} sx={{textAlign:"center"}} >
                    <Button
                      variant="outlined"
                      type="submit"
                    >
                      Registrar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </>
        </DialogContent>
      </BootstrapDialog>
            {dialogOpen && (
              <ValidateEmail 
                setOpenDialog={setDialogOpen}
                openDialog={dialogOpen}
                validadeValue={formValues}
                setValidadeValue={setFormValues}
                modalControl={open}
                setModalControl={setOpenModal}
              /> 
            )}
    </>
  );
};

export default RegisterScreen