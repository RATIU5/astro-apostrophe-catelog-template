export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Image Gallery Section',
    icon: 'view-grid-icon',
    description: 'Display a gallery of images'
  },
  fields: {
    add: {
      sectionTitle: {
        type: 'string',
        label: 'Section Title'
      },
      galleryImages: {
        type: 'array',
        label: 'Gallery Images',
        titleField: 'caption',
        fields: {
          add: {
            image: {
              type: 'area',
              label: 'Image',
              options: {
                max: 1,
                widgets: { '@apostrophecms/image': {} }
              }
            },
            caption: {
              type: 'string',
              label: 'Caption'
            }
          }
        }
      },
      columns: {
        type: 'select',
        label: 'Columns',
        choices: [
          { label: '2 Columns', value: '2' },
          { label: '3 Columns', value: '3' },
          { label: '4 Columns', value: '4' }
        ],
        def: '3'
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true
      }
    }
  }
};
