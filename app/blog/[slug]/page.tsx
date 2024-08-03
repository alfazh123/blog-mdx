import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

function getPost() {
    const dir = path.join(process.cwd(), "app/posts");
    const files = fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
    return files.map((filename) => {
        const { content, data } = matter(
            fs.readFileSync(path.join(dir, filename), "utf8")
        );
        const slug = path.basename(filename, ".mdx");
        return {
            slug,
            data,
            content,
        };
    });
}

export default function Blog({ params }: { params: { slug: string } }) {
    const props = getPost().find((post) => post.slug === params.slug);

    if (!props) {
        return <div>Post not found</div>;
    }
    return (
        <section className="px-4 pt-32 backdrop-blur-2xl bg-white dark:bg-black100 bg-opacity-40 dark:bg-opacity-25 rounded-md">
            <h1 className="font-bold text-4xl">{props.data.title}</h1>
            <article className="prose px-4 md:prose-xl prose-sm text-black prose-headings:text-black dark:text-white prose-headings:dark:text-white mx-auto pb-20 prose-p:leading-normal prose-li:leading-3 prose-pre:leading-8">
                <MDXRemote source={props.content} />
            </article>
        </section>
    );
}