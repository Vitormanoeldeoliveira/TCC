import * as React from "react";

import {
   Slide,
   Dialog,
   DialogTitle,
   IconButton,
   DialogContent,
   Typography,
   Grid,
   Box,
   styled,
   TextField,
   useMediaQuery,
   useTheme,
} from "@mui/material";

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

// import {
//    DialogConfirmBtn,
//    DialogCancelBtn,
//    DialogOkBtn,
//    ButtonSaveAtt,
//    ButtonSaveAttDialog
// } from "../buttons";

// import { X as CloseIcon } from "../../../icons/x";
import CloseIcon from '@mui/icons-material/Close';

import PropTypes from "prop-types";

// export const ConfirmDialog = ({
//    icon,
//    title,
//    text,
//    textValues,
//    textValues2,
//    textValues3,
//    value1,
//    value2,
//    value3,
//    alert,
//    buttons,
//    color,
//    onClickYes,
//    onClickNo,
//    nameTextField,
//    labelTextField,
//    onBlur,
//    error,
//    helperText,
//    onClickSave,
//    loading,
//    loadingButton,
//    ...otherProps
// }) => {
//    const verticalAlignDisplay = {
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//    };

//    return (
//       <DialogContent style={verticalAlignDisplay}>
//          <Box textAlign="center">
//             {" "}
//             {icon == 1 ? (
//                <HelpOutlineIcon
//                   sx={{ fontSize: "7rem", color: "warning.main" }}
//                />
//             ) : icon == 2 ? (
//                <CheckCircleOutlineIcon
//                   sx={{ fontSize: "7rem", color: "success.main" }}
//                />
//             ) : icon == 3 ? (
//                <ErrorOutlineOutlinedIcon
//                   sx={{ fontSize: "7rem", color: "primary.main" }}
//                />
//             ) : (
//                <HighlightOffIcon
//                   sx={{ fontSize: "7rem", color: "error.main" }}
//                />
//             )}
//             <Typography component="div" variant="h5" sx={{ mb: 1 }}>
//                {title}
//             </Typography>
//             <Typography variant="subtitle1" component="div" color="gray">
//                {text}
//             </Typography>
//             <Typography variant="h6" component="div" color="black">
//                {textValues} <b>{value1}</b>
//             </Typography>
//             <Typography variant="h6" component="div" color="green">
//                {textValues2} <b>{value2}</b>
//             </Typography>
//             <Typography variant="h6" component="div" color="red">
//                {textValues3} <b>{value3}</b>
//             </Typography>
//             {
//                nameTextField && labelTextField
//                   ?  <TextField 
//                         name={nameTextField} 
//                         label={labelTextField} 
//                         onBlur={onBlur}  
//                         fullWidth
//                         sx={{ pt: 1 }}
//                         type="text" 
//                         multiline 
//                         rows={2}
//                         error={error}
//                         helperText={helperText}
//                      />
//                   :  <></>
//             } 
//             <Box sx={{ mt: "1em" }}>
//                <Grid container spacing={2}>
//                   {buttons == 2 ? (
//                      <>
//                         <DialogCancelBtn color={color} onClick={onClickNo} />
//                         <DialogConfirmBtn color={color} onClick={onClickYes} loading={loadingButton} />
//                      </>
//                   ) : buttons == 3 ? (
//                      <>
//                         <DialogCancelBtn color={color} onClick={onClickNo} />
//                         <ButtonSaveAttDialog loading={loading} onClick={onClickSave} />
//                      </> 
//                   ) : (
//                      <>
//                         <DialogOkBtn onClick={onClickYes} />
//                      </>
//                   )}
//                </Grid>
//             </Box>
//          </Box>
//       </DialogContent>
//    );
// };

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
   "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
   },
   "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
   },
}));

export const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export const BootstrapDialogTitle = (props) => {
   const { children, onClose, Filter, ...other } = props;
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   return (
      <DialogTitle
         sx={{
            m: 0,
            p: 2,
            fontSize: 22,
            color: '#ffffff',
            bgcolor: '#79a59c', //#4771a5
         }}
         {...other}
      >
         <Grid container >
            <Grid item xs={9}>
               {children}
            </Grid>
            <Grid item xs={3}>
               {Filter ? (
                  <IconButton
                     aria-label="close"
                     onClick={Filter}
                     sx={{
                        position: "absolute",
                        p: 1,
                        right: isMobile ? 45 : 55,
                        top: 8,
                        color: '#ffffff',
                        "&:hover": {
                           bgcolor: "#00467a",
                        },
                     }}
                  >
                     <FilterAltOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
               ) : null}
               {onClose ? (
                  <IconButton
                     aria-label="close"
                     onClick={onClose}
                     sx={{
                        position: "absolute",
                        p: 1,
                        right: 12,
                        top: 8,
                        color: '#ffffff',
                        "&:hover": {
                           color: "red",
                        },
                     }}
                  >
                     <CloseIcon fontSize={isMobile ? "small" : "medium"}/>
                  </IconButton>
               ) : null}
            </Grid>
         </Grid>
      </DialogTitle>
   );
};

BootstrapDialogTitle.propTypes = {
   children: PropTypes.node,
   onClose: PropTypes.func.isRequired,
};
