import { getBlogs } from "@/lib/blogs";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog | Hirloye Careers",
  description: "Read the latest digital marketing updates, insights, and expert tips from the Hirloye academy team. Stay ahead in your career with our industry-focused articles.",
  keywords: "digital marketing blog, marketing insights, Hirloye updates",
  alternates: {
    canonical: "/blog",
    languages: {
      "en": "/blog",
      "x-default": "/blog",
    },
  },
};

export default async function BlogListingPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) || 1 : 1;
  const categoryFilter = typeof searchParams.category === 'string' ? searchParams.category : null;
  
  const allBlogs = await getBlogs();
  
  // Extract unique categories
  const categories = Array.from(new Set(allBlogs.map(b => b.category || "Uncategorized"))).sort();
  
  // Filter by category
  const blogs = categoryFilter 
    ? allBlogs.filter(b => (b.category || "Uncategorized") === categoryFilter)
    : allBlogs;
  
  const pageSize = 6;
  const totalPages = Math.ceil(blogs.length / pageSize);
  const paginatedBlogs = blogs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Our Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover insights, tutorials, and updates from our team.
        </p>
      </div>

      {/* Category Filter Capsules */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Link 
          href="/blog"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !categoryFilter 
              ? "bg-blue-600 text-white shadow-md" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog?category=${encodeURIComponent(cat)}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              categoryFilter === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No blogs found in this category. Check back later!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedBlogs.map((blog) => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group h-full block">
                <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
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
                        {blog.category || "Uncategorized"}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                      {blog.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-gray-200">{blog.author || "Anonymous"}</span>
                      <span className="text-blue-600 dark:text-blue-400 group-hover:underline">Read more &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Link
                  key={i}
                  href={`/blog?page=${i + 1}&category=${categoryFilter || ''}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    page === i + 1
                      ? "bg-blue-600 text-white font-medium shadow-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
