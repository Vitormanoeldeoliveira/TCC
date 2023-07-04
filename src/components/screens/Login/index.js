import { 
  Box, 
  Card, 
  Container, 
  Grid, 
  TextField, 
  Typography 
} from "@mui/material";

import campo from '../../../Images/campo.png';

import UserForm from "./userForm";

const Login = () => {
  return(
    <Grid
      container 
      spacing={2}
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        margin:0, 
        padding:0,
      }}
    >
      <Grid 
        item 
        sm={8} 
        sx={{
          backgroundImage: `url(${campo})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height:"100vh",
          display: { xs:"none", sm:"block" }
        }} 
      ></Grid>

      <Grid 
        item 
        xs={12}
        sm={4} 
        sx={{
          height: {xs: "105vh", sm: "100vh"} ,
          bgcolor:"#79a59c"
        }} 
      >
        <Grid 
          container 
          spacing={2} 
          justifyContent="center" 
          alignItems="center"
          sx={{
            height:"100vh",
          }} 
        >
          <Grid 
            item xs={8} 
            textAlign="center" 
            sx={{
              bgcolor:"snow", 
              borderRadius:"8px",
              height:"auto",
              boxShadow: "51px 32px 19px 14px rgba(0,0,0,0.1)"
            }}
          >
            <UserForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;