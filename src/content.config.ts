import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string().optional(),
    technologies: z.array(z.string()),
    demoUrl: z.string().url().optional().or(z.literal('')),
    githubUrl: z.string().url().optional().or(z.literal('')),
    featured: z.boolean().default(false),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    avatar: z.string().optional(),
    bio: z.string(),
    skills: z.array(z.string()),
  }),
});

const homeCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/home' }),
  schema: z.object({
    greeting: z.string(),
    name: z.string(),
    tagline: z.string(),
    cta: z.string(),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'about': aboutCollection,
  'home': homeCollection,
};
