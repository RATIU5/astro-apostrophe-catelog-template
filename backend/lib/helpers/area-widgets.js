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
  // Initialize our groups object and widgets collection
  const groups = {};
  const widgets = {};

  // If specific groups are requested, only include those
  if (includeGroups && Array.isArray(includeGroups)) {
    includeGroups.forEach(groupName => {
      if (widgetGroups[groupName]) {
        const filteredWidgets = Object.fromEntries(
          Object.entries(widgetGroups[groupName].widgets)
            .filter(([ key ]) => !exclude.includes(key))
        );

        groups[groupName] = {
          ...widgetGroups[groupName],
          widgets: filteredWidgets
        };

        // Add all widgets to the top-level widgets object
        Object.assign(widgets, filteredWidgets);
      }
    });
  } else {
    // Default behavior: add content widgets
    const filteredWidgets = Object.fromEntries(
      Object.entries(widgetGroups.content.widgets)
        .filter(([ key ]) => !exclude.includes(key))
    );

    groups.content = {
      ...widgetGroups.content,
      widgets: filteredWidgets
    };

    // Add all widgets to the top-level widgets object
    Object.assign(widgets, filteredWidgets);
  }

  // Return expanded, widgets (for AposArea compatibility), and groups
  return {
    expanded: true,
    widgets,
    groups
  };
};
