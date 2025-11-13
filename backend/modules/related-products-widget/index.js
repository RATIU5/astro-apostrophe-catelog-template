export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Related Products',
    icon: 'package-variant-icon',
    description: 'Display related or recommended products'
  },
  fields: {
    add: {
      sectionTitle: {
        type: 'string',
        label: 'Section Title',
        def: 'Related Products'
      },
      displayMode: {
        type: 'select',
        label: 'Display Mode',
        choices: [
          { label: 'Auto (same category)', value: 'auto' },
          { label: 'Manual selection', value: 'manual' }
        ],
        def: 'auto'
      },
      _products: {
        type: 'relationship',
        label: 'Select Products',
        withType: 'product',
        max: 6,
        if: {
          displayMode: 'manual'
        },
        builders: {
          project: {
            title: 1,
            slug: 1,
            _url: 1,
            images: 1,
            variants: 1
          }
        }
      },
      maxProducts: {
        type: 'integer',
        label: 'Maximum Products to Show',
        def: 4,
        min: 1,
        max: 12,
        if: {
          displayMode: 'auto'
        }
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true
      }
    }
  }
};
