import { getWidgetGroups } from '../../../lib/helpers/area-widgets.js';

export default {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      // Main Content Area - Available for all layouts
      main: {
        type: 'area',
        label: 'Main Content',
        options: getWidgetGroups({
          includeLayouts: true
        })
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [
          'main'
        ]
      }
    }
  }
};
