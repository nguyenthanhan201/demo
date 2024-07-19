const Error = ({ statusCode, err }: any) => {
  console.log('👌  statusCode:', statusCode);
  console.log('👌  err:', err);
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
};

// Error.Layout = DefaultLayout;

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;
