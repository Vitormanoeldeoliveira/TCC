import { 
    Grid, 
    DialogContent, 
    IconButton, 
    Typography,
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
    {id: 1, image: cloud},
    {id: 2, image: flower},
    {id: 3, image: girl1},
    {id: 4, image: girl2},
    {id: 5, image: girl3},
    {id: 6, image: girl4},
    {id: 7, image: man1},
    {id: 8, image: man2},
    {id: 9, image: man3},
    {id: 10, image: man4},
]

const EditAvatar = (props) => {
    const decodedToken = autoDecodeToken();

    const [updateUser] = useMutation(UPDATE_USER);
    const [loginUser] = useLazyQuery(UPDATE_TOKEN);

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
                    // nome: decodedToken.nome,
                    // senha: decodedToken.senha,
                    // email: decodedToken.email,
                    avatar: image.image
                },
                updateUserId: decodedToken.id
            }
        })

        setTimeout(async () => {
            await UpdateToken()
        }, 1000)
        
        toast.success('Seu avatar será trocado em breve, Aguarde!')
        
        handleClose();
    }

    const UpdateToken = async() => {
        await loginUser({
            variables: {
                filters: {
                id: decodedToken.id,
                }
            }
        }).then((data) => {
            const NewToken = data?.data?.updateLogin?.token
            localStorage.setItem('token', NewToken);
        })

        const novaURL = 'http://localhost:3000/userConfig'
        window.location.href = novaURL;
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
                            <Grid 
                                item 
                                xs={4}
                                sm={2}
                                md={1}
                                key={image.id} 
                            >
                                <IconButton
                                    onClick={
                                        () => handleChangeAvatar(image)
                                    } 
                                >
                                    <Avatar
                                        src={image.image}
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
