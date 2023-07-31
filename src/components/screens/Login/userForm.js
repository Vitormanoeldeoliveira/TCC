import { 
  Box, 
  Button, 
  Grid, 
  InputAdornment, 
  Typography 
} from "@mui/material";

import Logo from "../../../../src/Images/logo.png";
import { useState } from "react";

import Textfield from "../../ourComponents/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import RegisterScreen from "./modal/register";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLazyQuery } from "@apollo/client";

import { LOGIN_USER } from "../../requires/api.require";
import ScreenToken from "./token";

import  plantinha from "../../../Images/plantinha.png"

const UserForm = () => {
  const [loginUser, {loading, error}] = useLazyQuery(LOGIN_USER)

  const [formValues, setFormValues] = useState({
    id: "",
    nome: "",
    email:"",
    senha:"",
    campoErro: false,
  });

  const [passwordView, setPasswordView] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const validation = Yup.object().shape({
    email: Yup.string().email("Preencha corretamente").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
  });

  const userValidate = async (values) => {
    const data = await loginUser({
      variables: {
        filters: {
          email: values.email,
          senha: values.senha
        }
      }
    }).then((data) => {
      if(data.data) {
        if(data.data.login) {
          return data.data.login.token;
        } else { 
          return false 
        }
      } else { return false }
    })
    
    return data;
  }

  const handleSubmit = async (values) => {
    
    setFormValues((formValues) => ({
      ...formValues,
      email: values.email,
      senha: values.senha
    }))
    
    const verifyRealUser = await userValidate(values);
    localStorage.setItem('token', verifyRealUser);
    if(verifyRealUser) {
      window.location.href = "/plantations"
    } else {
      setFormValues((formValues) => ({
        ...formValues,
        campoErro: true
      }))
    }
  }
  
  return(
    <Grid 
      container
      alignContent="center"
      justifyItems="center"
      spacing={2}
      sx={{
        // bgcolor:"red",
        mt: "5em"
      }}
    >
      {/* <Grid item xs={12}>
        <Box 
          component="img" 
          src={Logo} 
          sx={{
            ml:"-1em",
            height:"5em"
          }}
        />
      </Grid> */}
      {/* <Grid 
        item 
        xs={12}
        sx={{
          mt:"0em",
          ml:"-1em",
        }}
      >
        <Typography fontSize="1.5em" >Login</Typography>
      </Grid> */}
      <Grid item xs={12} sx={{
        // bgcolor:"lightblue"
      }}>
          <Formik
            initialValues={{...formValues}}
            validationSchema={validation}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
                <Grid container spacing={5}>
                  <Grid 
                    item 
                    xs={12}
                    sx={{
                      mr: "3em"
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign:"left",
                        fontSize:"1.5em",
                        fontWeight: 800,
                        fontFamily: 'FontePersonalizada',
                        mb: 1
                      }}
                    >
                      E-mail
                    </Typography>
                    <Textfield 
                      name="email"
                      autoComplete="off" 
                      label="Insira seu endereço de email" 
                      fullWidth
                      size="small"
                      error={formValues.campoErro}
                      setError={setFormValues}
                      helperText={formValues.campoErro ? "Email ou senha estão incorretos" : ""}
                      sx={{
                        // ml:"-1em"
                      }}
                    />
                  </Grid>
                  <Grid 
                    item 
                    xs={12}
                    sx={{
                      mr: "3em"
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign:"left",
                        fontSize:"1.5em",
                        fontWeight: 800,
                        fontFamily: 'FontePersonalizada',
                        mb: 1
                      }}
                    >
                      Senha
                    </Typography>
                    <Textfield 
                      name="senha" 
                      autoComplete="off" 
                      type={passwordView ? "text" : "password"} 
                      label="Insira sua senha"
                      fullWidth
                      size="small"
                      error={formValues.campoErro}
                      setError={setFormValues}
                      helperText={formValues.campoErro ? "Email ou senha estão incorretos" : ""}
                      sx={{
                        // mr:"-1em"
                      }}
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
                </Grid>
                <Grid 
                  item 
                  xs={12}
                  sx={{
                    mt:"5em",
                    ml:"-1em"
                  }}
                >
                  <Button 
                    variant="contained"
                    type="submit"
                    bold
                    sx={{
                      height:"3em",
                      width: "10em",
                      bgcolor: "#b5cfce",
                      color: "black",
                      fontSize: "2em",
                      fontWeight: 800,
                      fontFamily: 'FontePersonalizada',
                      "&:hover": {
                        bgcolor: "#889c9b",
                      },
                    }}
                  >
                    Entrar
                  </Button>
                </Grid>
            </Form>
          </Formik>
      </Grid>
      <Grid 
        item 
        xs={12}
        sx={{
          mt:"1em",
          ml:"-1em",
        }}
      >
        <Box 
          sx={{
            display: "inline-flex"
          }}
        >
          <Typography 
            fontSize="1.2em" 
            sx={{
              fontFamily: 'FontePersonalizada',
            }}
          >
            Não tem uma conta? 
          </Typography>
          <Typography 
            fontSize="1.2em"
            sx={{
              cursor:"pointer",
              fontWeight: 800,
              fontFamily: 'FontePersonalizada',
              "&:hover": {
                color: "lightblue", // Define a cor da borda quando o mouse está sobre o componente
              },
            }}
            onClick={() => setModalOpen(true)}
          >
            Cadastre-se
          </Typography>
        </Box>
        <Typography 
          fontSize="1em"
          sx={{
            mt: "1.5em",
            fontWeight: 800,
            fontFamily: 'FontePersonalizada'
          }}
        >
          by estufa <img src={plantinha} />
        </Typography>
      </Grid>
        {modalOpen && (
          <RegisterScreen
            setOpenModal={setModalOpen}
          />
        )}
    </Grid>

  );
}

export default UserForm