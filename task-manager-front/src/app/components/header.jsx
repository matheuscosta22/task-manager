"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export default function Header({ title, menuItems }) {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const router = useRouter();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        handleClose();
        router.push("/login");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    justifyContent: "space-between",
                    borderRadius: 1,
                    backgroundColor: "#ffffff",
                }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1, flexDirection: "row", display: "flex" }}>
                        <font color="black">
                            <Typography
                                className={poppins.className}
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                {title}
                            </Typography>
                        </font>
                    </Box>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <AccountCircle sx={{ color: "#000000" }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {menuItems?.map((item, index) => (
                                    <MenuItem key={index} onClick={item.onClick}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}