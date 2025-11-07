# 🧠 Text Summarizer

A **Next.js 13+ project** that summarizes long texts into concise summaries using a modern React + React Query setup. 

---

## 🚀 Features

- **Next.js 13** with App Router (`app/`) and Client Components  
- **React Query (TanStack Query)** for async data fetching and caching  
- **LocalStorage-based History** to track previous inputs and summaries  
- **Hydration-safe and SSR-friendly**  
- **Error handling & loading states**  
- **Responsive UI** built with Tailwind CSS  

---

## 🛠 Tech Stack

- **Frontend:** React 18, Next.js 13+, Tailwind CSS  
- **Data Fetching:** React Query (`@tanstack/react-query`)  
- **API:** Hugging Face Inference API (BART model)  
- **State Management:** Local component state + React Query cache  

---

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/gitygity/ai-article-summarizer.git
cd ai-article-summarizer
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Create `.env.local` file and add your Hugging Face API key:

```env
HUGGINGFACE_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage

1. Paste a long text into the textarea.  
2. Click **Summarize**.  
3. View the summary below and your input history stored locally.  
4. Click any previous input from history to refill the textarea.  

---

## 💡 Implementation Details

- **React Query `useMutation`** handles async summarization requests.  
- **Hydration-safe history**: localStorage is only accessed on the client to prevent SSR mismatch.  
- **Safe rendering**: All potentially undefined data is validated before rendering to avoid runtime errors.  
- **UI/UX**: Loading state and error messages provide smooth user experience.  

---

## 📂 Project Structure

```
/app
  /page.tsx # Main page and UI
/lib
  /useSummarize.ts # React Query mutation hook
/api
  /summarize
    /route.ts # API route for summarization
/providers
  /ReactQueryProvider.tsx # QueryClientProvider setup  

```

---

## 🔗 Live Demo

>  

---

## 🏆 Learning Goals

This project demonstrates:

- Full Next.js 13 client/server component understanding  
- Integrating React Query with async APIs  
- Safe localStorage usage with SSR + hydration  
- Building reusable hooks and clean state management  
- Error handling and user-friendly UI  

---

## 📜 License

MIT © Gity ghasemi