import { 
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
          <>
            <Grid 
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{
                margin: 0,
                padding: 0,
                height: "105vh",
                bgcolor: "#75a79c"
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: "center"
                }}
              >
                <img src={Logo} />
                <UserForm 
                  userId={props.userId}
                  setUserId={props.setUserId}
                />
              </Grid>
            </Grid>
          </>
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
            height:"100vh",
            maxWidth: "100%"
            // display: { xs:"none", sm:"block" }
          }}
        >
          <Grid 
            item 
            xs={12}
            sx={{
              height: { sm: "100vh"} ,
              // bgcolor:"#79a59c"
            }} 
          >
            <Grid 
              container 
              spacing={2} 
              justifyContent="flex-end" 
              alignItems="center"
              sx={{
                height:"100vh",
                // bgcolor:"pink"
              }} 
            >
              <Grid 
                item xs={4.5} 
                textAlign="center" 
                sx={{
                  // bgcolor:"red",
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