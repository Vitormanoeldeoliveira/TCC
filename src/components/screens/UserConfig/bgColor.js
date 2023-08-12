import { Divider, Grid } from "@mui/material"
import { UserConfig } from "."
import { Navbar } from "../../ourComponents/Navbar"

export const UserConfigWithBg = () => {
    return (
        <Grid
            sx={{
                p: 0,
                m: 0,
                // bgcolor: "#75a79c",
                height: "100vh", 
                width: "100%"
            }}
        >
            
            <Navbar />
            <Divider sx={{ backgroundColor: 'black', margin: '0', height: 3.5 }} />
            <UserConfig />
        </Grid>
    )
}