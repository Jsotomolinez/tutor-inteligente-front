'use client'; 
import { useEffect, useState, Suspense } from "react";
import Chat from "../components/chat";
import { useSearchParams } from "next/navigation";


export default function HomePage() {

  const searchParams = useSearchParams();
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const indexParam = searchParams.get("index");
    if (indexParam !== null) {
      setIndex(parseInt(indexParam, 10))
    }}, [searchParams]);

    
  return (
    <Suspense>
      <section className="flex min-h-screen flex-col items-center justify-between p-10 bg-gradient-to-b from-background to-secondary w-full">
        <Chat index={index}/>
      </section>
    </Suspense>
  );
}