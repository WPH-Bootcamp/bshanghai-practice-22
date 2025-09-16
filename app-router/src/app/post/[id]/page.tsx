/* eslint-disable @typescript-eslint/no-explicit-any */

// app router itu by default component nya server component
"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const PostDetailPage = ({ params }: any) => {
  const solvedParams: any = React.use(params);
  console.log(solvedParams);
  const searchParams = useSearchParams();
  console.log(searchParams.get("sortBy"));

  return <div>detail for post with id: {solvedParams?.id}</div>;
};

export default PostDetailPage;
