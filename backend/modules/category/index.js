import { getWidgetGroups } from '../../lib/helpers/area-widgets.js';

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Category',
    pluralLabel: 'Categories',
    localized: true,
    publicApiProjection: {
      title: 1,
      _url: 1,
      description: 1,
      image: 1,
      _parentCategory: 1,
      sections: 1
    }
  },
  fields: {
    add: {
      // Category description
      description: {
        type: 'area',
        label: 'Category Description',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: ['bold', 'italic', 'link', 'bulletList']
            }
          }
        }
      },
      // Single image
      image: {
        type: 'area',
        label: 'Category Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },

      // Category Page Sections Area - Only allows category-specific widgets
      sections: {
        type: 'area',
        label: 'Category Page Sections',
        help: 'Add section widgets to customize this category page',
        options: getWidgetGroups({
          includeGroups: ['categoryWidgets']
        })
      },

      // Self-referencing relationship for hierarchy
      _parentCategory: {
        type: 'relationship',
        label: 'Parent Category',
        withType: 'category',
        max: 1,
        builders: {
          project: {
            title: 1,
            _url: 1
          }
        },
        help: 'Leave empty for top-level category. Maximum 2 levels deep.'
      }
    },
    group: {
      basics: {
        label: 'Basic Information',
        fields: ['title', 'description', 'image']
      },
      content: {
        label: 'Page Content',
        fields: ['sections']
      },
      hierarchy: {
        label: 'Category Hierarchy',
        fields: ['_parentCategory']
      }
    }
  },

  // Add reverse relationship for products
  columns: {
    add: {
      productCount: {
        label: 'Products',
        component: 'AposCellBasic'
      }
    }
  }
};
