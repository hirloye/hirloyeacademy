import { getBlogs } from "@/lib/blogs";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return {
    title: "Blog Post | Hirloye Careers",
    description: "Read our latest blog post on digital marketing trends, career advice, and industry updates. Stay informed and ahead of the curve with Hirloye academy insights.",
    keywords: "digital marketing blog, marketing trends, career advice",
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        "en": `/blog/${slug}`,
        "x-default": `/blog/${slug}`,
      },
    },
  };
}

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
  const recentBlogs = blogs.filter(b => b.slug !== params.slug).slice(0, 3);

  return (
    <div className="w-full pb-12 md:pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[400px] flex flex-col justify-end">
        {blog.image ? (
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900" />
        )}
        
        {/* Dark overlay for readability - Darkened for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30" />

        {/* Back Button (Glass) */}
        <Link 
          href="/blog" 
          className="absolute top-8 left-4 md:left-8 z-10 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all flex items-center gap-2 text-sm font-medium"
        >
          &larr; Back to blogs
        </Link>

        {/* Title and Description overlapping */}
        <div className="relative z-10 w-full px-4 md:px-8 pb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-4 leading-tight max-w-5xl drop-shadow-md">
            {blog.title}
          </h1>
          
          <p className="text-xl md:text-2xl !text-white max-w-3xl leading-relaxed mb-6 drop-shadow">
            {blog.description}
          </p>
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-500/30 text-blue-50 backdrop-blur-md border border-blue-400/40 text-sm font-medium rounded-full shadow-sm">
              {blog.category || "Uncategorized"}
            </span>
            <span className="text-gray-300 text-sm font-medium drop-shadow-sm">By {blog.author || "Anonymous"}</span>
          </div>
        </div>
      </div>

      {/* Content Section (100% width) */}
      <div className="w-full px-4 md:px-8 mt-12">
        {docHtml ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 w-full">
            <div 
              dangerouslySetInnerHTML={{ __html: docHtml }} 
              className="prose prose-lg prose-blue max-w-none w-full"
            />
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center shadow-sm w-full">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Content Not Available</h2>
            <p className="text-blue-800 mb-4 mx-auto">
              The content for this blog could not be loaded. Please ensure the Google Doc is shared as "Anyone with the link can view".
            </p>
          </div>
        )}
      </div>

      {/* Recent Blogs Section */}
      {recentBlogs.length > 0 && (
        <div className="w-full px-4 md:px-8 mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Recent Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((recentBlog) => (
              <Link key={recentBlog.slug} href={`/blog/${recentBlog.slug}`} className="group h-full block">
                <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {recentBlog.image ? (
                      <Image
                        src={recentBlog.image}
                        alt={recentBlog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                        {recentBlog.category || "Uncategorized"}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {recentBlog.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 flex-grow">
                      {recentBlog.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
