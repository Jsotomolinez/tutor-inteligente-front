'use client';

import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { SendHorizontal, Upload, File } from "lucide-react";
import axios from 'axios';
import { addToHistory, getHistory } from '@/logic/history';
import { useAppContext } from '@/context/history-context';


export default function Prompt(
  { onResponse }: { onResponse: (response: string) => void } = { onResponse: () => { } }
) {

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not defined in the environment variables');
  }

  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setItems } = useAppContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // setSelectedFile(event.target.files[0]);
      setFileSize(event.target.files[0].size);
    } else {
      // setSelectedFile(null);
      setFileSize(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    const textCheckbox = form.querySelector('#archivos_de_texto') as HTMLInputElement;
    const functionCheckbox = form.querySelector('#funciones') as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) return;

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('isTextFile', textCheckbox.checked ? 'true' : 'false');
    formData.append('isFunction', functionCheckbox.checked ? 'true' : 'false');

    try {
      const response = await axios.post(`${BACKEND_URL}/gemini/chat/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Suponiendo que el backend retorna { error: "mensaje" } en caso de error
      if (response.data && response.data.error) {
        onResponse('Error al obtener la respuesta del backend. Por favor, inténtalo de nuevo más tarde.');
        throw new Error(response.data.error);
      } else {
        onResponse(response.data);
        addToHistory(response.data);
        setItems(getHistory());
      }
    } catch (error) {
      console.error('Error fetching from backend:', error);
    }
  }



  return (
    <div className="flex flex-col items-center text-center justify-center gap-5">
      <h2 className="font-bold">Ingresa un enunciado como imagen o pdf para ayudarte a resolverlo</h2>

      <form className="flex flex-col items-center justify-center gap-4 w-11/12 md:w-3/4" onSubmit={handleSubmit}>
        <Label
          className={`mt-4 flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-6 cursor-pointer hover:border-accent transition-colors py-10 ${fileSize ? "border-accent bg-background/10" : "border-muted"
          }`}
        >
          {
            fileSize ? (
              <div className="flex items-center justify-center gap-2">
                <File className="text-2xl text-foreground" />
                <span className="text-sm text-foreground">Tamaño del archivo: {(fileSize / 1024).toFixed(2)} KB</span>
              </div>
            ) : (
              <>
                <span className="mb-2 text-muted pb-3">Arrastra un archivo aquí o haz clic para seleccionar</span>
                <Upload className="text-muted" />
              </>
            )
          }
          <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} onChange={(e) => handleFileChange(e)} />
                </div>
              </section>
            )}
          </Dropzone>
        </Label>

        <div className="flex items-center justify-between md:px-3 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2 gap-2">
              <Checkbox id="archivos_de_texto" className="data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
              <Label htmlFor="archivos_de_texto">Trabaja con archivos de texto</Label>
            </div>
            <div className="flex items-center space-x-2 gap-2">
              <Checkbox id="funciones" className="data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
              <Label htmlFor="funciones">Definir funciones (parcial 3)</Label>
            </div>

          </div>
          {
            fileSize ? (
              <button
                type="submit"
                className="flex items-center justify-center rounded-full text-white text-2xl px-3 w-12 h-12 cursor-pointer bg-accent hover:bg-accent/80 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                <SendHorizontal className="text-2xl" />
              </button>
            ) : (
              <div className="flex items-center justify-center text-muted px-3 w-12 h-12">
                <SendHorizontal />
              </div>
            )
          }

        </div>

      </form>
    </div>
  );
}