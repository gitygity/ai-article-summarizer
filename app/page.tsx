"use client";

import { useState, useEffect } from "react";
import { useSummarize } from "./lib/useSummarize";

interface HistoryItem {
  input: string;
  summary: string;
  timestamp: number;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const { mutate, data:summary, error, isPending } = useSummarize();

useEffect(() => {
  const loadHistory = async () => {
    try {
      const saved = localStorage.getItem("summaries");
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(prev => prev.length === 0 ? parsed : prev);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  }

  loadHistory();
}, []);



  useEffect(() => {
    try {
      localStorage.setItem("summaries", JSON.stringify(history));
    } catch (err) {
      console.error("Failed to save history:", err);
    }
  }, [history]);

  
  const handleSummarize = () => {
    if (!input.trim()) return;

    mutate(input, {
      onSuccess: (summary) => {
        const newItem: HistoryItem = {
          input,
          summary: summary ?? "No summary available",
          timestamp: Date.now(),
        };
        setHistory((prev) => [newItem, ...prev].slice(0, 10));
        setInput("");
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSummarize();
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("summaries");
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">🧠 Text Summarizer</h1>
        <p className="text-sm text-gray-500 mt-1">Ctrl + Enter to summarize</p>
      </div>

      <div className="space-y-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={8}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Paste your text here to get a concise summary..."
        />

        <div className="flex gap-3">
          <button
            onClick={handleSummarize}
            disabled={isPending || !input.trim()}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {isPending ? "Summarizing..." : "Summarize"}
          </button>

          <button
            onClick={() => setInput("")}
            disabled={!input}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Clear
          </button>
        </div>
      </div>
      {summary && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">✨ Summary:</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-1">❌ Error:</h3>
          <p className="text-red-600">{(error as Error).message}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              🕘 Recent Summaries
              <span className="text-sm font-normal text-gray-500">({history.length})</span>
            </h3>
            <button
              onClick={handleClearHistory}
              className="text-sm text-red-600 hover:text-red-700 font-medium">
              Clear All
            </button>
          </div>
          
          <ul className="space-y-3">
            {history.map((item) => (
              <li
                key={item.timestamp}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-colors"
                onClick={() => setInput(item.input)}>
                <p className="text-sm text-gray-800 mb-2">
                  <strong className="text-gray-600">Original:</strong>{" "}
                  {item.input.length > 100 
                    ? item.input.slice(0, 100) + "..." 
                    : item.input}
                </p>
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-500">Summary:</strong>{" "}
                  {item.summary.length > 120 
                    ? item.summary.slice(0, 120) + "..." 
                    : item.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}