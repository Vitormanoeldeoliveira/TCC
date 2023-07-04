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

const UserForm = () => {
  const [formValues, setFormValues] = useState({
    email:"",
    senha:""
  });

  const [passwordView, setPasswordView] = useState(false)

  const validation = Yup.object().shape({
    email: Yup.string().email("Preencha corretamente").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (values) => {
    
  }
  
  return(
    <Grid 
      container 
      spacing={2} 
    >
      <Grid item xs={12}>
        <Box 
          component="img" 
          src={Logo} 
          sx={{
            ml:"-1em",
            height:"5em"
          }}
        />
      </Grid>
      <Grid 
        item 
        xs={12}
        sx={{
          mt:"0em",
          ml:"-1em",
        }}
      >
        <Typography fontSize="1.5em" >Login</Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={{...formValues}}
          validationSchema={validation}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            <Grid container spacing={2} >
              <Grid 
                item 
                xs={12}
                sx={{
                  mt:"0em",
                }}
              >
                <Textfield 
                  name="email"
                  autoComplete="off" 
                  label="Email" 
                  fullWidth
                  size="small"
                  sx={{
                    ml:"-1em"
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Textfield 
                  name="senha" 
                  autoComplete="off" 
                  type={passwordView ? "text" : "password"} 
                  label="Senha"
                  fullWidth
                  size="small"
                  sx={{
                    ml:"-1em"
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
              <Grid 
                item 
                xs={12}
                sx={{
                  mt:"1em",
                  ml:"-1em"
                }}
              >
                <Button 
                  variant="outlined"
                  type="submit"
                >
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
      <Grid 
        item 
        xs={12}
        sx={{
          mt:"0.8em",
          ml:"-1em",
        }}
      >
        <Typography 
          fontSize="1em"
          sx={{
            cursor:"pointer",
            "&:hover": {
              color: "#52a0e3", // Define a cor da borda quando o mouse está sobre o componente
            },
          }}
          onClick={() => setModalOpen(true)}
        >
          Cadastrar-se
        </Typography>
        <Typography fontSize="0.7em">By Estufa</Typography>
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