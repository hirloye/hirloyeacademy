import { getBlogs } from "@/lib/blogs";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog | Hirloye Careers",
  description: "Read the latest updates and articles from our team.",
};

export default async function BlogListingPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Our Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover insights, tutorials, and updates from our team.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs published yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group h-full block">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {blog.category || "Uncategorized"}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {blog.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{blog.author || "Anonymous"}</span>
                    <span className="text-blue-600 group-hover:underline">Read more &rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
