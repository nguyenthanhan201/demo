import { useEffect, useState } from 'react';

const Test = () => {
  const [myFunction, setMyFunction] = useState();

  useEffect(() => {
    setMyFunction((prev) => {
      console.log('prev', prev);
      return () => {
        console.log('test');
      };
    });
  }, []);

  return <div onClick={myFunction}>test</div>;
};

export default Test;
