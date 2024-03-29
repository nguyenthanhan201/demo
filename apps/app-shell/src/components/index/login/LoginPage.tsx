const LoginPage = () => {
  const googleSignIn = async () => {
    const authentication = await import('../../../configs/firebase.config').then(
      (res) => res.authentication
    );
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    const AuthServices = await import('@/lib/repo/auth.repo').then((res) => res.AuthServices);
    const setCookie = await import('@/lib/hooks/useCookie').then((res) => res.setCookie);

    await signInWithPopup(authentication, new GoogleAuthProvider())
      .then(async (result) => {
        await AuthServices.login(result.user.email!, result.user.displayName!)
          .then(async (res) => {
            setCookie('token', res.access_token, {
              // 2 day
              expires: new Date(Date.now() + 2 + 24 * 60 * 60 * 1000)
              // sameSite: 'None'
            });
            setCookie('refreshToken', res.refresh_token, {
              // 7 days
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });

            window.location.replace('/');
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      })
      .catch((err) => {
        alert('Đăng nhập thất bại');
        console.log(err);
      });
  };

  return (
    <div className='form-login'>
      <img alt='yolo-gif' loading='lazy' src='/images/gifs/ezgif.com-gif-maker.webp' />
      <div className='form-login__left'>
        <img alt='logo' src='/images/Logo-2.png' />
        <button className='btn btn-google' onClick={googleSignIn} type='button'>
          <i className='bx bxl-google' /> <p>Đăng nhập với google</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
