
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  ExperienceItem, 
  fetchExperience, 
  updateExperience, 
  createExperience, 
  deleteExperience 
} from "@/services/contentService";
import { Pencil, Trash, Plus } from "lucide-react";

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState<ExperienceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newExperience, setNewExperience] = useState<Omit<ExperienceItem, "id">>({
    title: "",
    company: "",
    period: "",
    description: "",
    technologies: [],
    order_index: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await fetchExperience();
      setExperiences(data);
    } catch (error) {
      console.error("Error loading experiences:", error);
      toast({
        title: "Error",
        description: "Failed to load experience data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditExperience = (experience: ExperienceItem) => {
    setEditingExperience(experience);
    setIsCreating(false);
  };

  const handleUpdateExperience = async (id: string, updates: Partial<ExperienceItem>) => {
    try {
      const updated = await updateExperience(id, updates);
      setExperiences(experiences.map(exp => exp.id === id ? updated : exp));
      setEditingExperience(null);
      toast({
        title: "Experience updated",
        description: "Experience has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating experience:", error);
      toast({
        title: "Error",
        description: "Failed to update experience.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }
    
    try {
      await deleteExperience(id);
      setExperiences(experiences.filter(exp => exp.id !== id));
      toast({
        title: "Experience deleted",
        description: "Experience has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast({
        title: "Error",
        description: "Failed to delete experience.",
        variant: "destructive",
      });
    }
  };

  const handleCreateExperience = async () => {
    try {
      if (!newExperience.title || !newExperience.company || !newExperience.period) {
        toast({
          title: "Validation error",
          description: "Title, company, and period are required.",
          variant: "destructive",
        });
        return;
      }
      
      // Process technologies from comma-separated string to array if needed
      let technologies = newExperience.technologies;
      if (typeof technologies === 'string') {
        technologies = (technologies as string).split(',').map(t => t.trim());
      }
      
      const created = await createExperience({
        ...newExperience,
        technologies,
        order_index: experiences.length + 1
      });
      
      setExperiences([...experiences, created]);
      setIsCreating(false);
      setNewExperience({
        title: "",
        company: "",
        period: "",
        description: "",
        technologies: [],
        order_index: 0
      });
      
      toast({
        title: "Experience created",
        description: "New experience has been added successfully.",
      });
    } catch (error) {
      console.error("Error creating experience:", error);
      toast({
        title: "Error",
        description: "Failed to create experience.",
        variant: "destructive",
      });
    }
  };

  // Helper to handle technologies input
  const handleTechnologiesChange = (value: string, isEditing = false) => {
    const techArray = value.split(',').map(t => t.trim());
    
    if (isEditing && editingExperience) {
      setEditingExperience({...editingExperience, technologies: techArray});
    } else {
      setNewExperience({...newExperience, technologies: techArray});
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading experience data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Experience Management</h2>
        <Button 
          onClick={() => {
            setIsCreating(true);
            setEditingExperience(null);
          }}
          disabled={isCreating}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Experience
        </Button>
      </div>
      
      {isCreating && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Add New Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title*</label>
                <Input
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Company*</label>
                <Input
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Period*</label>
                <Input
                  value={newExperience.period}
                  onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                  placeholder="E.g., 2019 - Present"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newExperience.description || ""}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies</label>
                <Input
                  value={newExperience.technologies ? newExperience.technologies.join(', ') : ""}
                  onChange={(e) => handleTechnologiesChange(e.target.value)}
                  placeholder="React, Node.js, AWS (comma separated)"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleCreateExperience}>
                  Create Experience
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {editingExperience && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Edit Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title*</label>
                <Input
                  value={editingExperience.title}
                  onChange={(e) => setEditingExperience({...editingExperience, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Company*</label>
                <Input
                  value={editingExperience.company}
                  onChange={(e) => setEditingExperience({...editingExperience, company: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Period*</label>
                <Input
                  value={editingExperience.period}
                  onChange={(e) => setEditingExperience({...editingExperience, period: e.target.value})}
                  placeholder="E.g., 2019 - Present"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingExperience.description || ""}
                  onChange={(e) => setEditingExperience({...editingExperience, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies</label>
                <Input
                  value={editingExperience.technologies ? editingExperience.technologies.join(', ') : ""}
                  onChange={(e) => handleTechnologiesChange(e.target.value, true)}
                  placeholder="React, Node.js, AWS (comma separated)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <Input
                  type="number"
                  value={editingExperience.order_index}
                  onChange={(e) => setEditingExperience({
                    ...editingExperience, 
                    order_index: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleUpdateExperience(editingExperience.id, editingExperience)}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingExperience(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4">
        {experiences.map((experience) => (
          <div 
            key={experience.id} 
            className="p-4 border border-border rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{experience.title}</h3>
              <p className="text-sm text-muted-foreground">{experience.company} | {experience.period}</p>
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="text-xs text-muted-foreground mt-1">
                  Technologies: {experience.technologies.join(', ')}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleEditExperience(experience)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleDeleteExperience(experience.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;
