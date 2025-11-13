export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Product Grid',
    icon: 'grid-icon',
    description: 'Display products from current category in a grid'
  },
  fields: {
    add: {
      sectionTitle: {
        type: 'string',
        label: 'Section Title'
      },
      gridLayout: {
        type: 'select',
        label: 'Grid Layout',
        choices: [
          { label: '2 Columns', value: '2-col' },
          { label: '3 Columns', value: '3-col' },
          { label: '4 Columns', value: '4-col' }
        ],
        def: '3-col'
      },
      maxProducts: {
        type: 'integer',
        label: 'Maximum Products',
        def: 8,
        min: 1,
        max: 24
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true
      }
    }
  }
};
