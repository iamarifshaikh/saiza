import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { FolderHeart, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddToPlaylistPopupProps {
  isOpen: boolean;
  onClose: () => void;
  note: {
    noteId: string;
    subject: string;
    domain: string;
    courseType: string;
    title: string;
  };
}

const AddToPlaylistPopup = ({ isOpen, onClose, note }: AddToPlaylistPopupProps) => {
  const auth = useAuth();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreateNew, setShowCreateNew] = useState(false);
  
  const playlists = auth.myWordsPlaylists || [];

  const handleAddToPlaylist = (playlistId: string, playlistName: string) => {
    auth.addNoteToPlaylist(playlistId, note);
    toast.success(`Added to "${playlistName}"`);
    onClose();
  };

  const handleCreateAndAdd = () => {
    if (newPlaylistName.trim()) {
      const playlistId = auth.createPlaylist(newPlaylistName.trim());
      auth.addNoteToPlaylist(playlistId, note);
      toast.success(`Created "${newPlaylistName.trim()}" and added note`);
      setNewPlaylistName('');
      setShowCreateNew(false);
      onClose();
    }
  };

  const isNoteInPlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    return playlist?.notes.some(n => n.noteId === note.noteId) || false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderHeart size={20} className="text-primary" />
            Add to My Words
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Note Info */}
          <div className="p-3 bg-muted/30 rounded-xl">
            <p className="text-sm font-medium truncate">{note.title}</p>
          </div>

          {/* Existing Playlists */}
          {playlists.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Select a collection</p>
              {playlists.map((playlist) => {
                const isAdded = isNoteInPlaylist(playlist.id);
                return (
                  <button
                    key={playlist.id}
                    onClick={() => !isAdded && handleAddToPlaylist(playlist.id, playlist.name)}
                    disabled={isAdded}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                      isAdded 
                        ? 'bg-primary/10 cursor-default' 
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <FolderHeart size={18} className={isAdded ? 'text-primary' : 'text-muted-foreground'} />
                    <span className="flex-1 font-medium">{playlist.name}</span>
                    {isAdded && <Check size={16} className="text-primary" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Create New */}
          {showCreateNew ? (
            <div className="space-y-3">
              <Input
                placeholder="Collection name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="h-12 rounded-xl"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowCreateNew(false);
                    setNewPlaylistName('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="lime"
                  className="flex-1"
                  onClick={handleCreateAndAdd}
                  disabled={!newPlaylistName.trim()}
                >
                  Create & Add
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => setShowCreateNew(true)}
            >
              <Plus size={16} />
              Create New Collection
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlaylistPopup;
