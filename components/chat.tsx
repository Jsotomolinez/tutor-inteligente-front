'use client';

import { useState, useEffect } from "react";
import Prompt from "./prompt";
import { Button } from "./ui/button";
import { CirclePlus, Copy } from "lucide-react";
import { toast } from "sonner";
import { getItemFromHistory } from "@/logic/history";

interface ChatProps {
  index?: number | null;
}


export default function Chat({ index = null }: ChatProps) {
  const [response, setResponse] = useState<string | null>(null);

  // Este efecto actualiza response cuando cambia el index
  useEffect(() => {
    if (index !== null) {
      const item = getItemFromHistory(index);
      setResponse(item?.body ?? null);
    } else {
      setResponse(null);
    }
  }, [index]);

  const handleCopy = () => {
    navigator.clipboard.writeText(response?.replace(/<br\s*\/?>/gi, "\n") || "")
    toast.success("Respuesta copiada al portapapeles")
  }

  return (
    <section className="flex flex-col items-center justify-center bg-primary p-4 w-10/12 rounded-xl border-4 border-foreground">
      {!response ? (
        <Prompt onResponse={setResponse}/>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-end items-center gap-2">
            <Button
              className="ml-auto text-white rounded bg-foreground/10 hover:bg-foreground/20 transition-colors"
              onClick={() => setResponse(null)}
              type="button"
            >
              <CirclePlus size={32} />
            </Button>
            <Button
              className="ml-auto text-white px-4 py-2 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors"
              onClick={handleCopy}
              type="button"
            >
              <Copy />
            </Button>
          </div>
          <code>
            <div dangerouslySetInnerHTML={{ __html: response }} />
          </code>
        </div>
      )}
    </section>
  )
}