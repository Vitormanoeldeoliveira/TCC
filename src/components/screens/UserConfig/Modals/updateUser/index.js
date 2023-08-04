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

import { ValidatePassword } from "./password/passwordPermission";

export const UpdateUser = (props) => {
  const [updateUser, {loading, error}] = useMutation(UPDATE_USER)
  const [validateCode, {loadingCode, errorCode}] = useMutation(CREATEVALIDATECODE)

  const decodedToken = autoDecodeToken();

  const {openModal, setOpenModal} = props;

  const [open, setOpen] = useState(false);

  const [ dialogOpen, setDialogOpen ] = useState(false)

  const [formValues, setFormValues] = useState({
    nome: decodedToken.nome,
    email: decodedToken.email,
    validPass: false
  });

  const [boolean, setBoolean] = useState({
    nome: true,
    email: true,
    changePassEnable: false
  })

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
    nameChange(values)
    emailChange(values)
    // passwordChange(values)
  };

  const emailChange = async(values) => {
    if(values.email != decodedToken.email) {
      console.log("Não está pronto");
    }
  };

  const nameChange = async(values) => {
      try {
        await updateUser({
          variables: {
              user: {
                nome: values.nome,
                senha: values.senha 
              },
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
    setDialogOpen(true)
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
            // validationSchema={validation}
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
                <Grid item xs={12} >
                  <Textfield 
                    name="senha"
                    label="Senha"
                    sx={{
                      display: boolean.changePassEnable ? "block" : "none"
                    }}
                  />
                  <Typography
                    onClick={() => ChangePass()}
                    sx={{
                      display: boolean.changePassEnable ? "none" : "block",
                      textAlign: "center",
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
                    variant="outlined"
                    type="submit"
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
      {dialogOpen && (
        <ValidatePassword 
          setOpenDialog={setDialogOpen}
          openDialog={dialogOpen}
          validadeValue={formValues}
          setValidadeValue={setFormValues}
        /> 
      )}
    </>
  )
};