import { getWidgetGroups } from '../../../lib/helpers/area-widgets.js';

export default {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      // Home Page Sections Area - Only allows home-specific widgets
      sections: {
        type: 'area',
        label: 'Home Page Sections',
        help: 'Add stacked section widgets to build your home page',
        options: getWidgetGroups({
          only: ['homeWidgets']
        })
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [
          'sections'
        ]
      }
    }
  }
};
