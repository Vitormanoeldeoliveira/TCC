import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Box, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CryptoJS from "crypto-js";
import moment from "moment";
import { useEffect, useState } from "react";
import { Navbar } from "../../ourComponents/Navbar";

import { DEL_HARVEST, GET_ALL_HARVESTS, GET_HARVEST_EXPENSE, GET_ONE_HARVEST, GET_PROFIT } from "../../requires/api.require";
import { ModalHarvest } from "./model";
import { ModalInfoHarvest } from "./model/info";
import { ModalProfit } from "./model/profit";


import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Delete } from "../../deleteConfirm";
import { toast, Toaster } from "react-hot-toast";

export const Harvest = () => {
    //Criptografia do id_plantação
    const chave = 'id';
    const valorRecuperado = sessionStorage.getItem(chave);

    const secretKey = 'viorésoda'
    const decript = CryptoJS.AES.decrypt(valorRecuperado, secretKey).toString(CryptoJS.enc.Utf8);

    useEffect(() => {
        if(!decript) {
            localStorage.setItem('token', "");

            const novaURL = 'http://localhost:3000/harvest'
            window.location.href = novaURL;
        }
    }, [decript])

    //Sistema Funcionando

    const [formFilters, setFilters] = useState({
        descricao: ""
    })

    const [boolean, setBoolean] = useState({
        modalHarvest: false,
        modalInfo: false,
        modalRenda: false,
        modalDelete: false,
        deleteConfirmed: false,
        idToDelete: "",
        valuesEdit: ""
    })

    useEffect(() => {
        if(boolean.deleteConfirmed) {
          try {
            deleteHarvest({
                variables: {
                    deleteHarvestId: Number(boolean.idToDelete)
                }
            })

            setBoolean(() => ({
                ...boolean,
                  deleteConfirmed: false,
                  idToDelete: "",
            }))

            toast.success("Safra deletada com sucesso")
          } catch (e) {
            console.log(e);
          }
          refetch()
        }
    }, [boolean.deleteConfirmed])

    const {data, refetch} = useQuery(GET_ALL_HARVESTS, {
        variables: {
            filters: {
                id_plantacao: Number(decript),
                descricao: formFilters.descricao,
                excluido: false
            }
        }
    })

    const [getOneHarvest] = useLazyQuery(GET_ONE_HARVEST)
    const [getHarvestExpense] = useLazyQuery(GET_HARVEST_EXPENSE)
    const [getProfit] = useLazyQuery(GET_PROFIT)
    const [deleteHarvest] = useMutation(DEL_HARVEST)

    const refetchTableData = () => {
        refetch();
    };

    const UpdateFilters = async(ev) => {
        const descricao = ev.target.value
    
        await setFilters({
          ...formFilters,
          descricao: descricao ? descricao : undefined
        })
    
        await refetchTableData()
    }

    const CreateHarvest = () => {
        setBoolean({
            ...boolean,
            valuesEdit: "",
            modalHarvest: true
        })
    }

    const UpdateOrView = async(ev, id) => {
        if(ev === "Edit") {
            const data = await getOneHarvest({
                variables: {
                    getOneHarvestId: Number(id)
                }
            })
            
            setBoolean({
              ...boolean,
              modalHarvest: true,
              valuesEdit: data.data.getOneHarvest
            })
        } else if (ev === "GastoLucro") {
            const data = await getOneHarvest({
                variables: {
                    getOneHarvestId: Number(id)
                }
            })

            const expense = await getHarvestExpense({
                variables: {
                    filters: {
                        id_safra: Number(id)
                    }
                }
            })

            const profit = await getProfit({
                variables: {
                    filters: {
                        id_safra: Number(id)
                    }
                }
            })

            console.log(expense);

            setBoolean({
                ...boolean,
                modalRenda: true,
                valuesEdit: data.data.getOneHarvest,
                valuesExpense: expense ? expense : "",
                valuesProfit: profit ? profit : ""
            })
        } else {
            const data = await getOneHarvest({
                variables: {
                    getOneHarvestId: Number(id)
                }
            })

            const expense = await getHarvestExpense({
                variables: {
                    filters: {
                        id_safra: Number(id)
                    }
                }
            })

            const profit = await getProfit({
                variables: {
                    filters: {
                        id_safra: Number(id),
                        excluido: false
                    }
                }
            })

            setBoolean({
                ...boolean,
                modalInfo: true,
                valuesEdit: data.data.getOneHarvest,
                valuesExpense: expense ? expense : "",
                valuesProfit: profit ? profit : ""
            })
        }
    }

    const DeleteData = (id) => {
        setBoolean({
          ...boolean,
          modalDelete: true,
          idToDelete: Number(id)
        })
    }

    return (
        <>
            <Navbar />
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    display: data?.getAllPlantations?.length === 0 
                        && formFilters.descricao === "" ? "none" : ""
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
                        label="Pesquise Por Descrição da Safra"
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
            {data?.getAllPlantations?.length === 0 ? 
            (
                <>
                    vazio
                </>
            ) : (
                <>
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
                            onClick={() => CreateHarvest()}
                            sx={{
                                bgcolor: "#e4e4e4",
                                height: "15em",
                                borderRadius: "10px",
                                cursor: "pointer",
                                mt: "2em",
                                display: data?.getAllHarvests[0]?.plantacao?.tipo === 'Safra Única' ?
                                    'none' : ''
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
                                            color: "#da8f73",
                                            fontSize: "8.5em"
                                        }}
                                    >
                                        +
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        {data?.getAllHarvests?.map((safra) => (
                            <Grid
                                item
                                xs={9}
                                sm={5}
                                md={3.5}
                                key={safra.id}
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
                                    key={safra.id}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: "#da8f73",
                                            display: "inline-flex",
                                            width: "100%"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: "#e2c9c2",
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
                                                {moment(safra.created_at).format('DD')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                fontSize: "0.8em",
                                                fontFamily: "FontePersonalizada",
                                                mt: -1
                                                }}
                                            >
                                                {
                                                    Number(moment(safra.created_at).format('MM')) === 1 ? ("Jan") :
                                                    Number(moment(safra.created_at).format('MM')) === 2 ? ("Fev") :
                                                    Number(moment(safra.created_at).format('MM')) === 3 ? ("Mar") :
                                                    Number(moment(safra.created_at).format('MM')) === 4 ? ("Abr") : 
                                                    Number(moment(safra.created_at).format('MM')) === 5 ? ("Mai") :
                                                    Number(moment(safra.created_at).format('MM')) === 6 ? ("Jun") :
                                                    Number(moment(safra.created_at).format('MM')) === 7 ? ("Jul") :
                                                    Number(moment(safra.created_at).format('MM')) === 8 ? ("Ago") :
                                                    Number(moment(safra.created_at).format('MM')) === 9 ? ("Set") :
                                                    Number(moment(safra.created_at).format('MM')) === 10 ? ("Out") :
                                                    Number(moment(safra.created_at).format('MM')) === 11 ? ("Nov") :
                                                    ("Dez")
                                                }
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                textAlign: "right",
                                                width: "100%"
                                            }}                    
                                        >
                                            <DeleteOutlineIcon
                                                onClick={() => DeleteData(safra.id)}
                                                sx={{
                                                mt: "0.4em",
                                                color: "snow",
                                                cursor: "pointer",
                                                fontSize: "2em",
                                                "&:hover": {
                                                    color: "red",
                                                },
                                                }}
                                            />
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
                                                    fontFamily: "FontePersonalizada",
                                                }}
                                            >
                                                {safra.descricao}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "1.1em",
                                                    fontFamily: "FontePersonalizada"
                                                }}
                                            >
                                                Plantação: {safra.plantacao.descricao}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "1em",
                                                    fontFamily: "FontePersonalizada"
                                                }}
                                            >
                                                Planta: {safra.plantacao.planta.descricao}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "1em",
                                                    fontFamily: "FontePersonalizada",
                                                }}
                                            >
                                                Cidade: {safra.plantacao.cidade}
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
                                                gap: "2em",
                                                textAlign: "center"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "white",
                                                    cursor: "pointer",
                                                    fontFamily: "FontePersonalizada",
                                                    textAlign: "center",
                                                    "&:hover": {
                                                        color: "#e3e3e1"
                                                    }
                                                }}
                                                value="View"
                                                onClick={() => UpdateOrView("View", safra.id)}
                                            >
                                                Dados
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#76a79c",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        color: "#889c9b",
                                                    },
                                                }}
                                                value="Edit"
                                                onClick={() => UpdateOrView("GastoLucro", safra.id)}
                                            >
                                                Renda
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: "#da8f73",
                                                    cursor: "pointer",
                                                    fontFamily: "FontePersonalizada",
                                                    "&:hover": {
                                                        color: "#c78469"
                                                    }
                                                }}
                                                value="Edit"
                                                onClick={() => UpdateOrView("Edit", safra.id)}
                                            >
                                                Editar
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {boolean.modalHarvest && (
                <ModalHarvest
                    openModal={boolean}
                    setOpenModal={setBoolean}
                    refetchTableData={refetchTableData}
                    isEdit={boolean.valuesEdit}
                    decript={decript}
                />
            )}

            {boolean.modalInfo && (
                <ModalInfoHarvest
                    openModal={boolean}
                    setOpenModal={setBoolean}
                    refetchTableData={refetchTableData}
                    isEdit={boolean?.valuesEdit}
                    // valuesExpense={boolean?.valuesExpense}
                    // valuesProfit={boolean?.valuesProfit}
                    decript={decript}
                />
            )}

            {boolean.modalRenda && (
                <ModalProfit
                    openModal={boolean}
                    setOpenModal={setBoolean}
                    refetchTableData={refetchTableData}
                    isEdit={boolean.valuesEdit}
                    valuesExpense={boolean.valuesExpense}
                    valuesProfit={boolean.valuesProfit}
                    decript={decript}
                />
            )}

            {boolean.modalDelete && (
                <Delete
                    openDialog={boolean}
                    setOpenDialog={setBoolean}
                />
            )}

            <div><Toaster/></div>
        </>
    )
}