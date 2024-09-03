import {
  React,
  useTheme,
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Avatar,
  HomeIcon,
  red,
  SellIcon,
  BookmarkIcon,
  ShoppingCartIcon,
  PersonOutlineIcon,
  LogoutIcon,
  Tooltip,
  ListItemText,
} from "../Components/resuables/style";
import { getLocalStorageUser } from "../UTILS/localStorageUtils";
import ItemCard from "./MarketItems";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import UserService from "../services/UserService";
import SoldItems from "./SoldItems";
import MyCart from "./myCart";
import {
  Main,
  AppBar,
  DrawerHeader,
} from "../Components/resuables/marketstore";
import ProfileCard from "./ProfileCard";

const drawerWidth = 240;

const MarketStore = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [view, setView] = React.useState("home");
  const [profilePic, setProfilePic] = React.useState("");



  useEffect(() => {
    
    const userId = getLocalStorageUser().user_id;

    UserService.getUserProfilePic(userId)

      .then((response) => {
        const imageUrl = require(`../Components/Images/${response.data.profilePic}`);
        setProfilePic(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
      });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    if (setting === "Profile") {
      setView("Profile");
    } else if (setting === "Logout") {
      setView("Logout");
    }
    handleCloseUserMenu();
  };

  const settings = ["Profile", "Logout"];

  const renderView = () => {
    if (view === "home") {
      return <ItemCard />;
    } else if (view === "sell") {
      return <SoldItems />;
    } else if (view === "Profile") {
      return <ProfileCard />;
    } else if (view === "cart") {
      return <MyCart />;
    }else if (view === "Logout") {
      navigate('/sign-in')
    }
  };



  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#e8ecd6", minHeight: "100vh" }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#241f1c" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              backgroundColor: "#241f1c",
              color: "yellow",
            }}
          >
            MarketStore
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={profilePic}
                >
                  {getLocalStorageUser().username.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleMenuItemClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "black",
            color: "white",
          },
          "& .MuiListItemText-primary": {
            color: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Sell", "Cart"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() =>
                  index === 0 ? (
                    setView("home")
                  ) : index === 1 ? (
                    setView("sell")
                  ) : index === 2 ? (
                    setView("cart")
                  ) : (
                    <ShoppingCartIcon />
                  )
                }
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeIcon />
                  ) : index === 1 ? (
                    <SellIcon />
                  ) : index === 2 ? (
                    <BookmarkIcon />
                  ) : index === 3 ? (
                    <ShoppingCartIcon />
                  ) : (
                    <ShoppingCartIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Profile", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleMenuItemClick(text)}>
                <ListItemIcon>
                  {text === "Profile" ? (
                    <PersonOutlineIcon />
                  ) : text === "Logout" ? (
                    <LogoutIcon />
                  ) : (
                    <LogoutIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {renderView()}
      </Main>

    
    </Box>
  );
};

export default MarketStore;
