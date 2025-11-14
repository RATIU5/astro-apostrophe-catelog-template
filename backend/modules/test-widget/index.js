export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Test Widget',
    description: 'A test widget with title and rich text description'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title',
        required: true
      },
      description: {
        type: 'area',
        label: 'Description',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                'bold',
                'italic',
                'strike',
                'link',
                'bulletList',
                'orderedList',
                'blockquote'
              ]
            }
          },
          max: 1
        }
      }
    }
  }
};
