import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ElementRef, useCallback, useEffect, useRef, useState } from 'react';

import Img from '@/components/shared/Img/Img';
import useTrans, { TranslatedHeader } from '@/lib/hooks/useTrans';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useCartStore } from '@/lib/zustand/useCartStore';
import { CartItem } from '@/types/cartItem.type';

import { mainNav } from '../../utils/fake-data/header-navs';

const Menu = dynamic(() => import('./components/Menu'), { ssr: false });

const DefaultHeader = () => {
  const { auth, setAuth } = useAuthStore(['auth', 'setAuth']);
  const { cart, setCart } = useCartStore(['cart', 'setCart']);
  const router = useRouter();
  const menuLeft = useRef<ElementRef<'div'>>(null);
  const [headerShrink, setHeaderShrink] = useState(false);
  const trans = useTrans();

  const menuToggle = useCallback(() => {
    menuLeft.current?.classList.toggle('active');
  }, []);

  const handleLogout = useCallback(async () => {
    if (!auth?.email) return;
    const authentication = await import('../../configs/firebase.config').then(
      (res) => res.authentication
    );
    const { signOut } = await import('firebase/auth');
    const AuthServices = await import('@/lib/repo/auth.repo').then((res) => res.AuthServices);
    const removeCookie = await import('@/lib/hooks/useCookie').then((res) => res.removeCookie);

    // const promise1 = await signOut(authentication);
    const promise2 = await AuthServices.logout(auth.email);

    await Promise.all([promise2])
      .then(async () => {
        await signOut(authentication);
        removeCookie('token');
        removeCookie('refreshToken');
        setAuth(null);
        setCart({} as CartItem);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [auth?.email]);

  const handleClickLiveStream = async () => {
    const isLiveStreamPage = router.pathname.includes('live-stream');

    if (isLiveStreamPage) return;

    if (auth) {
      const LiveStreamServices = await import('@/lib/repo/live-stream').then(
        (res) => res.LiveStreamServices
      );
      const roomData = await LiveStreamServices.getRoomData();
      return router.push({
        pathname: '/live-stream/[roomId]',
        query: { roomId: roomData?.roomId }
      });
    }

    return router.push('/live-stream');
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        setHeaderShrink(true);
      } else {
        setHeaderShrink(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className={`header ${headerShrink && 'shrink'}`}>
      <div className='container'>
        <div className='header_menu'>
          <div className='header_menu_mobile-toggle' onClick={menuToggle} role='presentation'>
            <MenuIcon fontSize='inherit' />
          </div>
          <div className='header_menu_left' ref={menuLeft}>
            <div className='header_menu_left_close' onClick={menuToggle} role='presentation'>
              <KeyboardArrowLeftIcon fontSize='inherit' />
            </div>
            {mainNav.map((item, index) => (
              <div
                className={`header_menu_item header_menu_left_item ${
                  item.path === router.pathname ? 'active' : ''
                }`}
                key={index}
                onClick={menuToggle}
                role='presentation'
              >
                <Link href={item.path} prefetch={false}>
                  <span>{trans.header[item.name as TranslatedHeader]}</span>
                </Link>
              </div>
            ))}
          </div>
          <Link className='header_logo' href='/' prefetch={false}>
            <Img
              alt='Yolo'
              layout='fill'
              loading='eager'
              src='/images/Logo-2.png'
              style={{
                objectFit: 'contain'
              }}
            />
          </Link>
          <div className='header_menu_right'>
            <div
              className='header_menu_item header_menu_right_item'
              onClick={handleClickLiveStream}
            >
              <Tooltip title='Live Stream'>
                <LiveTvIcon />
              </Tooltip>
            </div>
            <div className='header_menu_item header_menu_right_item'>
              <Tooltip title='Giỏ hàng'>
                <Link href='/cart'>
                  <Badge badgeContent={Object.keys(cart).length} color='primary'>
                    <LocalMallOutlinedIcon />
                  </Badge>
                </Link>
              </Tooltip>
            </div>
            <div className='header_menu_item header_menu_right_item'>
              {auth ? (
                <>
                  <Avatar sx={{ width: 27, height: 27 }}>{auth.name?.charAt(0)}</Avatar>
                  <Menu handleLogout={handleLogout} />
                </>
              ) : (
                <Tooltip title='Đăng nhập'>
                  <Link href='/login'>
                    <LoginIcon />
                  </Link>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultHeader;
