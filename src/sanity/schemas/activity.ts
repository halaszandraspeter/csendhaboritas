import { defineField, defineType } from 'sanity'

export const activitySchema = defineType({
  name: 'activity',
  title: 'Program / Aktivitás',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Program neve',
      type: 'string',
      description: 'pl. "Kapunyitás", "Sörpong", "Sörivó verseny"',
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
      title: 'Időpont',
      type: 'string',
      description: 'pl. "22:30"',
    }),
    defineField({
      name: 'image',
      title: 'Kép (1:1, opcionális)',
      type: 'image',
      description: 'Négyzet alakú kép, pl. 600×600px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Leírás',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'day', media: 'image' },
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
      title: 'Nap, majd időpont',
      name: 'dayAndTime',
      by: [
        { field: 'day', direction: 'asc' },
        { field: 'setTime', direction: 'asc' },
      ],
    },
  ],
})
