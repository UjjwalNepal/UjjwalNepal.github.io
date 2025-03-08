
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  ProjectItem, 
  fetchProjects, 
  updateProject, 
  createProject, 
  deleteProject 
} from "@/services/contentService";
import { Pencil, Trash, Plus } from "lucide-react";

const ProjectsManager = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState<Omit<ProjectItem, "id">>({
    title: "",
    description: "",
    image_url: "",
    technologies: [],
    project_url: "",
    github_url: "",
    order_index: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project: ProjectItem) => {
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleUpdateProject = async (id: string, updates: Partial<ProjectItem>) => {
    try {
      const updated = await updateProject(id, updates);
      setProjects(projects.map(project => project.id === id ? updated : project));
      setEditingProject(null);
      toast({
        title: "Project updated",
        description: "Project has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
      toast({
        title: "Project deleted",
        description: "Project has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      });
    }
  };

  const handleCreateProject = async () => {
    try {
      if (!newProject.title) {
        toast({
          title: "Validation error",
          description: "Project title is required.",
          variant: "destructive",
        });
        return;
      }
      
      // Process technologies from comma-separated string to array if needed
      let technologies = newProject.technologies;
      if (typeof technologies === 'string') {
        technologies = (technologies as string).split(',').map(t => t.trim());
      }
      
      const created = await createProject({
        ...newProject,
        technologies,
        order_index: projects.length + 1
      });
      
      setProjects([...projects, created]);
      setIsCreating(false);
      setNewProject({
        title: "",
        description: "",
        image_url: "",
        technologies: [],
        project_url: "",
        github_url: "",
        order_index: 0
      });
      
      toast({
        title: "Project created",
        description: "New project has been added successfully.",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project.",
        variant: "destructive",
      });
    }
  };

  // Helper to handle technologies input
  const handleTechnologiesChange = (value: string, isEditing = false) => {
    const techArray = value.split(',').map(t => t.trim());
    
    if (isEditing && editingProject) {
      setEditingProject({...editingProject, technologies: techArray});
    } else {
      setNewProject({...newProject, technologies: techArray});
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Button 
          onClick={() => {
            setIsCreating(true);
            setEditingProject(null);
          }}
          disabled={isCreating}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>
      
      {isCreating && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title*</label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newProject.description || ""}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={newProject.image_url || ""}
                  onChange={(e) => setNewProject({...newProject, image_url: e.target.value})}
                  placeholder="URL to project image"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies</label>
                <Input
                  value={newProject.technologies ? newProject.technologies.join(', ') : ""}
                  onChange={(e) => handleTechnologiesChange(e.target.value)}
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Project URL</label>
                <Input
                  value={newProject.project_url || ""}
                  onChange={(e) => setNewProject({...newProject, project_url: e.target.value})}
                  placeholder="Live project URL"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={newProject.github_url || ""}
                  onChange={(e) => setNewProject({...newProject, github_url: e.target.value})}
                  placeholder="GitHub repository URL"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleCreateProject}>
                  Create Project
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
      
      {editingProject && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title*</label>
                <Input
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={editingProject.image_url || ""}
                  onChange={(e) => setEditingProject({...editingProject, image_url: e.target.value})}
                  placeholder="URL to project image"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies</label>
                <Input
                  value={editingProject.technologies ? editingProject.technologies.join(', ') : ""}
                  onChange={(e) => handleTechnologiesChange(e.target.value, true)}
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Project URL</label>
                <Input
                  value={editingProject.project_url || ""}
                  onChange={(e) => setEditingProject({...editingProject, project_url: e.target.value})}
                  placeholder="Live project URL"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={editingProject.github_url || ""}
                  onChange={(e) => setEditingProject({...editingProject, github_url: e.target.value})}
                  placeholder="GitHub repository URL"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <Input
                  type="number"
                  value={editingProject.order_index}
                  onChange={(e) => setEditingProject({
                    ...editingProject, 
                    order_index: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => handleUpdateProject(editingProject.id, editingProject)}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingProject(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="p-4 border border-border rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-xs text-muted-foreground mt-1">
                  Technologies: {project.technologies.join(', ')}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleEditProject(project)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleDeleteProject(project.id)}
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

export default ProjectsManager;
