import { getWidgetGroups } from '../../lib/helpers/area-widgets.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: getWidgetGroups()
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'main'
        ]
      }
    }
  }
};
