import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const pagesCollection = defineCollection({
  /* Retrieve all entries from a JSON file. */
  loader: glob({ pattern: '**/*.yml*', base: 'src/content/pages' }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    hero_image: z.string().optional(),
  }),
});

const siteSettings = defineCollection({
  /* Retrieve all entries from a JSON file. */
  loader: file('src/content/settings.yml'),
  schema: z.object({
    //   title: z.string(),
    //   intro: z.string(),
    //   hero_image: z.string().optional(),
    site_name: z.string(),
    site_logo: z.string(),
    default_seo_description: z.string(),
    default_share_image: z.string(),
  }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

export const collections = {
  post: postCollection,
  pages: pagesCollection,
  siteSettings,
};
