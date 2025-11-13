export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Hero Section',
    icon: 'image-text-icon',
    description: 'Large hero banner with image and text'
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: 'Heading',
        required: true
      },
      subheading: {
        type: 'string',
        label: 'Subheading',
        textarea: true
      },
      backgroundImage: {
        type: 'area',
        label: 'Background Image',
        options: {
          max: 1,
          widgets: { '@apostrophecms/image': {} }
        }
      },
      ctaText: {
        type: 'string',
        label: 'Button Text'
      },
      ctaUrl: {
        type: 'url',
        label: 'Button URL'
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true,
        help: 'Uncheck to hide without deleting'
      }
    }
  }
};
