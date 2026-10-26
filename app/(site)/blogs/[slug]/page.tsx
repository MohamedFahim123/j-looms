import { JournalArticle } from "@/app/components/site/JournalArticle";
import { postBySlug, posts } from "@/lib/site/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  return { title: post?.title ?? "Note" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  return <JournalArticle post={post} />;
}
