import { useEffect, useState } from "react";

import { Box, Button, DialogContent, Grid, InputAdornment, Typography } from "@mui/material"
import ModeIcon from '@mui/icons-material/Mode';
import { BootstrapDialog, BootstrapDialogTitle } from "../../../../ourComponents/Modals"

import { Form, Formik } from "formik";
import Textfield from '../../../../ourComponents/TextField'
import { autoDecodeToken } from "../../../Login/token/decodeToken";

export const UpdateUser = (props) => {
  const decodedToken = autoDecodeToken();

  const {openModal, setOpenModal} = props;

  const [open, setOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    nome: decodedToken.nome,
    email: decodedToken.email,
    senha: ""
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

  const handleSubmit = (values) => {
    if(values.email == decodedToken.email) {
      console.log("Atualizar");
    } else {
      console.log("Trocar email");
    }
  };

  const handleChangeDisabled = (ev) => {
    console.log(ev);
    const name = ev;

    setBoolean({
      ...boolean,
        [name]: false
    })
  }

  const ChangePass = () => {
    setBoolean({
      ...boolean,
        changePassEnable: true
    })
  }

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
    </>
  )
}