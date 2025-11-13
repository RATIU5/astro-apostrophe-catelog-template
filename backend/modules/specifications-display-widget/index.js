export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Specifications Display',
    icon: 'file-document-icon',
    description: 'Display product specifications in a formatted layout'
  },
  fields: {
    add: {
      sectionTitle: {
        type: 'string',
        label: 'Section Title',
        def: 'Specifications'
      },
      displayStyle: {
        type: 'select',
        label: 'Display Style',
        choices: [
          { label: 'Table', value: 'table' },
          { label: 'List', value: 'list' },
          { label: 'Grid', value: 'grid' }
        ],
        def: 'table'
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true,
        help: 'Automatically displays product specifications from the product'
      }
    }
  }
};
