const index = () => {
  const get = async () => {
    // await ProductServices.getAll().then((rs) => {
    //   console.log(rs);
    // });

    await fetch('http://localhost:8080/api/v1/product')
      .then((res) => res.json())
      .then((test) => {
        console.log('👌  test:', test);
      });
  };

  // useEffect(() => {
  //   testHttp.get('api/v1/product', {
  //     data: []
  //   });
  // }, []);

  return (
    <div>
      index{' '}
      <button onClick={get} type='button'>
        click
      </button>
    </div>
  );
};

export default index;

export async function getServerSideProps() {
  // const products = await ProductServices.getAll();

  return {
    props: {
      users: []
      // brands: res[0].data,
      // products: res[1].data,
    }
  };
}
