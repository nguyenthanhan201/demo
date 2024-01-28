import 'react-pro-sidebar/dist/css/styles.css';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';

import { tokens } from '@/lib/theme/theme';

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      icon={icon}
      onClick={() => setSelected(title)}
      style={{
        color: colors.grey[100]
      }}
    >
      <Typography>{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selected, setSelected] = React.useState('dashboard');

  return (
    <Box
      className='h-[100vh]'
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important'
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important'
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important'
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          <MenuItem
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100]
            }}
          >
            {!isCollapsed ? (
              <Box alignItems='center' display='flex' justifyContent='space-between' ml='15px'>
                <Typography color={colors.grey[100]} variant='h3'>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            ) : null}
          </MenuItem>
          {!isCollapsed ? (
            <Box mb='25px'>
              <Box alignItems='center' display='flex' justifyContent='center'>
                <img
                  alt='profile-user'
                  height='100px'
                  src='/images/Logo.png'
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                  width='100px'
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  color={colors.grey[100]}
                  fontWeight='bold'
                  sx={{ m: '10px 0 0 0' }}
                  variant='h2'
                >
                  Thanh An
                </Typography>
                <Typography color={colors.greenAccent[500]} variant='h5'>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          ) : null}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              title='Dashboard'
              to='/admin'
            />

            <Typography color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }} variant='h6'>
              Quản lí dữ liệu
            </Typography>
            <Item
              icon={<RemoveRedEyeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              title='Quản lí sản phẩm'
              to='/admin/products'
            />
            <Item
              icon={<VisibilityOffOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              title='Sản phẩm ẩn'
              to='/admin/hide-products'
            />
            <Item
              icon={<ReceiptLongOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              title='Quản lí đơn hàng'
              to='/admin/orders'
            />
            <Typography color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }} variant='h6'>
              Phân tích dữ liệu
            </Typography>
            <Item
              icon={<AnalyticsIcon />}
              selected={selected}
              setSelected={setSelected}
              title='Thống kê lượt xem'
              to='/admin/analytics'
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
