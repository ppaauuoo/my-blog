


const TEMP = [{
    date:"10/2/22",
    title:"Dog",
    desc:"this is dog blog."
},{
    date:"5/2/22",
    title:"Balll",
    desc:"this is ball blog."
}]

function LoadBlog(){
    return (
        TEMP&&
            TEMP.map(blog => (
                <li key={blog.title}>
                    <h4>{blog.title} - {blog.date}</h4>
                    <p>{blog.desc}</p>
                    
                </li>
            ))
    );
}

export default function Blog() {

  return (
    <main className="prose lg:prose-xl flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Blog</h2>
        <p>Check out my latest blog posts:</p>
        <ul className="list-disc pl-4">
            {LoadBlog()}
        </ul>
      </div>
    </main>
  );
}
