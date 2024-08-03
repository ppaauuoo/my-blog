'use client'

import { useEffect, useState } from "react";

type Blog = {
  date: string;
  title: string;
  desc: string;
};

export default function Blog() {
  const [data, setData] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:1337/api/blogs";
      const token =
        "bearer 4ad19f838c255ae035ef79504a7a285c19041eccc53c0cc6e4901e7311b442a519ca085647dd73099979162b91a8e6af19f05246a1b7da64b82d6aa69188a448c236cac72f36626d0b8f9647289bbef9db359ea91669f3c1da65eeed646c3e89aba7354ddb793c629bc69bdbc4a46daa8f38b6dce084f1e0707ac88a281bd881";

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="prose lg:prose-xl flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Blog</h2>
    
        <p>Check out my latest blog posts:</p>
        <ul className="list-disc pl-4">
          {data.map((item: Blog) => (
            <div key={item.date} className="blog-post">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </ul>
      </div>
    </main>
  );
}