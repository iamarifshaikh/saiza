import { useState } from "react";
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
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import ProfileCompletionHandler from "@/components/auth/ProfileCompletionHandler";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            {/* Preloader overlay */}
            <Preloader onComplete={() => setIsLoading(false)} />

            {/* Custom Cursor needs to be inside AuthProvider */}
            <CustomCursor />

            {!isLoading && (
              <>
                <ProfileCompletionHandler />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/study" element={<Study />} />
                  <Route path="/study/:courseType" element={<Domains />} />
                  <Route path="/study/:courseType/:domain" element={<Subjects />} />
                  <Route path="/study/:courseType/:domain/:subject" element={<NotesList />} />
                  <Route path="/study/:courseType/:domain/:subject/:noteId" element={<NotesViewer />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </>
            )}
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
