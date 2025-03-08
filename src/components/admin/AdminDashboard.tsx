
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BarChart, PieChart, Users, FileText, Image, Server, Settings, Layout, Database } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
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
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Content Management</span>
              </CardTitle>
              <CardDescription>Manage your website content from here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ContentSection title="About Me" description="Update your personal information" />
                <ContentSection title="Skills" description="Update your technical skills" />
                <ContentSection title="Experience" description="Update your work experience" />
                <ContentSection title="Projects" description="Update your portfolio projects" />
              </div>
            </CardContent>
          </Card>
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

// Helper component for content sections
const ContentSection = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-secondary/20 transition-colors">
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Button variant="outline" size="sm">Edit</Button>
  </div>
);

export default AdminDashboard;
