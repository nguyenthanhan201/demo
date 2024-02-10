// eslint-disable-next-line simple-import-sort/imports
import { buildProvidersTree } from '@/lib/helpers';
import '../src/sass/index.scss';

import useTheme from '@/lib/hooks/useTheme';
import { ToastProvider } from '@/lib/providers/toast-provider';
import { useNetwork } from 'my-package';
import { DefaultSeo, NextSeo } from 'next-seo';
import { Roboto } from 'next/font/google';
import { Fragment } from 'react';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['vietnamese']
});

const MyApp = ({ Component, pageProps }: any) => {
  useTheme();
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  // const [theme, colorMode] = useMode();
  const { online } = useNetwork();
  // const [queryClient] = useState(() => new QueryClient());

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
    // [ColorModeContext.Provider, { value: colorMode }],
    // [ThemeProvider, { theme: theme }],
    // [Provider, { store }],
    // [QueryClientProvider, { client: QueryClient }],
    // [Hydrate, { state: pageProps.dehydratedState }],
    [ToastProvider] as any
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
            <Component {...pageProps} />
          </Layout>
        </main>
      </ProvidersTree>
    </>
  );
};
export default MyApp;
