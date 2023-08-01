import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PLANTATIONS } from "../../requires/api.require";
import { autoDecodeToken } from "../Login/token/decodeToken";
import { useEffect } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

import { Navbar } from "../../ourComponents/Navbar";

const Plantations = () => {
  const decodedToken = autoDecodeToken();
  
  const {data, loading, error} = useQuery(GET_PLANTATIONS, {
    variables: {
      filters: {
        id_usuario: decodedToken.id,
        descricao: ""
      }
    }
  })

  return(
    <>
      <Navbar />
      <Grid container alignItems="center" justifyContent="center" >
        {/* <Grid 
          item 
          xs={3}
          sx={{
            // backgroundColor:"red",
            textAlign:"center",
            alignItems:"center",
            justifyContent: "center",
            height:"20em"
          }}
        >
          <Card
            sx={{ 
              ml: "auto",
              mr: "auto",
              minWidth: 275,
              width: "20em",
              height: "15em",
              backgroundColor: "lightgreen", 
              cursor: "pointer"
            }}
          >
            <CardContent>
              <Typography
                fontSize="12em"
                sx={{
                  mt: "-0.17em",
                  color: "snow"
                }}
              >
                +
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
        {
          data?.getAllPlantations?.length === 0 ?
          (
            <>
              teste
            </>
          ) : 
          (
            data?.getAllPlantations?.map((plantacao) => (
              <Grid 
                item 
                xs={3}
                key={plantacao.id}
                sx={{
                  textAlign:"center",
                  alignItems:"center",
                  justifyContent: "center",
                  height:"20em"
                }}
              >
                <Card
                  sx={{ 
                    ml: "auto",
                    mr: "auto",
                    minWidth: 275,
                    width: "20em",
                    height: "15em",
                    backgroundColor: "snow", 
                  }}
                >
                  <CardContent>
                    <Typography
                      fontSize="1.5em"
                      sx={{
                        mt: "-0.17em",
                      }}
                    >
                      Descricao: {plantacao.descricao}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )
        }
      </Grid>
    </>
  )
}

export default Plantations;