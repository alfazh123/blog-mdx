import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function generateStaticParams() {
    const dir = path.join(process.cwd(), "posts");
    const files = fs.readdirSync(dir);
    const contentFile = files.map((file) => {
        return fs.readFileSync(`${dir}/${file}`, "utf8");
    });
    //...

    const slug = files.map((file) => {
        const slug = file.replace(".mdx", "");
        return slug;
    });

    let frontMatter = contentFile.map((file, id) => {
        const {content,data} = matter(file);
        return {
            frontMatter: data,
            content: content,
            slug: slug[id]
        };
    });


    return frontMatter;
}