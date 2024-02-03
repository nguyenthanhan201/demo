// eslint-disable-next-line simple-import-sort/imports
import '../src/sass/index.scss';

import { ThemeProvider } from '@mui/material';
import { useNetwork } from 'my-package';
import { DefaultSeo, NextSeo } from 'next-seo';
import { Roboto } from 'next/font/google';
import { Fragment, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { buildProvidersTree } from '@/lib/helpers';
import { ToastProvider } from '@/lib/providers/toast-provider';
import store from '@/lib/redux/store';
import { ColorModeContext, useMode } from '@/lib/theme/theme';
import { HMSRoomProvider } from '@100mslive/react-sdk';
// import Page404 from './404';
// const Nav = lazy(() => {
//   console.log(import('nextjs-module-admin/Nav'));
//   return import('nextjs-module-admin/Nav');
// });

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['vietnamese']
});

const MyApp = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  const [theme, colorMode] = useMode();
  const { online } = useNetwork();
  const [queryClient] = useState(() => new QueryClient());

  // const channel = new BroadcastChannel('notifications');

  // useEffect(() => {
  //   getMessagingToken();
  // }, []);

  // useEffect(() => {
  //   channel.addEventListener('message', (event) => {
  //     console.log('Receive background: ', event.data);
  //   });

  //   // onMessage(messaging, (payload) => {
  //   //   console.log('Message received. ', payload);
  //   //   // ...
  //   // });
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('load', () => {
  //     if ('serviceWorker' in navigator) {
  //       navigator.serviceWorker
  //         .register('/sw.js')
  //         .then((registration) => console.log('scope is: ', registration.scope));
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', function () {
  //       navigator.serviceWorker.register('../firebase-messaging-sw.js').then(
  //         function (registration) {
  //           console.log('Service Worker registration successful with scope: ', registration.scope);
  //         },
  //         function (err) {
  //           console.log('Service Worker registration failed: ', err);
  //         },
  //       );
  //     });
  //   }
  // }, []);

  const ProvidersTree = buildProvidersTree([
    [ColorModeContext.Provider, { value: colorMode }],
    [ThemeProvider, { theme: theme }],
    [Provider, { store }],
    [QueryClientProvider, { client: queryClient }],
    [Hydrate, { state: pageProps.dehydratedState }],
    [ToastProvider] as any,
    [HMSRoomProvider]
  ] as const);

  if (!online) return <>you offline</>;
  return (
    <>
      <DefaultSeo
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: '/images/favicon.png'
          }
        ]}
      />
      {pageProps.seo ? <NextSeo {...pageProps.seo} /> : null}
      <ProvidersTree>
        <main className={roboto.className}>
          <Layout {...layoutProps}>
            <div
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                zIndex: 1000
              }}
            >
              {/* <Suspense fallback={'loading'}> */}
              {/* <Nav /> */}
              {/* </Suspense> */}
            </div>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ProvidersTree>
    </>
  );
};
// MyApp.getInitialProps = async (ctx: any) => {
//   console.log('in app getInitialProps');
//   const appProps = await App.getInitialProps(ctx);
//   return appProps;
// };
export default MyApp;

//  <ColorModeContext.Provider value={colorMode as any}>
//    <ThemeProvider theme={theme as any}>
//      <ToastProvider>
//        <Provider store={store}>
//          <QueryClientProvider client={queryClient}>
//            {/* Hydrate query cache */}
//            <Hydrate state={pageProps.dehydratedState}>
//              <main className={roboto.className}>
//                <Layout {...layoutProps}>
//                  <Component {...pageProps} />
//                </Layout>
//              </main>
//            </Hydrate>
//          </QueryClientProvider>
//        </Provider>
//      </ToastProvider>
//    </ThemeProvider>
//  </ColorModeContext.Provider>;
