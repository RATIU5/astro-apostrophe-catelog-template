// modules/category-page/index.js
import { getWidgetGroups } from '../../lib/helpers/area-widgets.js';

export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Category Page',
    pieceModuleName: 'category',
    perPage: 8
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
        label: 'Before Products Grid',
        options: getWidgetGroups({
          includeLayouts: true
        })
      },
      afterProducts: {
        type: 'area',
        label: 'After Products Grid',
        options: getWidgetGroups({
          includeLayouts: true
        })
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'masthead', 'beforeProducts', 'afterProducts' ]
      }
    }
  }
};
