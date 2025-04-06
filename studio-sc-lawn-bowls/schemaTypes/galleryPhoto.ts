import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'album',
      title: 'Album',
      type: 'reference',
      to: [{type: 'galleryAlbum'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'Display this photo in featured sections',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      albumTitle: 'album.title',
      media: 'image',
    },
    prepare(selection) {
      const {albumTitle} = selection
      return {...selection, subtitle: albumTitle ? `Album: ${albumTitle}` : 'No album specified'}
    },
  },
})
