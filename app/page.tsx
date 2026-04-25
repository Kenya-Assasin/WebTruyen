"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getStories } from "@/app/lib/api";

export default function HomePage() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("https://your-api.mockapi.io/stories")
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  return <div>{/* render */}</div>;
}
