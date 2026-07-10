import { getBlogs } from "@/lib/blogs";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Blog Post | Hirloye Careers",
  description: "Read our latest blog post.",
};

type Params = Promise<{ slug: string }>;

async function getGoogleDocHtml(docId: string) {
  try {
    const res = await fetch(`https://docs.google.com/document/d/${docId}/export?format=html`, {
      next: { revalidate: 0 } // Temporarily disable cache for development
    });
    if (!res.ok) return null;
    
    const html = await res.text();
    
    // Extract the <style> tags
    const stylesMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/ig);
    const styles = stylesMatch ? stylesMatch.join("\n") : "";
    
    // Extract the <body> content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : "";
    
    return styles + "\n" + '<div class="google-doc-content">' + bodyContent + '</div>';
  } catch (e) {
    console.error("Error fetching google doc", e);
    return null;
  }
}

export default async function SingleBlogPage(props: { params: Params }) {
  const params = await props.params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const docHtml = blog.docId ? await getGoogleDocHtml(blog.docId) : null;

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-flex items-center gap-2 transition-colors">
        &larr; Back to all blogs
      </Link>
      
      {blog.image && (
        <div className="w-full h-[300px] md:h-[450px] relative rounded-2xl overflow-hidden mb-8 bg-gray-100 shadow-sm">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" />
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
          {blog.category || "Uncategorized"}
        </span>
        <span className="text-gray-500 text-sm">By {blog.author || "Anonymous"}</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>
      
      <p className="text-xl text-gray-600 mb-12 leading-relaxed">
        {blog.description}
      </p>
      
      {docHtml ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mt-8">
          <div 
            dangerouslySetInnerHTML={{ __html: docHtml }} 
            className="prose prose-lg max-w-none prose-blue"
          />
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Content Not Available</h2>
          <p className="text-blue-800 mb-4 max-w-2xl mx-auto">
            The content for this blog could not be loaded. Please ensure the Google Doc is shared as "Anyone with the link can view".
          </p>
        </div>
      )}
    </div>
  );
}
