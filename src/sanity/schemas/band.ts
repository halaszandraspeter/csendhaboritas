import { defineField, defineType } from 'sanity'
import { aspectRatioValidator } from './validators/aspectRatio'

export const bandSchema = defineType({
  name: 'band',
  title: 'Zenekar',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Zenekar neve',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'day',
      title: 'Nap',
      type: 'number',
      description: '1 = Október 9., 2 = Október 10.',
      options: {
        list: [
          { title: 'Október 9.', value: 1 },
          { title: 'Október 10.', value: 2 },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().integer().min(1).max(2),
    }),
    defineField({
      name: 'setTime',
      title: 'Fellépési idő',
      type: 'string',
      description: 'pl. "22:30"',
    }),
    defineField({
      name: 'genre',
      title: 'Műfaj',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bemutatkozás',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'bandLogoImage',
      title: 'Zenekar logó (redesigned, event-color underlay)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bandPhotoImage',
      title: 'Zenekar fotó (pre-cut transparent PNG)',
      type: 'image',
      description: 'A zenekar oldalon függőlegesen jelenik meg. Ajánlott arány: 4:5 (pl. 960×1200px). Állítsd be a fotó pont a néző → “Edit crop and hotspot” → 4:5 előnézet szerint.',
      options: {
        hotspot: {
          previews: [{ title: '4:5 (zenekar oldal)', aspectRatio: 4 / 5 }],
        },
      },
      validation: (Rule) => Rule.custom(aspectRatioValidator(4 / 5, '4:5')),
    }),
    defineField({
      name: 'cardThumbnailImage',
      title: 'Kártya kép (négyszögletes crop, grid-hez)',
      type: 'image',
      description: 'A főoldali zenekar rácsban jelenik meg, vízszintes formátumban. Ajánlott arány: 3:2 (pl. 1200×800px).',
      options: {
        hotspot: {
          previews: [{ title: '3:2 (rács nézet)', aspectRatio: 3 / 2 }],
        },
      },
      validation: (Rule) => Rule.custom(aspectRatioValidator(3 / 2, '3:2')),
    }),
    defineField({
      name: 'members',
      title: 'Tagok (opcionális)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Név', type: 'string' }),
            defineField({
              name: 'photo',
              title: 'Fotó',
              type: 'image',
              description: 'Négyzet alakú (1:1) kép, pl. 600×600px.',
              options: {
                hotspot: {
                  previews: [{ title: '1:1 (tagfotó)', aspectRatio: 1 }],
                },
              },
              validation: (Rule) => Rule.custom(aspectRatioValidator(1, '1:1')),
            }),
            defineField({
              name: 'nameAlignment',
              title: 'Név igazítás',
              type: 'string',
              options: {
                list: [
                  { title: 'Balra', value: 'left' },
                  { title: 'Jobbra', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'photo' },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social / streaming linkek',
      type: 'object',
      fields: [
        defineField({ name: 'spotify', title: 'Spotify', type: 'url' }),
        defineField({ name: 'soundcloud', title: 'SoundCloud', type: 'url' }),
        defineField({ name: 'appleMusic', title: 'Apple Music', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
      ],
    }),
    defineField({
      name: 'musicEmbedUrl',
      title: 'Zene embed URL (Spotify / SoundCloud iframe src)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'day', media: 'cardThumbnailImage' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 1 ? 'Október 9.' : 'Október 10.',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Nap, majd fellépési idő',
      name: 'dayAndTime',
      by: [
        { field: 'day', direction: 'asc' },
        { field: 'setTime', direction: 'asc' },
      ],
    },
  ],
})
