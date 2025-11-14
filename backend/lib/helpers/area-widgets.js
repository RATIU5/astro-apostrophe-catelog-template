// Define our available widgets grouped by type and page context
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
  },
  // Home page specific widgets
  homeWidgets: {
    label: 'Home Page Sections',
    columns: 2,
    widgets: {
      'test': {}
    }
  },
  // Category page specific widgets
  categoryWidgets: {
    label: 'Category Page Sections',
    columns: 2,
    widgets: {
      'test': {}
    }
  }
};

/**
 * Creates the groups configuration for ApostropheCMS widget areas
 * @param {Object} options - Configuration options
 * @param {boolean} options.includeLayouts - If true,
 *  includes layout widgets in the groups
 * @param {Array<string>} options.exclude - Array of widget names to exclude
 * @param {Array<string>} options.includeGroups - Array of group names to include (e.g., ['homeWidgets', 'categoryWidgets'])
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
 *
 * @example
 * // For home page specific widgets:
 * fields: {
 *   add: {
 *     sections: {
 *       type: 'area',
 *       options: getWidgetGroups({
 *         includeGroups: ['homeWidgets']
 *       })
 *     }
 *   }
 * }
 */
export const getWidgetGroups = ({
  includeLayouts = false,
  exclude = [],
  includeGroups = null
} = {}) => {
  // Initialize our groups object
  const groups = {};

  // If specific groups are requested, only include those
  if (includeGroups && Array.isArray(includeGroups)) {
    includeGroups.forEach(groupName => {
      if (widgetGroups[groupName]) {
        groups[groupName] = {
          ...widgetGroups[groupName],
          // Filter out any excluded widgets
          widgets: Object.fromEntries(
            Object.entries(widgetGroups[groupName].widgets)
              .filter(([ key ]) => !exclude.includes(key))
          )
        };
      }
    });
  } else {
    // Default behavior: add content widgets
    groups.content = {
      ...widgetGroups.content,
      // Filter out any excluded widgets
      widgets: Object.fromEntries(
        Object.entries(widgetGroups.content.widgets)
          .filter(([ key ]) => !exclude.includes(key))
      )
    };
  }

  // Return just the expanded and groups properties
  // This allows other area options to be spread alongside it
  return {
    expanded: true,
    groups
  };
};
