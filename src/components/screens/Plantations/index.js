import { useQuery } from "@apollo/client";
import { GET_PLANTATIONS } from "../../requires/api.require";
import { autoDecodeToken } from "../Login/token/decodeToken";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { Navbar } from "../../ourComponents/Navbar";

import add from "../../../Images/plantacoes/add.png"
import vaso from "../../../Images/plantacoes/vasos.png"
import arbusto from "../../../Images/plantacoes/arbusto.png"
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { ModalPlantations } from "./modals";

const Plantations = () => {
  const decodedToken = autoDecodeToken();
  
  const {data, loading, error, refetch} = useQuery(GET_PLANTATIONS, {
    variables: {
      filters: {
        id_usuario: decodedToken.id,
        descricao: ""
      }
    }
  });

  const refetchTableData = () => {
    refetch();
  };

  const [boolean, setBoolean] = useState({
    modalPlantations: false,
  })

  const CreatePlantation = () => {
    // toast.success("Ta linkado");
    setBoolean({
      ...boolean,
      modalPlantations: true
    })
  }

  return(
    <>
      <Navbar />
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        sx={{
          height: "90vh"
        }}
      >
        {
          data?.getAllPlantations?.length === 0 ?
          (
            <>
              <Grid
                item 
                xs={4}
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                sx={{
                  textAlign:"center",
                }}
              >
                <img src={arbusto} />
              </Grid>
              <Grid 
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={4}
                sx={{ 
                  textAlign: "center",
                }} 
              >
                <Box
                  onClick={() => CreatePlantation()}
                  sx={{
                    cursor: "pointer"
                  }}
                >
                  <img src={add} />
                  <Typography
                    sx={{
                      fontFamily: 'FontePersonalizada',
                      fontSize: "0.8em"
                    }}
                  >
                    Parece que você ainda não tem uma plantação
                  </Typography>
                  <Typography
                    sx={{
                      // mt: "-20em",
                      fontFamily: 'FontePersonalizada',
                      fontSize: "1em",
                      color: "#75a79c",
                    }}
                  >
                    Crie uma plantação
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item 
                xs={4}
                sx={{
                  textAlign:"center",
                }}
              >
                <img src={vaso} />
              </Grid>
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

      {boolean.modalPlantations && (
        <ModalPlantations
          openModal={boolean}
          setOpenModal={setBoolean}
          refetchTableData={refetchTableData}
        />
      )}

      <div><Toaster/></div>
    </>
  )
}

export default Plantations;