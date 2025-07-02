import { deleteFromHistory, getHistory } from "@/logic/history";
import { useAppContext } from "@/context/history-context";
import Link from "next/link";

import { Ellipsis, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HistoryItem(
  { index, title }: { index: number; title: string }
) {
  const { setItems } = useAppContext();
  return (
    <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-accent/20 rounded-md transition-colors duration-300">
      <Link
        href={`/?index=${index}`}
        className="text-sm text-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]"
        title={title}
      >
        {title}
      </Link>
      <AlertDialog>
        <AlertDialogTrigger><Ellipsis /></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Quieres eliminar esta respuesta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la respuesta de tu historial y no podrás recuperarla.
              ¿Estás seguro de que quieres continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteFromHistory(index)
                setItems(getHistory());
                if (index === Number(window.location.search.split('index=')[1])) {
                  window.location.href = '/';
                }
              }}
              className="text-red-500 font-bold hover:text-red-600 transition-colors duration-300"
            ><Trash2 /> Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );  
}


