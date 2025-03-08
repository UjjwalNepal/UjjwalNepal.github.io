
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BarChart, PieChart, Users, FileText, Image, Server, Settings, Layout, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchContent, ContentItem } from "@/services/contentService";
import ContentEditForm from "./ContentEditForm";
import SkillsManager from "./SkillsManager";
import ProjectsManager from "./ProjectsManager";
import ExperienceManager from "./ExperienceManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await fetchContent();
      setContentItems(data);
    } catch (error) {
      console.error("Error loading content:", error);
      toast({
        title: "Error",
        description: "Failed to load content data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContentUpdate = (updatedContent: ContentItem) => {
    setContentItems(contentItems.map(item => 
      item.id === updatedContent.id ? updatedContent : item
    ));
  };

  return (
    <div className="space-y-8">
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 h-auto mb-8">
          <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
          <TabsTrigger value="content" className="py-2">Content</TabsTrigger>
          <TabsTrigger value="media" className="py-2">Media</TabsTrigger>
          <TabsTrigger value="settings" className="py-2">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard 
              title="Total Visitors" 
              value="5,271" 
              description="+12% from last month" 
              icon={<Users />} 
            />
            <StatsCard 
              title="Projects" 
              value="24" 
              description="3 added this month" 
              icon={<FileText />} 
            />
            <StatsCard 
              title="Media Files" 
              value="128" 
              description="Images, videos, documents" 
              icon={<Image />} 
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>Traffic Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground">Traffic chart will appear here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  <span>Audience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md">
                  <p className="text-muted-foreground">Audience chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>General Content</span>
                  </CardTitle>
                  <CardDescription>
                    Update the main content sections of your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">Loading content...</div>
                  ) : (
                    <div className="space-y-8">
                      {contentItems.map((content) => (
                        <ContentEditForm 
                          key={content.id} 
                          content={content}
                          onUpdate={handleContentUpdate}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills">
              <SkillsManager />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectsManager />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceManager />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                <span>Media Library</span>
              </CardTitle>
              <CardDescription>Manage your images, videos, and other media files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="aspect-square rounded-md bg-muted flex items-center justify-center border border-dashed">
                    <Image className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button>Upload New Media</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Site Settings</span>
              </CardTitle>
              <CardDescription>Manage your website settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Site Title</label>
                  <Input placeholder="Portfolio of Ujjwal Raj Nepal" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Description</label>
                  <Textarea 
                    placeholder="Full-stack developer with expertise in web apps, 3D tech, AR, and cloud infrastructure."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input placeholder="contact@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Light</Button>
                    <Button size="sm">Dark</Button>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for stats cards
const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon 
}: { 
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <Card className="glass-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-md bg-secondary/50 p-1.5 text-foreground/80">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

export default AdminDashboard;
