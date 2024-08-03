import Link from "next/link";

import { generateStaticParams } from "../lib/getMDX";

export default async function BlogPage() {

    const fetchDataBlog = async () => {
        const data = generateStaticParams();
        const frontMatter = data.props.frontMatter;
        const slug = data.props.slug;
        return {
            frontMatter,
            slug,
        };
    }

    const data = await fetchDataBlog();


    console.log(data);

    return (
        <main className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl">Blog</h1>
        <Link className="bg-green-400 px-3 py-1 rounded-md" href={"/"}>Home page</Link>
        <div className="space-y-4 py-4">
            {data.frontMatter.map((item, id)=> (
                <div key={id} className="flex flex-col justify-center items-center bg-slate-200 p-4 rounded-md">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <Link href={`/blog/${data.slug[id]}`} className="underline">Read more</Link>
                </div>
            ))}
        </div>
        </main>
    );
}