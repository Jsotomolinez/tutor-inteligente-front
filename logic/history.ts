export interface HistoryItem_ {
  title: string;
  body: string;
}


export function addToHistory(response: string) {

  const item: HistoryItem_ = stringToHistoryItem(response);
  const historyStr = localStorage.getItem("history");
  let history: HistoryItem_[] = [];

  if (historyStr) {
    try {
      history = JSON.parse(historyStr);
      if (!Array.isArray(history)) {
        history = [];
      }
    } catch {
      history = [];
    }
  }

  history.push(item);
  localStorage.setItem("history", JSON.stringify(history));
}


export function getHistory(): HistoryItem_[] {
  const historyStr = localStorage.getItem("history");
  if (!historyStr) {
    return [];
  }

  try {
    const history = JSON.parse(historyStr);
    if (Array.isArray(history)) {
      return history;
    }
  } catch {
    // If parsing fails, return an empty array
  }

  return [];
}

export function getItemFromHistory(index: number): HistoryItem_ | null {
  const history = getHistory();
  if (index >= 0 && index < history.length) {
    return history[index];
  }
  return null;
}


export function deleteFromHistory(index: number) {
  const history = getHistory();

  if (index >= 0 && index < history.length) {
    history.splice(index, 1);
    localStorage.setItem("history", JSON.stringify(history));
  }
}

// Funcion que toma un string y lo convierte en un objeto HistoryItem donde tittle es la primera linea y body es el texto completo, incluyendo la primera linea
export function stringToHistoryItem(text: string): HistoryItem_ {
  const body = text
  const lines = text.split("<br /><br /><br />");
  const title = lines[0] || "Sin título";
  

  return {
    title,
    body,
  };
}