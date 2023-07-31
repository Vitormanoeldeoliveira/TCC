import { Button, DialogContent, Grid, Typography } from "@mui/material"
import Textfield from "../../../ourComponents/TextField"
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals"

import { REAL_EMAIL } from "../../../requires/api.require"
import { ADD_USER } from "../../../requires/api.require";
import { UPDATE_EMAIL } from "../../../requires/api.require";
import { useLazyQuery, useMutation } from "@apollo/client"

import { React, useEffect, useState } from "react"
import { Formik, Form } from "formik"

export const ValidateEmail = (props) => {
  const [emailValidation, {loading, error}] = useLazyQuery(REAL_EMAIL);
  const [addUser, { loadingUser, errorUser }] = useMutation(ADD_USER);
  const [updateEmail, {loadingEmail, errorEmail }] = useMutation(UPDATE_EMAIL)

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
    codigo: ""
  })

  const handleSubmit = async(values) => {
    const valido = await emailValidation({
      variables: {
        filters: {
          codigo: values.codigo,
          valido: true
        }
      }
    }).then((data) => {
      if(data.data.getByCode.id) {
        return data.data.getByCode
      }
      return false
    })
    // console.log("O codigo está ", valido);

    if(valido) {
      const idInt = parseFloat(valido.id)
      console.log(idInt);
      updateEmail({
        variables: {
          updateEmailValidCodeId: idInt,
          data: {
            valido: false
          }
        }
      })
      
      const { nome, email, senha } = validadeValue;

      const UserCreateInput = {
        nome,
        email,
        senha,
      };

      try {
        const { data } = await addUser({
          variables: { user: UserCreateInput },
        });
        console.log('Novo usuário adicionado:', data.create);
        setModalControl(false)
      } catch (error) {
        setValidadeValue({
          ...validadeValue,
          campoErro: true
        }); 
        console.error('Erro ao adicionar usuário:', error);
      }
    } else {
      console.log("deu Erro");
    }
    handleClose()
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
            Validação de Email
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
                    name="codigo"
                    label="Código de verificação"
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
    </>
  )
}