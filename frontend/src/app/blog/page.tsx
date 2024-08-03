import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
interface Blog {
  id: number;
  attributes: {
    date: string;
    title: string;
    desc: string;
    body: BlocksContent;
  };
}

const fetchData = async () => {
  const url = "http://127.0.0.1:1337/api/blogs";
  const token =
    "bearer 054bd1f2a91e55d3169adfd0fb2d51f80f64f4888c7156b70a937c81a673d64ea5eb4caf6cc2426254333dd7acf085ebdf2764f0ef52fcc806235d2dcff03e18a19878947dfb0e461e2ec699213a24a9d61ca3a63f3e536c3dec0b3518e0f7dfc2834cbe7f12019cc21e331b6f4c1cca107488a3d23ab60b543a2d8dca9de463";

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
};

const loadBlogs = (data: Blog[]) =>
  data.map((item: Blog) => (
    <li key={item.id} className="blog-post">
      <h3>{item.attributes.title}</h3>
      <p>{item.attributes.desc}</p>
      {item.attributes.body && (
        <BlocksRenderer content={item.attributes.body} />
      )}
      <p>{item.attributes.date}</p>
    </li>
  ));

export default async function Blog() {
  const data = await fetchData();

  console.log(data);

  return (
    <main className="prose lg:prose-xl flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Blog</h2>
        {data.length > 0 ? (
          <>
            <p>Check out my latest blog posts:</p>
            <ul className="list-disc pl-4">{loadBlogs(data)}</ul>
          </>
        ) : (
          <p>Error 404 : Data not found.</p>
        )}
      </div>
    </main>
  );
}
