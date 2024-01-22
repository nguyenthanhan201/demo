import { Roboto } from "next/font/google";
import { Fragment } from "react";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["vietnamese"],
});

const MyApp = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};

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

  return (
    <main className={roboto.className}>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
};
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
