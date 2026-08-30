import { defineField, defineType } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Esemény',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Esemény neve',
      type: 'string',
      initialValue: 'Miskolci Csendháborítás',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'day1',
      title: '1. nap dátuma',
      type: 'date',
      description: 'Október 9.',
    }),
    defineField({
      name: 'day2',
      title: '2. nap dátuma',
      type: 'date',
      description: 'Október 10.',
    }),
    defineField({
      name: 'venue',
      title: 'Helyszín neve',
      type: 'string',
      initialValue: 'Grizzly Music Pub',
    }),
    defineField({
      name: 'address',
      title: 'Cím',
      type: 'string',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps embed URL',
      type: 'url',
    }),
    defineField({
      name: 'venueDescription',
      title: 'Helyszín leírása',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'venuePhotos',
      title: 'Helyszín fotók',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'transportInfo',
      title: 'Megközelítés / parkolás',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social linkek',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
      ],
    }),
    defineField({
      name: 'sponsors',
      title: 'Szponzorok / partnerek',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Név', type: 'string' }),
            defineField({
              name: 'logo',
              title: 'Logó',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'url', title: 'Weboldal', type: 'url' }),
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'venue' },
  },
})
