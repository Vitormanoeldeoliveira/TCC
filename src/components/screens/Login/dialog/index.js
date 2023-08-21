import { Button, DialogContent, Grid, Typography } from "@mui/material"
import Textfield from "../../../ourComponents/TextField"
import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals"

import { REAL_EMAIL, UPDATE_USER } from "../../../requires/api.require"
import { ADD_USER } from "../../../requires/api.require";
import { UPDATE_EMAIL } from "../../../requires/api.require";
import { useLazyQuery, useMutation } from "@apollo/client"

import { React, useState } from "react"
import { Formik, Form } from "formik"

import flower from '../../../../Images/Avatar/flower.png'
import { toast, Toaster } from "react-hot-toast";

export const ValidateEmail = (props) => {
  const [emailValidation] = useLazyQuery(REAL_EMAIL);
  const [addUser] = useMutation(ADD_USER);
  const [updateEmail] = useMutation(UPDATE_EMAIL)
  const [updateUser] = useMutation(UPDATE_USER)

  const {
    setOpenDialog, 
    openDialog, 
    validadeValue, 
    setValidadeValue,
    // modalControl,
    setModalControl,
    tela,
    decodedToken
  } = props

  // const [open, setOpen] = useState(false)

  const handleClose = async () => {
    setOpenDialog({
      ...openDialog,
        email: false,
    });
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
      if(data?.data?.getByCode?.id) {
        return data.data.getByCode
      }
      return false
    })

    if(valido) {
      const idInt = parseFloat(valido.id)
      updateEmail({
        variables: {
          updateEmailValidCodeId: idInt,
          data: {
            valido: false
          }
        }
      })
      
      if(tela === 'RegisterUser') {
        const { nome, email, senha } = validadeValue;
        const avatar = flower

        const UserCreateInput = {
          nome,
          email,
          senha,
          avatar
        };

        try {
          const { data } = await addUser({
            variables: { user: UserCreateInput },
          });
          toast.success("Usuário Cadastrado com sucesso")
          setTimeout(() => {
            handleClose()
            setModalControl(false)
          }, 500)
        } catch (error) {
          setValidadeValue({
            ...validadeValue,
            campoErro: true
          }); 
          console.error('Erro ao adicionar usuário:', error);
          handleClose()
        }
      } else if(tela === 'UpdateUser') {
        const filter = {}

        for(let field in validadeValue) {
          if(validadeValue[field]) {
            if(validadeValue[field] !== validadeValue.valido) {
              filter[field] = validadeValue[field]
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
          setValidadeValue({
            ...validadeValue,
            campoErro: true
          }); 

          toast.error("Falha ao atualizar usuário")
          handleClose()
        }
      }
    } else {
      toast.error("Código Invalido")
    }
  }

  return(
    <>
      <BootstrapDialog
        open={openDialog.email}
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
      <div><Toaster/></div>
    </>
  )
}