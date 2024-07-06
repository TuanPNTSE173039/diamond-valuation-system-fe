import {useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {useStaff} from "../../services/staffs.js";
import {useState} from "react";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import {createTheme, Drawer, ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import ProfileCard from "./ProfileCard.jsx";

const theme = createTheme();

export default function ProfilePage() {
    const { id } = useSelector((state) => state.auth.user);
    console.log(id)

    const {
        data: staff,
        isLoading: isStaffLoading,
        error: staffError,
    } = useStaff(id);


    const [text, setText] = useState("");

    if (isStaffLoading) {
        return <UICircularIndeterminate />;
    }

    if (staffError) {
        return <div>Error loading staff data</div>;
    }

    const mainUser = {
        username: staff?.account?.username || "",
        firstName: staff?.firstName || "",
        lastName: staff?.lastName || "",
        phone: staff?.phone?.trim() || "",
        email: staff?.account?.email || "",
        experience: staff?.experience || "",
        avatar: staff?.avatar || "",
        staffID: staff?.id || "",
        authID: staff?.account?.id || "",
    };
    console.log(mainUser);
    console.log(mainUser.staffID);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                {/* MAIN GRID */}
                <Grid container direction="row">
                    {/* DRAWER */}
                    <Grid item xs={2}>
                        <Drawer />
                    </Grid>

                    {/* CONTENT */}
                    <Grid item xs={10} sx={{ marginTop: "80px" }}>
                        {/* BACKGROUND */}
                        <Grid container direction="column" sx={{ marginLeft: "65px" }}>
                            {/* COMPONENTS */}
                            <Grid
                                container
                                direction={{ xs: "column", md: "row" }}
                                spacing={3}
                                sx={{
                                    position: "relative",
                                    top: "-10vh",
                                    px: { xs: 2, md: 7 },
                                }}
                            >
                                {/* SETTINGS CARD */}
                                <Grid item xs={12}>
                                    <ProfileCard
                                        expose={(v) => setText(v)}
                                        firstName={mainUser.firstName}
                                        lastName={mainUser.lastName}
                                        experience={mainUser.experience}
                                        phone={mainUser.phone}
                                        email={mainUser.email}
                                        certificateLink={mainUser.certificateLink}
                                        avatar={mainUser.avatar}
                                        username={mainUser.username}
                                        staffID={mainUser.staffID}
                                        authID={mainUser.authID}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CssBaseline>
        </ThemeProvider>
    );


}