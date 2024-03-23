"use client";

export default function NotFoundPage({ params }: { params: { lang: string } }) {
  return <h1>404 with lang: {params?.lang}</h1>;
}
