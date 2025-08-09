import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ repo: string }> }
) {
  const { repo } = await params

  try {
    const response = await fetch(`https://api.github.com/repos/dipu67/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
        // Add GitHub token if you have one (recommended for higher rate limits)
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Return only the stats we need
    const stats = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      language: data.language,
      updated: data.updated_at,
      description: data.description,
      topics: data.topics || [],
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error(`Error fetching GitHub data for ${repo}:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch repository data' },
      { status: 500 }
    )
  }
}
