
import { supabase } from "@/integrations/supabase/client";

export interface ContentItem {
  id: string;
  section: string;
  title: string;
  description: string | null;
  content: string | null;
  updated_at: string;
}

export interface SkillItem {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  order_index: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  technologies: string[] | null;
  project_url: string | null;
  github_url: string | null;
  order_index: number;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string | null;
  technologies: string[] | null;
  order_index: number;
}

// Content operations
export const fetchContent = async (section?: string) => {
  let query = supabase.from("content").select("*");
  
  if (section) {
    query = query.eq("section", section);
  }
  
  const { data, error } = await query.order("section");
  
  if (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
  
  return data as ContentItem[];
};

export const updateContent = async (id: string, updates: Partial<ContentItem>) => {
  const { data, error } = await supabase
    .from("content")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating content:", error);
    throw error;
  }
  
  return data as ContentItem;
};

// Skills operations
export const fetchSkills = async (category?: string) => {
  let query = supabase.from("skills").select("*");
  
  if (category) {
    query = query.eq("category", category);
  }
  
  const { data, error } = await query.order("order_index");
  
  if (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
  
  return data as SkillItem[];
};

export const updateSkill = async (id: string, updates: Partial<SkillItem>) => {
  const { data, error } = await supabase
    .from("skills")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
  
  return data as SkillItem;
};

export const createSkill = async (skill: Omit<SkillItem, "id">) => {
  const { data, error } = await supabase
    .from("skills")
    .insert(skill)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
  
  return data as SkillItem;
};

export const deleteSkill = async (id: string) => {
  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
  
  return true;
};

// Projects operations
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index");
  
  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
  
  return data as ProjectItem[];
};

export const updateProject = async (id: string, updates: Partial<ProjectItem>) => {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }
  
  return data as ProjectItem;
};

export const createProject = async (project: Omit<ProjectItem, "id">) => {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }
  
  return data as ProjectItem;
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
  
  return true;
};

// Experience operations
export const fetchExperience = async () => {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("order_index");
  
  if (error) {
    console.error("Error fetching experience:", error);
    throw error;
  }
  
  return data as ExperienceItem[];
};

export const updateExperience = async (id: string, updates: Partial<ExperienceItem>) => {
  const { data, error } = await supabase
    .from("experience")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating experience:", error);
    throw error;
  }
  
  return data as ExperienceItem;
};

export const createExperience = async (experience: Omit<ExperienceItem, "id">) => {
  const { data, error } = await supabase
    .from("experience")
    .insert(experience)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating experience:", error);
    throw error;
  }
  
  return data as ExperienceItem;
};

export const deleteExperience = async (id: string) => {
  const { error } = await supabase
    .from("experience")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error("Error deleting experience:", error);
    throw error;
  }
  
  return true;
};
