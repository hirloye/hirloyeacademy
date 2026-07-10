import { Blog } from "@/types/blog";

// Ensure we have a valid URL or provide a fallback
const API_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "YOUR_APPS_SCRIPT_URL_HERE";

function formatImageUrl(url: string) {
  if (!url) return "";
  // Check if it's a Google Drive link
  const match = url.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    // Use lh3.googleusercontent.com which is more reliable for <img> tags
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 0 }, // Temporarily disable cache for development
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs. Status: ${res.status}`);
    }

    const data = await res.json();
    
    // Depending on the Apps Script format, it might return an array directly
    // or an object with the data inside it.
    let blogs: Blog[] = Array.isArray(data) ? data : data.data || data.items || [];
    
    // Format image URLs and docIds
    blogs = blogs.map(blog => {
      let parsedDocId = blog.docId;
      // Extract ID if a full Google Docs URL is provided
      if (parsedDocId && parsedDocId.includes("docs.google.com/document/d/")) {
        const docMatch = parsedDocId.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (docMatch && docMatch[1]) {
          parsedDocId = docMatch[1];
        }
      }

      return {
        ...blog,
        docId: parsedDocId,
        image: formatImageUrl(blog.image)
      };
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}
