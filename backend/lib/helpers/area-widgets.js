// Define our available widgets grouped by type
export const widgetGroups = {
  // Content widgets are the actual content elements users can add
  content: {
    label: 'Content',
    columns: 3,
    widgets: {
      '@apostrophecms/image': {},
      '@apostrophecms/video': {},
      '@apostrophecms/rich-text': {}
    }
  }
};

/**
 * Creates the groups configuration for ApostropheCMS widget areas
 * @param {Object} options - Configuration options
 * @param {boolean} options.includeLayouts - If true,
 *  includes layout widgets in the groups
 * @param {Array<string>} options.exclude - Array of widget names to exclude
 * @returns {Object} Returns the groups configuration object
 *
 * @example
 * // In your page type or piece type:
 * fields: {
 *   add: {
 *     main: {
 *       type: 'area',
 *       options: {
 *         // Get grouped widgets configuration
 *         ...getWidgetGroups({
 *           includeLayouts: true,
 *           exclude: ['hero']
 *         }),
 *         // Add any additional area options
 *         max: 10,
 *         min: 1
 *       }
 *     }
 *   }
 * }
 */
export const getWidgetGroups = ({
  includeLayouts = false,
  exclude = []
} = {}) => {
  // Initialize our groups object and widgets collection
  const groups = {};
  const widgets = {};

  // Always add content widgets
  const filteredContentWidgets = Object.fromEntries(
    Object.entries(widgetGroups.content.widgets)
      .filter(([ key ]) => !exclude.includes(key))
  );

  groups.content = {
    ...widgetGroups.content,
    widgets: filteredContentWidgets
  };

  // Add to flat widgets list (required by AposArea)
  Object.assign(widgets, filteredContentWidgets);

  // Return widgets (flat list), groups (organized), and expanded
  // Both widgets and groups are required for ApostropheCMS areas
  return {
    widgets,
    groups,
    expanded: true
  };
};
