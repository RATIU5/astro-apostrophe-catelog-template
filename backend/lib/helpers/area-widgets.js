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
 * @param {boolean} options.includeLayouts - If true, includes layout widgets in the groups
 * @param {Array<string>} options.exclude - Array of widget names to exclude
 * @param {Array<string>} options.only - If specified, only include these widget group names (e.g., ['homeWidgets'])
 * @returns {Object} Returns the groups configuration object
 *
 * @example
 * // Default content widgets:
 * fields: {
 *   add: {
 *     main: {
 *       type: 'area',
 *       options: getWidgetGroups()
 *     }
 *   }
 * }
 *
 * @example
 * // Home page specific widgets only:
 * fields: {
 *   add: {
 *     sections: {
 *       type: 'area',
 *       options: getWidgetGroups({ only: ['homeWidgets'] })
 *     }
 *   }
 * }
 */
export const getWidgetGroups = ({
  includeLayouts = false,
  exclude = [],
  only = null
} = {}) => {
  // Initialize our groups object and widgets collection
  const groups = {};
  const widgets = {};

  // Determine which groups to include
  const groupsToInclude = only && Array.isArray(only) && only.length > 0
    ? only
    : ['content']; // Default to content widgets

  // Process each group
  groupsToInclude.forEach(groupName => {
    if (widgetGroups[groupName]) {
      const filteredWidgets = Object.fromEntries(
        Object.entries(widgetGroups[groupName].widgets)
          .filter(([ key ]) => !exclude.includes(key))
      );

      groups[groupName] = {
        ...widgetGroups[groupName],
        widgets: filteredWidgets
      };

      // Add to flat widgets list (required by AposArea)
      Object.assign(widgets, filteredWidgets);
    }
  });

  // Return widgets (flat list), groups (organized), and expanded
  // Both widgets and groups are required for ApostropheCMS areas
  return {
    widgets,
    groups,
    expanded: true
  };
};
