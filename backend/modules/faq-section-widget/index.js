export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'FAQ Section',
    icon: 'help-circle-icon',
    description: 'Frequently asked questions accordion'
  },
  fields: {
    add: {
      sectionTitle: {
        type: 'string',
        label: 'Section Title',
        def: 'Frequently Asked Questions'
      },
      faqs: {
        type: 'array',
        label: 'FAQs',
        titleField: 'question',
        fields: {
          add: {
            question: {
              type: 'string',
              label: 'Question',
              required: true
            },
            answer: {
              type: 'area',
              label: 'Answer',
              options: {
                widgets: {
                  '@apostrophecms/rich-text': {
                    toolbar: ['bold', 'italic', 'link', 'bulletList']
                  }
                }
              }
            }
          }
        }
      },
      visible: {
        type: 'boolean',
        label: 'Show this section',
        def: true
      }
    }
  }
};
