import { 
    Grid, 
    DialogContent, 
    InputAdornment, 
    IconButton, 
    useTheme, 
    useMediaQuery, 
    Typography,
    Button,
    Box,
    Avatar
  } from "@mui/material";

import { useEffect, useState } from "react";
  
import { BootstrapDialog, BootstrapDialogTitle } from '../../../../ourComponents/Modals'

import { toast, Toaster } from "react-hot-toast";

import { UPDATE_USER } from "../../../../requires/api.require";
import { UPDATE_TOKEN } from "../../../../requires/api.require";
import { useLazyQuery, useMutation } from "@apollo/client";

import cloud from '../../../../../Images/Avatar/cloud.png'
import flower from '../../../../../Images/Avatar/flower.png'
import girl1 from '../../../../../Images/Avatar/girl1.png'
import girl2 from '../../../../../Images/Avatar/girl2.png'
import girl3 from '../../../../../Images/Avatar/girl3.png'
import girl4 from '../../../../../Images/Avatar/girl4.png'
import man1 from '../../../../../Images/Avatar/man1.png'
import man2 from '../../../../../Images/Avatar/man2.png'
import man3 from '../../../../../Images/Avatar/man3.png'
import man4 from '../../../../../Images/Avatar/man4.png'
import { autoDecodeToken } from "../../../Login/token/decodeToken";


const Avatars = [
    cloud,
    flower,
    girl1,
    girl2,
    girl3,
    girl4,
    man1,
    man2,
    man3,
    man4,
]

const EditAvatar = (props) => {
    const decodedToken = autoDecodeToken();

    const [updateUser, {loading, error}] = useMutation(UPDATE_USER);
    const [loginUser, {loadingLogin, errorLogin}] = useLazyQuery(UPDATE_TOKEN);

    const {openModal, setOpenModal} = props;

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(openModal.modalEditAvatar) {
            setOpen(true);
        }
    }, [openModal.modalEditAvatar]);

    const handleClose = async () => {
        await setOpen(false);
        setTimeout(() => {
            setOpenModal({
                ...openModal,
                modalEditAvatar: false
            })
        }, 1000);
    };
    
    const handleChangeAvatar = async(image) => { 
        await updateUser({
            variables: {
                user: {
                    nome: decodedToken.nome,
                    // senha: decodedToken.senha,
                    email: decodedToken.email,
                    avatar: image
                },
                updateUserId: decodedToken.id
            }
        })

        setTimeout(async () => {
            await UpdateToken()
        }, 2000)

        toast.success('Seu avatar será trocado em breve, continue navegando!')
        
        handleClose();
    }

    const UpdateToken = async() => {
        const data = await loginUser({
            variables: {
                filters: {
                id: decodedToken.id,
                }
            }
        })

        const NewToken = data?.data?.updateLogin?.token

        localStorage.setItem('token', NewToken);
    }
    
    return(
        <>
            <BootstrapDialog open={open} fullWidth={true} maxWidth="md" >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                    <Box
                        sx={{
                            display: "inline-flex"
                        }}
                    >
                        <Typography
                            fontSize="1em"
                        >
                            Escolha um Avatar
                        </Typography>
                        {/* <PersonOutlineIcon sx={{ fontSize: "1.3em", ml: "0.2em" }} /> */}
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent>
                    <Grid 
                        container 
                        spacing={2}
                        justifyContent='center'
                        alignItems='center'
                    >
                        {Avatars.map((image) => (
                            <Grid item xs={3} >
                                <IconButton
                                    key={image}
                                    onClick={
                                        () => handleChangeAvatar(image)
                                    } 
                                >
                                    <Avatar
                                        src={image}
                                        sx={{
                                            height: "3em",
                                            width: "3em"
                                        }} 
                                    />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
            <div><Toaster/></div>
        </>
    );
}
  
  export default EditAvatar