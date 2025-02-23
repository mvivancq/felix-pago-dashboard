import { 
    Box, 
    List, 
    ListItem, 
    ListItemButton,
    ListDivider,
} from '@mui/joy';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import './Navbar.css';

function Navbar() {
  return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1, border: 1, borderColor: 'divider', backgroundColor: '#8fb0f5' }}>
      <List role="menubar" orientation="horizontal">
        <ListItem role="none">
          <ListItemButton
            className='navbar-item'
            role="menuitem"
            component="a"
            href="#horizontal-list"
            aria-label="Home"
          >
            <Home />
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <ListItemButton role="menuitem" component="a" href="#horizontal-list" className='navbar-item'>
            Dashboard
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
          <ListItemButton
            role="menuitem"
            component="a"
            href="#horizontal-list"
            aria-label="Profile"
            className='navbar-item'
          >
            <Person />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Navbar;