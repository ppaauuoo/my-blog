import { useEffect, useState } from "react";
import { useClient } from "next/data-client";

type Blog = {
  date: string;
  title: string;
  desc: string;
};

export default function Blog() {
  const [data, setData] = useState<Blog[]>([]);
  useClient(); // Marking this component as a client component

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:1337/api/blogs";
      const token =
        "bearer 7e9ef694751918afacef7762dae9078a0b87250ccdc476fa29333c441fdf19401ef75634386edd3876f12fd0acc1ea3542208470544aeac2065ce5be462a6193390ec668d9ac971eba871d8767c22c05076e9364dbb1c7d188bed1ff727136ce83a74a52c1557bb36d37b245b32806c76497cb742f15654c7828dc603be11a64";

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