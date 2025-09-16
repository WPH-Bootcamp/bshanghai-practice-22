/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router"; //cara lama
// import { useRouter } from "next/navigation"; //untuk pindah navigasi
import { useParams, useSearchParams } from "next/navigation";

const PostDetailPage = () => {
  const params = useParams(); //id
  const searchParams = useSearchParams(); //query string
  console.log(searchParams.get("sortBy"));

  console.log(process.env.NEXT_PUBLIC_API_URL);

  const [data, setdata] = useState<any>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params?.id}`
      );
      console.log(data);
      const json = await data.json();
      console.log(json);
      setdata(json);
    };
    if (params) fetchApi();
  }, [params]);

  return (
    <div>
      detail for post with id: {params?.id}
      <h1>{data?.title}</h1>
    </div>
  );
};

export default PostDetailPage;
