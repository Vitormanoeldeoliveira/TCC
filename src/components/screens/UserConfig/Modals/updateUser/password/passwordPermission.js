import { Button, DialogContent, Grid, Typography } from "@mui/material"
import Textfield from "../../../../../ourComponents/TextField"

import { BootstrapDialog, BootstrapDialogTitle } from "../../../../../ourComponents/Modals";

import { Formik, Form } from "formik"

import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

import { VALIDATE_PASSWORD } from "../../../../../requires/api.require";
import { useLazyQuery } from "@apollo/client";
import { autoDecodeToken } from "../../../../Login/token/decodeToken";

export const ValidatePassword = (props) => {
  const [passValidate, {loading, error}] = useLazyQuery(VALIDATE_PASSWORD)

  const decodedToken = autoDecodeToken()

  const {
    setOpenDialog, 
    openDialog, 
    validadeValue, 
    setValidadeValue,
    modalControl,
    setModalControl,
  } = props

  const [open, setOpen] = useState(false)

  const handleClose = async () => {
    setOpenDialog(false);
  };

  const [formValues, setFormValues] = useState({
    senha: ""
  })

  const handleSubmit = async(values) => {
    const data = await passValidate({
      variables: {
        filters: {
          email: decodedToken.email,
          senha: values.senha
        }
      }
    }).then((data) =>{
      if(data?.data?.changePassword?.id) {
        setValidadeValue({
          ...validadeValue,
            validPass: true
        })
        handleClose()
      } else {
        toast.error("Senha incorreta")
      }
    })
  }

  return(
    <>
      <BootstrapDialog
        open={openDialog}
        fullWidth={true}
        maxWidth="xs"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography>
            Informe a senha anterior
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <Grid
            justifyContent="center" 
            container 
            spacing={2}
            sx={{ 
              ml: "auto", 
              width: "100%",
            }} 
          >
            <Formik
                initialValues={{...formValues}}
                // validationSchema={validation}
                onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
                <Grid item xs={12} sx={{m: 0, p: 0, mt:"2em"}} >
                  <Textfield 
                    name="senha"
                    label="Senha"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{m: 0, p: 0, mt:"1em"}} >
                  <Button
                    variant="outlined"
                    type="submit" 
                    fullWidth 
                  >
                    Enviar
                  </Button>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
      <div><Toaster/></div>
    </>
  )
}