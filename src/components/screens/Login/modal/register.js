import { 
  Grid, 
  DialogContent, 
  InputAdornment, 
  IconButton, 
  useTheme, 
  useMediaQuery, 
  Typography,
  Button
} from "@mui/material";

import { BootstrapDialog, BootstrapDialogTitle } from "../../../ourComponents/Modals";
import * as Yup from "yup";

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useEffect, useState } from "react";
import { Form, Formik } from "formik";

import Textfield from "../../../ourComponents/TextField";

import { useMutation, gql } from '@apollo/client';

const ADD_USER = gql`
  mutation Mutation($user: UserCreateInput!) {
  createUser(user: $user) {
    id
    nome
    email
    senha
  }
}
`

const RegisterScreen = (props) => {
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const {setOpenModal} = props;

  const [open, setOpen] = useState(false)

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
    senha:""
  });

  const validation = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Preencha corretamente").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
  });

  const [passwordView, setPasswordView] = useState(false)

  const handleSubmit = async(values) => {
    const { nome, email, senha } = values;

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

      // Limpar o formulário ou redirecionar para outra página, se necessário
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }

    handleClose()
  };

  return(
    <>
      <BootstrapDialog open={open} fullWidth={true} maxWidth="md" >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
          <Typography >
            <b>
              Cadastro de Usuário
            </b>
          </Typography>
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
    </>
  );
};

export default RegisterScreen