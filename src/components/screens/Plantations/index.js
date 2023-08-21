import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ONE_PLANTATION, GET_PLANTATIONS } from "../../requires/api.require";
import { autoDecodeToken } from "../Login/token/decodeToken";

import { Box, Grid, InputAdornment, TextField, Typography } from "@mui/material";

import { Navbar } from "../../ourComponents/Navbar";

import add from "../../../Images/plantacoes/add.png"
import vaso from "../../../Images/plantacoes/vasos.png"
import arbusto from "../../../Images/plantacoes/arbusto.png"
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { ModalPlantations } from "./modals";
import Moment from "react-moment";
import SearchIcon from '@mui/icons-material/Search';

const Plantations = () => {
  const decodedToken = autoDecodeToken();

  const [formFilters, setFilters] = useState({
    descricao: ""
  })
  
  const {data, refetch} = useQuery(GET_PLANTATIONS, {
    variables: {
      filters: {
        id_usuario: decodedToken.id,
        descricao: formFilters.descricao
      }
    }
  })

  
  const [getPlantation] = useLazyQuery(GET_ONE_PLANTATION)

  const refetchTableData = () => {
    refetch();
  };

  const [boolean, setBoolean] = useState({
    modalPlantations: false,
    valuesEdit: ""
  })

  const CreatePlantation = () => {
    setBoolean({
      ...boolean,
      valuesEdit: "",
      modalPlantations: true
    })
  };

  const UpdateFilters = async(ev) => {
    const descricao = ev.target.value

    await setFilters({
      ...formFilters,
      descricao: descricao ? descricao : undefined
    })

    await refetchTableData()
  }

  const UpdateOrView = async(ev, id) => {
    if(ev === "Edit") {
      const data = await getPlantation({
        variables: {
            getOnePlantationId: Number(id)
        }
      })

      setBoolean({
        ...boolean,
        modalPlantations: true,
        valuesEdit: data.data.getOnePlantation
      })
    }
  }

  return(
    <>
      <Navbar />
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          display: data?.getAllPlantations?.length === 0 && formFilters.descricao === "" ? "none" : ""
        }}
      >
        <Grid
          item
          xs={11}
          sx={{
            mt: "1em",
            // bgcolor: "red",
            textAlign: "center",
          }}
        >
          <TextField 
            name="descricao"
            label="Pesquise Por Descrição"
            variant="standard"
            size="small"
            autoComplete="false"
            onChange={(ev) => UpdateFilters(ev)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
        {
          data?.getAllPlantations?.length === 0 ?
          (
            <Grid 
              container 
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              sx={{
                height: "90vh"
              }}
            >
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
            </Grid>
          ) : 
          (
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs={9}
                sm={5}
                md={3.5}
                onClick={() => CreatePlantation()}
                sx={{
                  bgcolor: "#e4e4e4",
                  height: "15em",
                  borderRadius: "10px",
                  cursor: "pointer",
                  mt: "2em",
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                >
                  <Grid
                    item
                    container
                    direction="row-reverse"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      // bgcolor: "blue",
                    }}
                  >
                    <Box
                      sx={{
                        // bgcolor: "red",
                        color: "#77a69c",
                        fontSize: "8.5em"
                      }}
                    >
                      +
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
                {data?.getAllPlantations?.map((plantacao) => (
                    <Grid
                      item
                      xs={9}
                      sm={5}
                      md={3.5}
                      key={plantacao.id}
                      sx={{
                        // bgcolor: "red",
                        height: "15em",
                        mt: "2em"
                      }}
                    >
                      <Box
                        sx={{
                          mt: "-1em",
                          mr: "1em"
                        }}
                        key={plantacao.id}
                      >
                        <Box
                          sx={{
                            bgcolor: "#75a79c",
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: "#b5cfce",
                              width: "4em",
                              textAlign: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "2em",
                                fontFamily: "FontePersonalizada"
                              }}
                            >
                              <Moment format="DD">
                                {plantacao.created_at}
                              </Moment>
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.8em",
                                fontFamily: "FontePersonalizada",
                                mt: -1
                              }}
                            >
                              <Moment format="MM">
                                {plantacao.created_at}
                              </Moment>
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: "white",
                            height: "9em"
                          }}
                        >
                          <Box
                            sx={{
                              pt: "1em",
                              ml: 1
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "1.4em",
                                fontFamily: "FontePersonalizada"
                              }}
                            >
                              {plantacao.descricao}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1.2em",
                                fontFamily: "FontePersonalizada"
                              }}
                            >
                              {plantacao.planta.descricao}
                            </Typography>
                            <Typography
                              sx={{
                                mt: "1em",
                                fontSize: "1.3em",
                                fontFamily: "FontePersonalizada"
                              }}
                            >
                              {plantacao.tipo}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: "black",
                            textAlign: "center",
                            height: "2.3em",
                          }}
                        >
                          <Box
                            sx={{
                              display: "inline-flex",
                              mt: "0.5em",
                              gap: "5em",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "white",
                                cursor: "pointer",
                                fontFamily: "FontePersonalizada" 
                              }}
                              value="View"
                              onClick={() => UpdateOrView("View")}
                            >
                              Exibir
                            </Typography>
                            <Typography
                              sx={{
                                color: "#6db6a2",
                                cursor: "pointer",
                                fontFamily: "FontePersonalizada"
                              }}
                              value="Edit"
                              onClick={() => UpdateOrView("Edit", plantacao.id)}
                            >
                              Editar
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                ))}
              </Grid>
          )
        }

      {boolean.modalPlantations && (
        <ModalPlantations
          openModal={boolean}
          setOpenModal={setBoolean}
          refetchTableData={refetchTableData}
          isEdit={boolean.valuesEdit}
        />
      )}

      <div><Toaster/></div>
    </>
  )
}

export default Plantations;