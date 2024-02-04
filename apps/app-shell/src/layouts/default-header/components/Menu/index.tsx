import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import useTheme from '@/lib/hooks/useTheme';

const MenuChild = dynamic(() => import('../MenuChild'), { ssr: false });

type MenuProps = {
  handleLogout: () => void;
};

type MenuItemsProps = {
  icon: React.ReactElement;
  title: string;
  to?: string;
  func?: () => void;
  children?: { type: string; data: any };
};

const Menu = ({ handleLogout }: MenuProps) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [isChangedDropdown, setIsChangedDropdown] = useState<boolean>(false);
  const [selectedTypeChild, setSelectedTypeChild] = useState<string | null>(null);
  const { themeLocal, toggleTheme } = useTheme();

  const MENU_ITEMS: MenuItemsProps[] = useMemo(() => {
    return [
      {
        icon: <AccountCircleOutlinedIcon sx={{ fontSize: '80% !important' }} />,
        title: 'Tài khoản của tôi',
        to: '/user/account'
      },
      {
        icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '80% !important' }} />,
        title: 'Trang Admin',
        to: '/admin'
      },
      {
        icon: <LanguageOutlinedIcon sx={{ fontSize: '80% !important' }} />,
        title: 'Ngôn ngữ',
        func: () => setIsChangedDropdown(true),
        children: {
          type: 'language',
          data: [
            {
              title: 'Tiếng Việt',
              func: () => router.push({ pathname, query }, asPath, { locale: 'vi' })
            },
            {
              title: 'Tiếng Anh',
              func: () => router.push({ pathname, query }, asPath, { locale: 'en' })
            }
          ]
        }
      },
      {
        icon:
          themeLocal === 'dark' ? (
            <DarkModeOutlinedIcon className='dark_toggle' sx={{ fontSize: '80% !important' }} />
          ) : (
            <WbSunnyOutlinedIcon className='dark_toggle' sx={{ fontSize: '80% !important' }} />
          ),
        title: 'Giao diện',
        func: toggleTheme
      },
      {
        icon: <LogoutOutlinedIcon sx={{ fontSize: '80% !important' }} />,
        title: 'Đăng xuất',
        func: () => handleLogout()
      }
    ];
  }, [handleLogout, themeLocal]);

  const childrenItems = useMemo(() => {
    if (selectedTypeChild === null) return [];
    return MENU_ITEMS.filter((item) => item.children?.type === selectedTypeChild).map(
      (obj) => obj.children?.data
    );
  }, [selectedTypeChild, MENU_ITEMS]);

  return (
    <div
      className={`dropdown ${isChangedDropdown && 'expand'}`}
      onMouseLeave={() => setIsChangedDropdown(false)}
    >
      <div className='dropdown-content'>
        <div className='dropdown-enter'>
          {MENU_ITEMS.map((menu, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedTypeChild(menu.children?.type || null)}
                role='presentation'
              >
                {menu.to ? (
                  <Link className='dropdown_item' href={menu.to}>
                    {menu.icon}
                    <span>{menu.title}</span>
                  </Link>
                ) : (
                  <p className='dropdown_item' onClick={menu.func} role='presentation'>
                    {menu.icon}
                    <span>{menu.title}</span>
                    {menu.children ? (
                      <ArrowBackIosNewOutlinedIcon
                        sx={{
                          fontSize: '80% !important',
                          transform: 'rotate(180deg)'
                        }}
                      />
                    ) : null}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className='dropdown-expand'>
          {childrenItems.length !== 0 ? (
            <MenuChild childrenItems={childrenItems} setIsChangedDropdown={setIsChangedDropdown} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Menu;
