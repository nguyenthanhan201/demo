import Box from '@mui/material/Box';
import { DarkModeOutlined as DarkModeOutlinedIcon } from '@repo/icons/src/DarkModeOutlined';
import { HomeOutlined as HomeOutlinedIcon } from '@repo/icons/src/HomeOutlined';
import { LightModeOutlined as LightModeOutlinedIcon } from '@repo/icons/src/LightModeOutlined';
import Link from 'next/link';

import useTheme from '@/lib/hooks/useTheme';

const Topbar = () => {
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
        <Link href='/'>
          <HomeOutlinedIcon />
        </Link>
        <div onClick={toggleTheme}>
          {themeLocal === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </div>
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
