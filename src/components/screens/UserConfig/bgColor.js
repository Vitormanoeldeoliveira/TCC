import { Grid } from "@mui/material"
import { UserConfig } from "."

export const UserConfigWithBg = () => {
    return (
        <Grid
            sx={{
                p: 0,
                m: 0,
                bgcolor: "#75a79c",
                height: "100vh", 
                width: "100%"
            }}
        >
            <UserConfig />
        </Grid>
    )
}