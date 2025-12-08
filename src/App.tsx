import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Study from "./pages/Study";
import Domains from "./pages/Domains";
import Subjects from "./pages/Subjects";
import Premium from "./pages/Premium";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotesList from "./pages/NotesList";
import NotesViewer from "./pages/NotesViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/study" element={<Study />} />
          <Route path="/study/:courseType" element={<Domains />} />
          <Route path="/study/:courseType/:domain" element={<Subjects />} />
          <Route path="/study/:courseType/:domain/:subject" element={<NotesList />} />
          <Route path="/study/:courseType/:domain/:subject/:noteId" element={<NotesViewer />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
