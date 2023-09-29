import { 
  Box,
  Grid, 
  useMediaQuery
} from "@mui/material";

import login from '../../../Images/login.png'

import UserForm from "./userForm";

import Logo from '../../../Images/logo.png'

const Login = (props) => {

  const isMobile = useMediaQuery('(max-width: 920px)')

  console.log(isMobile);
  return(
    <>
      {
        isMobile ? (
          <Box
            sx={{
              bgcolor: "#75a79c",
              minHeight: "102vh",
              maxHeight: "auto"
            }}
          >
            <Grid 
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{
                minHeigth: "100vh",
                maxHeight:"auto",
                bgcolor: "#75a79c"
              }}
            >
              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                sx={{
                  textAlign: "center",
                }}
              >
                <img src={Logo} />
                <UserForm 
                  userId={props.userId}
                  setUserId={props.setUserId}
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
        <Grid
          container 
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            margin:0, 
            padding:0,
            backgroundImage: `url(${login})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeigth: "100vh",
            maxHeight:"auto",
            maxWidth: "100%"
          }}
        >
          <Grid 
            item 
            xs={12}
            sx={{
              minHeight: "100vh",
              maxHeight:"auto",
            }} 
          >
            <Grid 
              container 
              spacing={2} 
              justifyContent="flex-end" 
              alignItems="center"
              sx={{
                minHeight: "100vh",
                maxHeight:"auto",
              }} 
            >
              <Grid 
                item xs={4.5} 
                textAlign="center" 
                sx={{
                  borderRadius:"8px",
                  // height:"auto",
                  // boxShadow: "51px 32px 19px 14px rgba(0,0,0,0.1)",
                }}
              >
                <UserForm 
                  userId={props.userId}
                  setUserId={props.setUserId}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        )
      }
    </>
  );
}

export default Login;