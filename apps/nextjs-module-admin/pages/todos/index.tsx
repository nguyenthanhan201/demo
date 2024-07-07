import type { InferGetStaticPropsType } from 'next';

export const getStaticProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = await res.json();
  return { props: { repo } };
};

export default function Page({ repo }: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.stargazers_count;
}
