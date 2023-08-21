import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import errorScreen from '../../../Images/errorScreen.jpeg'

export const BadRequest = () => {

  const logout = () => {
    localStorage.setItem('token', "");

    const novaURL = 'http://localhost:3000'
    window.location.href = novaURL;
  };

  const isMobile = useMediaQuery('(max-width: 920px)')

  return(
    <Box
      sx={{
        bgcolor: "#d16354",
        height: "100vh"
      }}
    >
      <Grid
        container
        sx={{
          backgroundImage: !isMobile? `url(${errorScreen})` : "",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh"
        }}
      >
        <Grid
          item 
          xs={12}
          md={6}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            sx={{
              p: 5
            }}
          >
            <Typography
              sx={{
                fontFamily: "FontePersonalizada",
                fontSize: "5em",
                fontWeight: 900,
                textAlign: "center"
              }}
            >
              Oops!  
            </Typography>
            <Typography
              sx={{
                fontFamily: "FontePersonalizada",
                fontSize: "1.7em",
                textAlign: "left"
              }}
            >
              Parece que ocorreu um erro, tente logar no sistema para corrigi-lo!
            </Typography>
            <Grid 
              item 
              xs={12}
              sx={{
                mt:"3em",
                textAlign: "center"
              }}
            >
              {isMobile ? (
                <Button 
                  variant="contained"
                  type="submit"
                  onClick={() => logout()}
                  sx={{
                    mt: "5em",
                    height:"3em",
                    width: "10em",
                    bgcolor: "white",
                    color: "black",
                    fontSize: "1em",
                    fontWeight: 800,
                    fontFamily: 'FontePersonalizada',
                    "&:hover": {
                      bgcolor: "#f6f6f6",
                    },
                  }}
                >
                  Voltar ao Início
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => logout()}
                  sx={{
                    height:"3em",
                    width: "10em",
                    bgcolor: "white",
                    color: "black",
                    fontSize: "2em",
                    fontWeight: 800,
                    fontFamily: 'FontePersonalizada',
                    "&:hover": {
                      bgcolor: "#f6f6f6",
                    },
                  }}
                >
                  Voltar Ao início
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}