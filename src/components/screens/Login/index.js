import { 
  Box,
  Grid, 
  useMediaQuery
} from "@mui/material";

import login from '../../../Images/animation.mp4'
// import login from '../../../Images/login.png'

import UserForm from "./userForm";

import Logo from '../../../Images/logo.png'

const Login = (props) => {

  const isMobile = useMediaQuery('(max-width: 920px)')

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
            // bgcolor: "yellow",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeigth: "100vh",
            maxHeight:"auto",
            maxWidth: "100%"
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: "100%",
              objectFit: 'cover',
              zIndex: -1
            }}
          >
            <source src={login} type="video/mp4" />
          </video>
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
                <img src={Logo} />
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