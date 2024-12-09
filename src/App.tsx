import { useState } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  interface Menu {
    title: string;
    path: string;
    collapse: boolean;
    children: Omit<Menu, "collapse" | "children">[];
  }

  const listMenu: Menu[] = [
    {
      title: "Invoice",
      path: "/dashboard/invoice",
      collapse: false,
      children: [
        {
          title: "Documents",
          path: "/dashboard/invoice/documents",
        },
        {
          title: "Templates",
          path: "/dashboard/invoice/templates",
        },
      ],
    },
    {
      title: "Offer Letter",
      path: "/dashboard/offer-letter",
      collapse: false,
      children: [
        {
          title: "Documents",
          path: "/dashboard/offer-letter/documents",
        },
        {
          title: "Templates",
          path: "/dashboard/offer-letter/templates",
        },
      ],
    },
    {
      title: "Setting",
      path: "/dashboard/setting",
      collapse: false,
      children: [],
    },
  ];

  const [expandedMenu, setExpandedMenu] = useState([""]);
  const handleExpand = (path: string) => {
    if (expandedMenu.includes(path)) {
      setExpandedMenu(expandedMenu.filter((val) => val !== path));
    } else {
      setExpandedMenu([...expandedMenu, path]);
    }
  };

  function MenuItem({ menu, index }: { menu: Menu; index: number }) {
    if (menu.children.length) {
      return (
        <>
          <ListItem disablePadding key={index}>
            <ListItemButton
              onClick={() => {
                handleExpand(menu.path);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={menu.title} />
              {menu.collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse
            in={expandedMenu.includes(menu.path)}
            timeout={300}
            unmountOnExit
          >
            <List component="div" disablePadding>
              {menu.children.map((submenu, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton
                    component={Link}
                    sx={{ pl: 4 }}
                    to={submenu.path}
                  >
                    <ListItemText primary={submenu.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </>
      );
    } else {
      return (
        <ListItemButton component={Link} to={menu.path}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={menu.title} />
        </ListItemButton>
      );
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {listMenu.map((menu, index) => (
          <MenuItem menu={menu} index={index} key={index} />
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
