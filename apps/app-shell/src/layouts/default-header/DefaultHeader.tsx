import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { KeyboardArrowLeft as KeyboardArrowLeftIcon } from '@repo/icons/src/KeyboardArrowLeft';
import { LiveTv as LiveTvIcon } from '@repo/icons/src/LiveTv';
import { LocalMallOutlined as LocalMallOutlinedIcon } from '@repo/icons/src/LocalMallOutlined';
import { Login as LoginIcon } from '@repo/icons/src/Login';
import { Menu as MenuIcon } from '@repo/icons/src/Menu';
import { RssFeedOutlined } from '@repo/icons/src/RssFeedOutlined';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ElementRef, useCallback, useEffect, useRef, useState } from 'react';

import Img from '@/components/shared/Img/Img';
import { logoutWithGoogle } from '@/configs/firebase.config';
import useTrans, { TranslatedHeader } from '@/lib/hooks/useTrans';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useCartStore } from '@/lib/zustand/useCartStore';
import { CartItem } from '@/types/cartItem.type';

import { mainNav } from '../../utils/fake-data/header-navs';

const DynamicMenu = dynamic(() => import('./components/Menu'), { ssr: false });
const DynamicAvatar = dynamic(() => import('@mui/material/Avatar'), { ssr: false });

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

  const handleLogout = async () => {
    if (!auth?.email) return;
    // const authentication = await import('../../configs/firebase.config').then(
    //   (res) => res.authentication
    // );
    // const { signOut } = await import('https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js');
    const AuthServices = await import('@/lib/repo/auth.repo').then((res) => res.AuthServices);
    const { removeAccessTokenFromCookie, removeRefreshTokenFromCookie } = await import(
      '@/lib/helpers/auth'
    );

    // const promise1 = await signOut(authentication);
    const promise2 = await AuthServices.logout(auth.email);

    await Promise.all([promise2])
      .then(async () => {
        // await signOut(authentication);
        await logoutWithGoogle();
        removeAccessTokenFromCookie();
        removeRefreshTokenFromCookie();
        setAuth(null);
        setCart({} as CartItem);
        router.push('/');
      })
      .catch((err) => {
        // console.log(err);
        alert(err);
      });
  };

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
        query: { roomId: roomData.metadata._id }
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
              <KeyboardArrowLeftIcon />
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
            <div className='header_menu_item header_menu_right_item'>
              <Tooltip title='Live Stream'>
                <div onClick={handleClickLiveStream}>
                  <LiveTvIcon />
                </div>
              </Tooltip>
            </div>
            <div className='header_menu_item header_menu_right_item'>
              <Tooltip title='Bài post'>
                <Link href='/blog' prefetch={false}>
                  <RssFeedOutlined />
                </Link>
              </Tooltip>
            </div>
            <div className='header_menu_item header_menu_right_item'>
              <Tooltip title='Giỏ hàng'>
                <Link href='/cart' prefetch={false}>
                  <Badge badgeContent={Object.keys(cart).length} color='primary'>
                    <LocalMallOutlinedIcon />
                  </Badge>
                </Link>
              </Tooltip>
            </div>
            <div className='header_menu_item header_menu_right_item'>
              {auth ? (
                <>
                  <DynamicAvatar sx={{ width: 27, height: 27 }}>
                    {auth.name?.charAt(0)}
                  </DynamicAvatar>
                  <DynamicMenu handleLogout={handleLogout} />
                </>
              ) : (
                <Tooltip title='Đăng nhập'>
                  <Link href='/login' prefetch={false}>
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
