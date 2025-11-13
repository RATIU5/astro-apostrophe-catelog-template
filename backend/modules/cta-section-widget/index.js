export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Call to Action',
    icon: 'bullhorn-icon',
    description: 'Call-to-action block'
  },
  fields: {
    add: {
      message: {
        type: 'string',
        label: 'Message',
        required: true
      },
      buttonText: {
        type: 'string',
        label: 'Button Text',
        required: true
      },
      buttonUrl: {
        type: 'url',
        label: 'Button URL',
        required: true
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true
      }
    }
  }
};
