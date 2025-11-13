// modules/category-page/index.js
import { getWidgetGroups } from '../../lib/helpers/area-widgets.js';

export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Category Page',
    pieceModuleName: 'product-category', // Links to your product-category piece type
    perPage: 12 // Products per page on index
  },
  fields: {
    add: {
      masthead: {
        type: 'area',
        label: 'Masthead',
        options: getWidgetGroups({
          includeLayouts: true
        })
      },
      beforeProducts: {
        type: 'area',
        label: 'Before Products Section',
        options: getWidgetGroups({
          includeLayouts: true
        })
      },
      afterProducts: {
        type: 'area',
        label: 'After Products Section',
        options: getWidgetGroups({
          includeLayouts: true
        })
      },
      indexLayout: {
        type: 'select',
        label: 'Product Grid Layout',
        def: 'grid',
        choices: [
          {
            label: 'Grid',
            value: 'grid',
            help: 'Products in grid layout'
          },
          {
            label: 'List',
            value: 'list',
            help: 'Products in list layout'
          }
        ]
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'masthead', 'beforeProducts', 'afterProducts' ]
      },
      utility: {
        label: 'Display Options',
        fields: [ 'indexLayout' ]
      }
    }
  }
};
