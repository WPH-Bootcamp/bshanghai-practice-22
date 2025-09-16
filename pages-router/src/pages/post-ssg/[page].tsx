// ssr page
import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
  page: number;
};

const PostSSGPage = ({ posts, page }: Props) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <div className="flex gap-4">
        {page > 1 && <Link href={`/post-ssg/${page - 1}`}>prev</Link>}
        {page < 10 && <Link href={`/post-ssg/${page + 1}`}>next</Link>}
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const totalPages = 10;
  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = parseInt((context?.params?.page as string) || "1", 10);
  const limit = 10;
  const start = (page - 1) * limit;
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_start=" + start + "&_limit=10"
  );
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
      page,
    },
    revalidate: 60,
  };
};

export default PostSSGPage;
