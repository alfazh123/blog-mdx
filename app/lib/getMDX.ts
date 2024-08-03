import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function generateStaticParams() {
    const dir = path.join(process.cwd(), "app/posts");
    const files = fs.readdirSync(dir);
    const contentFile = files.map((file) => {
        return fs.readFileSync(`${dir}/${file}`, "utf8");
    });
    //...
    let frontMatter = contentFile.map((file) => {
        const data = matter(file);
        return data.data;
    });

    const slug = files.map((file) => {
        const slug = file.replace(".mdx", "");
        return slug;
    });

    return {
        props: {
            frontMatter,
            slug,
        },
    };
}