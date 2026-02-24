import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export interface BlogPost {
  id: number;
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  labels: Array<{ name: string }>;
  url: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await octokit.rest.issues.listForRepo({
      owner: process.env.GITHUB_REPO_OWNER || "kilianbalaguer",
      repo: process.env.GITHUB_REPO_NAME || "blog",
      state: "open",
      labels: "blog",
      sort: "created",
      direction: "desc",
    });

    return response.data as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(number: number): Promise<BlogPost | null> {
  try {
    const response = await octokit.rest.issues.get({
      owner: process.env.GITHUB_REPO_OWNER || "kilianbalaguer",
      repo: process.env.GITHUB_REPO_NAME || "blog",
      issue_number: number,
    });

    return response.data as BlogPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
