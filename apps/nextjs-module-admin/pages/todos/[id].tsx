import type { InferGetStaticPropsType } from 'next';

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const posts = await res.json();

  const paths = posts.map((post: any) => ({
    params: { id: String(post.id) }
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async (context: any) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${context.params.id}`);
  const repo = await res.json();
  return { props: { repo }, revalidate: 9 };
};

export default function Page({ repo }: InferGetStaticPropsType<typeof getStaticProps>) {
  return JSON.stringify(repo);
}
