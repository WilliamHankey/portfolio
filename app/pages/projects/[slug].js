import { useRouter } from 'next/router'

export default function Project({ project }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-4">{project.title}</h1>
      <p className="text-gray-700">{project.description}</p>
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        View Project
      </a>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = [
    { params: { slug: 'project-one' } },
    { params: { slug: 'project-two' } },
  ]
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const projects = {
    'project-one': { title: 'Project One', description: 'Description for project one.', url: 'https://example.com/project-one' },
    'project-two': { title: 'Project Two', description: 'Description for project two.', url: 'https://example.com/project-two' },
  }
  const project = projects[params.slug] || null

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: { project },
    revalidate: 10,
  }
}
