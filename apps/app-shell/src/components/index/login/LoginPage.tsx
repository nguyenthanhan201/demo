import { setAccessTokenToCookie, setRefreshTokenToCookie } from '@/lib/helpers/auth';

const LoginPage = () => {
  const googleSignIn = async () => {
    const authentication = await import('../../../configs/firebase.config').then(
      (res) => res.authentication
    );
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    const AuthServices = await import('@/lib/repo/auth.repo').then((res) => res.AuthServices);

    try {
      await signInWithPopup(authentication, new GoogleAuthProvider()).then(async (result: any) => {
        // console.log('👌  result:', result._tokenResponse.idToken);
        await AuthServices.login({
          providerToken: result._tokenResponse.idToken,
          providerType: 'firebase'
        }).then(async (res) => {
          setAccessTokenToCookie(res.access_token, {
            // 2 day
            expires: new Date(Date.now() + 2 + 24 * 60 * 60 * 1000)
            // sameSite: 'None'
          });
          setRefreshTokenToCookie(res.refresh_token, {
            // 7 days
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          });

          window.location.replace('/');
        });
      });
    } catch (err) {
      alert('Đăng nhập thất bại');
      console.log(err);
    }
  };

  const supabaseSignIn = async () => {
    const supabase = await import('@/configs/supabase.config').then((res) => res.default);

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3002/return-url/supabase/'
      }
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
        <button className='btn btn-google' onClick={supabaseSignIn} type='button'>
          <i className='bx bxl-google' /> <p>Đăng nhập với supabase</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
