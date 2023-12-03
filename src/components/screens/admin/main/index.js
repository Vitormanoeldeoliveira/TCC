// import { Autocomplete, Button, Grid, TextField } from "@mui/material"
// import { useState } from "react";
// import { Navbar } from "../../../ourComponents/Navbar";
// import { Expense } from "../tables/expense";
// import { Harvest } from "../tables/harvest";
// import { Plant } from "../tables/plant";
// import { Plantation } from "../tables/plantation";
// import { Profit } from "../tables/profit";
// import { User } from "../tables/user";
// import SendIcon from '@mui/icons-material/Send';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import { FilterHarvest, FilterPlant, FilterPlantation, FilterUser } from "./filters";

// export const MainScreen = () => {

//     const [autoComplete, setAutoComplete] = useState("Usuário")
//     const [selectedComponent, setSelectedComponent] = useState(null);
//     const type = ['Usuário', 'Plantação', 'Safra', 'Planta']

//     const [boolean, setBoolean] = useState({
//         filters: {
//             filterOn: false,
//             usuario: false,
//             plantacao: false,
//             planta: false,
//             safra: false
//         }
//     })

//     const [objects, setObjects] = useState({
//         usuario: {},
//         planta: {},
//         plantacao: {},
//         safra: {},
//         refetchs: {
//             user: ""
//         }
//     });

//     const handleChangeAutoComplete = (newValue) => {
//         if(newValue) {
//             setAutoComplete(newValue)
//         }
//     };

//     const handleSelect  = async() => {
//         switch (autoComplete) {
//             case 'Usuário': setSelectedComponent(
//                 <User 
//                     filter={ 
//                         objects.usuario,
//                         refetchUser={(values) => setObjects((objects) => ({ 
//                             ...objects, refetchs: { ...objects.refetchs, user: values }}))
//                         }
//                     } 
//                 />
//             ); break;
//             case 'Plantação': setSelectedComponent(<Plantation />); break;
//             case 'Safra': setSelectedComponent(<Harvest />); break;
//             case 'Planta': setSelectedComponent(<Plant />); break;
//             case 'Lucro': setSelectedComponent(<Profit />); break;
//             case 'Despesas': setSelectedComponent(<Expense />); break;
//             default: setSelectedComponent(<div>Tela não selecionada ou não existente</div>); break;
//         }
//     }

//     const showFilters = async() => {
//         if(selectedComponent) {
//             if(!boolean.filters.filterOn) {
//                 switch (autoComplete) {
//                     case 'Usuário': setBoolean(
//                         () => ({ filters: { usuario: true, plantacao: false, planta: false, safra: false, filterOn: true } })
//                     ); break;
//                     case 'Plantação': setBoolean(
//                         () => ({ filters: { usuario: false, plantacao: true, planta: false, safra: false, filterOn: true } })
//                     ); break;
//                     case 'Safra': setBoolean(
//                         () => ({ filters: { usuario: false, plantacao: false, planta: false, safra: true, filterOn: true } })
//                     ); break;
//                     case 'Planta': setBoolean(
//                         () => ({ filters: { usuario: false, plantacao: false, planta: true, safra: false, filterOn: true } })
//                     ); break;
//                 }
//             } else {
//                 setBoolean(() => ({
//                     filters: {
//                         usuario: false, plantacao: false, planta: false, safra: false, filterOn: false
//                     }
//                 }))
//             }
//         }
//     }

//     return (
//         <Grid
//             container
//             spacing={2}
//             justifyContent="center"
//             // alignItems="center"
//             sx={{
//                 minHeight: "102.4vh",
//                 maxHeight: "auto",
//             }}
//         >
//             <Grid item xs={12} sx={{ maxHeight: "15vh" }} >
//                 <Navbar />
//             </Grid>
//             <Grid
//                 item
//                 xs={8}
//                 container
//                 justifyContent="center"
//                 alignItems="center"
//                 spacing={2}
//             >
//                 <Grid item  xs={10} sm={11} sx={{ textAlign: "center" }} >
//                     <Autocomplete
//                         options={type}
//                         renderInput={
//                             (params) => <TextField
//                                 {...params}
//                                 name="tabela"
//                                 label="Tabela"
//                                 variant="standard"
//                             />
//                         }
//                         value={autoComplete}
//                         onChange={(ev, newValue) => handleChangeAutoComplete(newValue)}
//                     />
//                 </Grid>
//                 <Grid item xs={3} sm={0.5} >
//                     <SendIcon 
//                         sx={{
//                             mt: {xs: 0, sm: "1em"},
//                             color: "black",
//                             fontFamily: 'FontePersonalizada',
//                             "&:hover": {
//                                 color: "#889c9b",
//                             },
//                         }}
//                         cursor="pointer"
//                         onClick={() => handleSelect()}
//                     />
//                 </Grid>
//                 <Grid item xs={9} sm={0.5} >
//                     <FilterAltIcon 
//                         sx={{
//                             mt: {xs: 0, sm: "1em"},
//                             ml: "0.1em",
//                             color: "black",
//                             fontFamily: 'FontePersonalizada',
//                             "&:hover": {
//                                 color: "#889c9b",
//                             },
//                         }}
//                         cursor="pointer"
//                         onClick={() => showFilters()}
//                     />
//                 </Grid>

//                 <Grid item xs={12} >
//                     { boolean.filters.usuario && ( 
//                         <FilterUser 
//                             setFilter={ (values) => setObjects((objects) => ({ ...objects, usuario: values })) }
//                         /> 
//                     )}
//                     { boolean.filters.planta && ( 
//                         <FilterPlant /> 
//                     )}
//                     { boolean.filters.plantacao && ( 
//                         <FilterPlantation /> 
//                     )}
//                     { boolean.filters.safra && ( 
//                         <FilterHarvest /> 
//                     )}
//                 </Grid>
//                 <Grid item xs={12} sx={{ textAlign: "center", minHeight: "77vh", maxHeight: "80vh" }} >
//                     {selectedComponent}
//                 </Grid>
//             </Grid>
//         </Grid>
//     )
// }