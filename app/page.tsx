'use client'; 
import { Suspense } from "react";
import HomePageContent from "../components/home-page-content";


export default function HomePage() {
  return (
    <Suspense>
      <HomePageContent />
    </Suspense>
  );
}