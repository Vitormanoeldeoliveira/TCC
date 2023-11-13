import { useEffect, useState } from "react";

import { Box, Button, DialogContent, Grid, InputAdornment, Typography } from "@mui/material"
import ModeIcon from '@mui/icons-material/Mode';
import { BootstrapDialog, BootstrapDialogTitle } from "../../../../ourComponents/Modals"

import { Form, Formik } from "formik";
import Textfield from '../../../../ourComponents/TextField'
import { autoDecodeToken } from "../../../Login/token/decodeToken";

import { CREATEVALIDATECODE, UPDATE_USER } from "../../../../requires/api.require";
import { useMutation } from "@apollo/client";

import { Toaster, toast } from "react-hot-toast";
import VisibilityIcon from '@mui/icons-material/Visibility';

import { ValidatePassword } from "./password/passwordPermission";
import { ValidateEmail } from "../../../Login/dialog";

import * as Yup from "yup";

export const UpdateUser = (props) => {
  const [updateUser] = useMutation(UPDATE_USER)
  const [validateCode] = useMutation(CREATEVALIDATECODE)

  const decodedToken = autoDecodeToken();

  const {openModal, setOpenModal} = props;

  const [open, setOpen] = useState(false);

  const [ dialogOpen, setDialogOpen ] = useState({
    email: "",
    senha: "",
  })

  const [formValues, setFormValues] = useState({
    nome: decodedToken.nome,
    email: decodedToken.email,
    senha: "",
    valido: false,
    validPass: false,
    campoErro: false,
    loading: false
  });

  const [boolean, setBoolean] = useState({
    nome: true,
    email: true,
    changePassEnable: false,
    passwordView: false
  })

  const validation = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Preencha corretamente").required("Campo obrigatório"),
  });

  useEffect(() => {
      if(openModal.modalUpdateUser) {
          setOpen(true);
      }
  }, [openModal.modalUpdateUser]);

  const handleClose = async () => {
    await setOpen(false);
    setTimeout(() => {
        setOpenModal({
            ...openModal,
            modalUpdateUser: false
        })
    }, 1000);
  };

  const handleSubmit = async(values) => {
    setFormValues({
      ...formValues,
      loading: true
    })

    let verifyRealUpdate = false

    for(let field in boolean) {
      if(field === "email" || field === "nome") {
        if(boolean[field] === false) {
          verifyRealUpdate = true
        }
      } else if(field === "changePassEnable") {
        if(boolean[field] === true) {
          if(values.senha) {
            verifyRealUpdate = true
          }
        }
      }
    };

    setFormValues({
      ...formValues,
      loading: false
    })

    if(verifyRealUpdate) {
      if(values.email !== decodedToken.email) {
        await emailChange(values)
      } else {
        await basicUserChange(values)
      }
    } else {
      setFormValues({
        ...formValues,
        loading: false
      })
      toast.error("Parece que não foram feitas atualizações")
    }
  };

  const emailChange = async(values) => {
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

    setDialogOpen({
      ...dialogOpen,
        email: true
    })
  };

  const basicUserChange = async(values) => {
      const filter = {}

      for(let field in values) {
        if(field !== "email") {
          if(values[field]) {
            filter[field] = values[field]
          }
        }
      }

      try {
        await updateUser({
          variables: {
            user: filter,
            updateUserId: decodedToken.id
          }
        })
  
        toast.success("Usuário atualizado com sucesso")
        handleClose()
  
        setTimeout(() => {
          localStorage.setItem('token', "" );
  
          const novaURL = 'http://localhost:3000'
          window.location.href = novaURL;
        }, 1500)
      } catch {
        setFormValues({
          ...formValues,
          loading: false
        })
        toast.error("Erro na atualização")
      }
  }

  const handleChangeDisabled = (ev) => {
    const name = ev;

    setBoolean({
      ...boolean,
        [name]: false
    })
  }

  const ChangePass = async() => {
    setDialogOpen({
      ...dialogOpen,
        senha: true
    })
  };

  const handleChangeView = () => {
    setBoolean({
      ...boolean,
      passwordView: boolean.passwordView ? false : true
    })
  };

  useEffect(() => {
    if(formValues.validPass) {
      setBoolean({
        ...boolean,
          changePassEnable: true
      })
    }
  },[formValues.validPass])

  return (
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
                  Informações do Usuário
                </Typography>
            </Box>
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography
            fontSize="0.8em"
            sx={{
              fontFamily: "FontePersonalizada",
              textAlign: "center"
            }}
          >
            *Necessário logar novamente no sistema
          </Typography>
          <Formik
            initialValues={{ ...formValues }}
            validationSchema={validation}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <Grid container spacing={2} sx={{ p: 2 }} >
                <Grid item xs={12}>
                  <Textfield 
                    name="nome"
                    label="Nome"
                    disabled={boolean.nome}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ModeIcon 
                            onClick={() => handleChangeDisabled("nome")}
                            sx={{
                              cursor:"pointer",
                              "&:hover": {
                                color: "#52a0e3",
                              },
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textfield 
                    name="email"
                    label="Email"
                    disabled={boolean.email}
                    error={formValues.campoErro}
                    setError={setFormValues}
                    helperText={formValues.campoErro ? "Email já cadastrado" : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ModeIcon 
                            onClick={() => handleChangeDisabled("email")}
                            sx={{
                              cursor:"pointer",
                              "&:hover": {
                                color: "#52a0e3",
                              },
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid 
                  item 
                  xs={12}
                  sx={{
                    display: boolean.changePassEnable ? "block" : "none"
                  }}
                >
                  <Textfield
                      name="senha"
                      size="small"
                      fullWidth
                      label="Senha"
                      type={boolean.passwordView ? "text" : "password"}
                      autoComplete="off"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityIcon 
                              onClick={() => handleChangeView()}
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
                <Grid item xs={12}>
                  <Typography
                      onClick={() => ChangePass()}
                      sx={{
                        width: "10em",
                        display: boolean.changePassEnable ? "none" : "block",
                        textAlign: "center",
                        ml: "auto",
                        mr: "auto",
                        cursor: "pointer",
                        fontFamily: "FontePersonalizada",
                        "&:hover": {
                          color: "#52a0e3",
                        }, 
                      }} 
                    >
                      Trocar senha
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{textAlign:"center"}} >
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
              </Grid>
            </Form>
          </Formik>
        </DialogContent>
      </BootstrapDialog>
      <div><Toaster/></div>
      {dialogOpen.senha && (
        <ValidatePassword 
          setOpenDialog={setDialogOpen}
          openDialog={dialogOpen}
          validadeValue={formValues}
          setValidadeValue={setFormValues}
        /> 
      )}
      {dialogOpen.email && (
        <ValidateEmail 
          setOpenDialog={setDialogOpen}
          openDialog={dialogOpen}
          validadeValue={formValues}
          setValidadeValue={setFormValues}
          modalControl={open}
          setModalControl={setOpenModal}
          decodedToken={decodedToken}
          tela="UpdateUser"
        /> 
      )}
    </>
  )
};