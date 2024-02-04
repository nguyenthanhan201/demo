import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/router';

import useTheme from '@/lib/hooks/useTheme';

const Topbar = () => {
  const router = useRouter();
  // const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);
  const { themeLocal, toggleTheme } = useTheme();

  return (
    <Box display='flex' justifyContent='flex-end' p={2}>
      {/* SEARCH BAR */}
      {/* <Box display={"flex"} borderRadius={"3px"} bgcolor={colors.grey[400]}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}
      {/* ICONS */}
      <Box display='flex'>
        <IconButton onClick={() => router.push('/')}>
          <HomeOutlinedIcon />
        </IconButton>
        <IconButton onClick={toggleTheme}>
          {themeLocal === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        {/* <IconButton
          onClick={() => {
            tosat.success("Hello");
          }}
        >
          <NotificationsOutlinedIcon />
        </IconButton> */}
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};
export default Topbar;
