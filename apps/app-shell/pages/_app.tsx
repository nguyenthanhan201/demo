// eslint-disable-next-line simple-import-sort/imports
import '../src/sass/index.scss';

import useAuth from '@/lib/hooks/useAuth';
import useTheme from '@/lib/hooks/useTheme';
import { ToastProvider } from '@/lib/providers/toast-provider';
import { useNetwork } from 'my-package/dist/useNetwork';
import { DefaultSeo, NextSeo } from 'next-seo';
import { Roboto } from 'next/font/google';
import { Fragment } from 'react';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['vietnamese']
});

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // require('../mocks');
  import('../msw').then(async ({ initMocks }) => {
    initMocks();
  });
}

const MyApp = ({ Component, pageProps }: any) => {
  useTheme();
  useAuth();
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  const { online } = useNetwork();

  // const [queryClient] = useState(() => new QueryClient(queryConfig));

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

  // const ProvidersTree = buildProvidersTree([
  //   // [ColorModeContext.Provider, { value: colorMode }],
  //   // [ThemeProvider, { theme: theme }],
  //   // // [Provider, { store }],
  //   // [QueryClientProvider, { client: queryClient }],
  //   // [Hydrate, { state: pageProps.dehydratedState }],
  //   [ToastProvider] as any
  // ] as const);

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
        description='A simple project starter to work with Next.js, TypeScript, Tailwind CSS, and ESLint.'
      />
      {pageProps.seo ? <NextSeo {...pageProps.seo} /> : null}
      <ToastProvider>
        <main className={roboto.className}>
          <Layout {...layoutProps}>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ToastProvider>
    </>
  );
};
export default MyApp;
// MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
//   const pageProps = await App.getInitialProps(appContext);
//   const { ctx } = appContext;
//   let userData = null;
//   setContext(ctx as any);

//   const { isMobile } = checkServerSideDeviceDetection(ctx);
//   const { AuthServices } = await import('../src/lib/repo/auth.repo');
//   userData = await AuthServices.getProfile();

//   return {
//     pageProps: {
//       ...pageProps.pageProps
//     }
//   };
// };
