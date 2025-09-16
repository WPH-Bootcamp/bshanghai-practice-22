// ssr page
import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
  page: number;
};

const PostSSRPage = ({ posts, page }: Props) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <div className="flex gap-4">
        {page > 1 && <Link href={`/post-ssr?page=${page - 1}`}>prev</Link>}
        <Link href={`/post-ssr?page=${page + 1}`}>next</Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt((context.query.page as string) || "1", 10);
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
  };
};

export default PostSSRPage;
