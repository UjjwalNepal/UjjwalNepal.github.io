
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ContentItem, updateContent } from "@/services/contentService";

interface ContentEditFormProps {
  content: ContentItem;
  onUpdate: (updatedContent: ContentItem) => void;
}

const ContentEditForm = ({ content, onUpdate }: ContentEditFormProps) => {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [contentText, setContentText] = useState(content.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      const updates = {
        title,
        description,
        content: contentText,
      };
      
      const updatedContent = await updateContent(content.id, updates);
      
      toast({
        title: "Content updated",
        description: "Your changes have been saved successfully.",
      });
      
      onUpdate(updatedContent);
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Edit {content.section.charAt(0).toUpperCase() + content.section.slice(1)} Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={3}
            />
          </div>
          
          {content.content !== null && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea 
                value={contentText} 
                onChange={(e) => setContentText(e.target.value)} 
                rows={5}
              />
            </div>
          )}
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentEditForm;
