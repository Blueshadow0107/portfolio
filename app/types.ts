export type JsonProject = {
  id: number;
  title: string;
  description: string;
  status: string;
  parent_id: number | null;
  show_on_website: boolean | number;
  icon: string | null;
  tags: string[];
  content: string;
  children?: JsonProject[];
};

export type AcademicProject = {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  icon: string;
};

export type UnifiedProject = {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  gradient: string;
  icon: string;
  content?: string;
  children?: JsonProject[];
};
