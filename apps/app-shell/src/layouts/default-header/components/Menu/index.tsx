import { AccountCircleOutlined as AccountCircleOutlinedIcon } from '@repo/icons/src/AccountCircleOutlined';
import { AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon } from '@repo/icons/src/AdminPanelSettingsOutlined';
import { ArrowBackIosNewOutlined as ArrowBackIosNewOutlinedIcon } from '@repo/icons/src/ArrowBackIosNewOutlined';
import { DarkModeOutlined as DarkModeOutlinedIcon } from '@repo/icons/src/DarkModeOutlined';
import { LanguageOutlined as LanguageOutlinedIcon } from '@repo/icons/src/LanguageOutlined';
import { LogoutOutlined as LogoutOutlinedIcon } from '@repo/icons/src/LogoutOutlined';
import { WbSunnyOutlined as WbSunnyOutlinedIcon } from '@repo/icons/src/WbSunnyOutlined';
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
        icon: <AccountCircleOutlinedIcon />,
        title: 'Tài khoản của tôi',
        to: '/user/account'
      },
      {
        icon: <AdminPanelSettingsOutlinedIcon />,
        title: 'Trang Admin',
        to: '/admin'
      },
      {
        icon: <LanguageOutlinedIcon />,
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
            <DarkModeOutlinedIcon className='dark_toggle' />
          ) : (
            <WbSunnyOutlinedIcon className='dark_toggle' />
          ),
        title: 'Giao diện',
        func: toggleTheme
      },
      {
        icon: <LogoutOutlinedIcon />,
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
                    {menu.children ? <ArrowBackIosNewOutlinedIcon className='rotate-180' /> : null}
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
