// import {promises as fs} from 'fs';
// import path from 'path';
// import {cache} from 'react';
// import {prisma} from './prisma';

// export type Post = {
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   coverImage?: string | null;
// };

// const filePath = path.join(process.cwd(), 'data', 'posts.json');

// export async function getPosts(): Promise<Post[]> {
//   const file = await fs.readFile(filePath, 'utf-8');
//   return JSON.parse(file);
// }

// // export const getPostBySlug = cache(async (slug: string) => {
// //   return prisma.post.findUnique({where: {slug}});
// // });
// export const getPostBySlug = cache(async (slug: string) => {
//   const post = await prisma.post.findUnique({where: {slug}});
//   const all = await prisma.post.findMany({select: {slug: true}});
//   console.log('looking for:', slug);
//   console.log(
//     'in database:',
//     all.map((p) => p.slug),
//   );
//   return post;
// });

// export async function addPost(data: Omit<Post, 'slug'> & {slug: string}) {
//   const posts = await getPosts();
//   const exists = posts.some((p) => p.slug === data.slug);
//   const post = exists ? {...data, slug: `${data.slug}-${Date.now()}`} : data;
//   posts.unshift(post);
//   await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
//   return post;
// }

import {cache} from 'react';
import {prisma} from '@/lib/prisma';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
};

export async function getPosts() {
  return prisma.post.findMany({orderBy: {createdAt: 'desc'}});
}

export const getPostBySlug = cache(async (slug: string) => {
  return prisma.post.findUnique({where: {slug}});
});

export async function addPost(data: Post) {
  const exists = await prisma.post.findUnique({where: {slug: data.slug}});
  const slug = exists ? `${data.slug}-${Date.now()}` : data.slug;
  return prisma.post.create({data: {...data, slug}});
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function updatePost(
  slug: string,
  data: { title: string; excerpt: string; content: string; coverImage: string | null }
) {
  return prisma.post.update({ where: { slug }, data });
}

export async function deletePost(slug: string) {
  return prisma.post.deleteMany({ where: { slug } });
}
