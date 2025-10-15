import { notFound } from "next/navigation";
import { projects } from "@/app/Lib/projectData";
import Back_Code_Buttons from "@/app/Components/ui/Buttons";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import Head from "next/head";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

 export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Not Found | RenderLab" };

  const siteUrl = `https://labrender.vercel.app/projects/${project.slug}`;
  const siteImage = project.preview;

  return {
    title: `${project.title} | RenderLab`,
    description: project.description,
    metadataBase: new URL("https://labrender.vercel.app"),
    openGraph: {
      title: `${project.title} | RenderLab`,
      description: project.description,
      url: siteUrl,
      siteName: "RenderLab",
      type: "article",
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - RenderLab Shader`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | RenderLab`,
      description: project.description,
      images: [siteImage],
    },
   };
}

// 2️⃣ Shader page component
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const Component = project.component as ComponentType;
  const fbAppId = "YOUR_FACEBOOK_APP_ID"; // Optional, manually insert in <Head>

  return (
    <>
      <Head>
        <meta property="fb:app_id" content={fbAppId} />
      </Head>

      <main className="relative w-full h-screen flex items-center justify-center bg-black">
        {Component ? (
          <Component />
        ) : (
          <div className="text-gray-400">🚫 Shader not available</div>
        )}
        <Back_Code_Buttons project={project} />
      </main>
    </>
  );
}
