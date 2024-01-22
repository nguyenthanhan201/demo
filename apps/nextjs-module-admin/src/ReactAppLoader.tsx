type ReactAppLoaderProps = {
  title: string;
  age2?: number;
};

const ReactAppLoader = ({ title, age2 }: ReactAppLoaderProps) => {
  return (
    <div>
      ReactAppLoader | {title} | {age2}
    </div>
  );
};

export default ReactAppLoader;
