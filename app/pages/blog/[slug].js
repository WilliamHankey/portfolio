import { useRouter } from 'next/router'

export default function BlogPost({ post }) {
  const router = useRouter()

  // Show a loader while the page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-4">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  )
}

// This function gets called at build time for every possible slug.
export async function getStaticPaths() {
  // For example, get list of slugs from your CMS or local files.
  const paths = [
    { params: { slug: 'my-first-blog' } },
    { params: { slug: 'another-blog-post' } },
  ]
  return { paths, fallback: true }
}

// Fetch data for a single post based on the slug.
export async function getStaticProps({ params }) {
  // Replace with real data fetching logic
  const posts = {
    'my-first-blog': { title: 'My First Blog', content: 'Content of my first blog.' },
    'another-blog-post': { title: 'Another Blog Post', content: 'More content here.' },
  }
  const post = posts[params.slug] || null

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post },
    revalidate: 10, // optional: ISR (Incremental Static Regeneration)
  }
}
