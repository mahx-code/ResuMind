import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMind" },
    {
      name: "description",
      content:
        "An AI-powered analyzer that instantly decodes resumes to provide actionable insights and optimization scores for job seekers and recruiters.",
    },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Upload your resume and get instant feedback on your application status and resume ratings.</h2>
        </div>
      </section>
    </main>
  );
}
