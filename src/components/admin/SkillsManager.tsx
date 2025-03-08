
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  SkillItem, 
  fetchSkills, 
  updateSkill, 
  createSkill, 
  deleteSkill 
} from "@/services/contentService";
import { Pencil, Trash, Plus } from "lucide-react";

const SkillsManager = () => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newSkill, setNewSkill] = useState<Omit<SkillItem, "id">>({
    name: "",
    description: "",
    icon: "",
    category: "",
    order_index: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await fetchSkills();
      setSkills(data);
    } catch (error) {
      console.error("Error loading skills:", error);
      toast({
        title: "Error",
        description: "Failed to load skills data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSkill = (skill: SkillItem) => {
    setEditingSkill(skill);
    setIsCreating(false);
  };

  const handleUpdateSkill = async (id: string, updates: Partial<SkillItem>) => {
    try {
      const updated = await updateSkill(id, updates);
      setSkills(skills.map(skill => skill.id === id ? updated : skill));
      setEditingSkill(null);
      toast({
        title: "Skill updated",
        description: "Skill has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating skill:", error);
      toast({
        title: "Error",
        description: "Failed to update skill.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }
    
    try {
      await deleteSkill(id);
      setSkills(skills.filter(skill => skill.id !== id));
      toast({
        title: "Skill deleted",
        description: "Skill has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast({
        title: "Error",
        description: "Failed to delete skill.",
        variant: "destructive",
      });
    }
  };

  const handleCreateSkill = async () => {
    try {
      if (!newSkill.name) {
        toast({
          title: "Validation error",
          description: "Skill name is required.",
          variant: "destructive",
        });
        return;
      }
      
      const created = await createSkill({
        ...newSkill,
        order_index: skills.length + 1
      });
      
      setSkills([...skills, created]);
      setIsCreating(false);
      setNewSkill({
        name: "",
        description: "",
        icon: "",
        category: "",
        order_index: 0
      });
      
      toast({
        title: "Skill created",
        description: "New skill has been added successfully.",
      });
    } catch (error) {
      console.error("Error creating skill:", error);
      toast({
        title: "Error",
        description: "Failed to create skill.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading skills...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skills Management</h2>
        <Button 
          onClick={() => {
            setIsCreating(true);
            setEditingSkill(null);
          }}
          disabled={isCreating}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Skill
        </Button>
      </div>
      
      {isCreating && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Add New Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name*</label>
                <Input
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newSkill.description || ""}
                  onChange={(e) => setNewSkill({...newSkill, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <Input
                  value={newSkill.icon || ""}
                  onChange={(e) => setNewSkill({...newSkill, icon: e.target.value})}
                  placeholder="Icon name (e.g., Code, Server, etc.)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={newSkill.category || ""}
                  onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                  placeholder="E.g., development, technology, infrastructure"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleCreateSkill}>
                  Create Skill
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
      
      {editingSkill && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Edit Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name*</label>
                <Input
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingSkill.description || ""}
                  onChange={(e) => setEditingSkill({...editingSkill, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <Input
                  value={editingSkill.icon || ""}
                  onChange={(e) => setEditingSkill({...editingSkill, icon: e.target.value})}
                  placeholder="Icon name (e.g., Code, Server, etc.)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={editingSkill.category || ""}
                  onChange={(e) => setEditingSkill({...editingSkill, category: e.target.value})}
                  placeholder="E.g., development, technology, infrastructure"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <Input
                  type="number"
                  value={editingSkill.order_index}
                  onChange={(e) => setEditingSkill({
                    ...editingSkill, 
                    order_index: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleUpdateSkill(editingSkill.id, editingSkill)}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingSkill(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="p-4 border border-border rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
              <div className="text-xs text-muted-foreground mt-1">
                {skill.category && <span className="mr-2">Category: {skill.category}</span>}
                {skill.icon && <span>Icon: {skill.icon}</span>}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleEditSkill(skill)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleDeleteSkill(skill.id)}
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

export default SkillsManager;
