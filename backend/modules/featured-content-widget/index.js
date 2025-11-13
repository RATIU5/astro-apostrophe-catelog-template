export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Featured Content',
    icon: 'star-icon',
    description: 'Featured content block with image and text'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title',
        required: true
      },
      content: {
        type: 'area',
        label: 'Content',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: ['bold', 'italic', 'link', 'bulletList', 'orderedList']
            }
          }
        }
      },
      featuredImage: {
        type: 'area',
        label: 'Featured Image',
        options: {
          max: 1,
          widgets: { '@apostrophecms/image': {} }
        }
      },
      imagePosition: {
        type: 'select',
        label: 'Image Position',
        choices: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Top', value: 'top' }
        ],
        def: 'left'
      },
      ctaText: {
        type: 'string',
        label: 'CTA Button Text'
      },
      ctaUrl: {
        type: 'url',
        label: 'CTA Button URL'
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true
      }
    }
  }
};
