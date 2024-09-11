import { MDXRemote } from "next-mdx-remote/rsc";
import { generateStaticParams } from "@/app/lib/getMDX";

export default async function Blog({ params }: { params: { slug: string } }) {
    const post = generateStaticParams().find((post) => post.slug === params.slug);

    if (!post) {
        return <div>Post not found</div>;
    }
    return (
        <section className="px-4 pt-32 backdrop-blur-2xl bg-white dark:bg-black100 bg-opacity-40 dark:bg-opacity-25 rounded-md">
            <h1 className="font-bold text-4xl">{post.frontMatter.title}</h1>
            <article className="prose px-4 md:prose-xl prose-sm text-black prose-headings:text-black mx-auto pb-20 prose-p:leading-normal prose-li:leading-3 prose-pre:leading-8">
                <MDXRemote source={post.content} />
            </article>
        </section>
    );
}