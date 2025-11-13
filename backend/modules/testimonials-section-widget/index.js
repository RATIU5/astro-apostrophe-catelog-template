export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Testimonials Section',
    icon: 'comment-quote-icon',
    description: 'Display customer testimonials'
  },
  fields: {
    add: {
      sectionTitle: {
        type: 'string',
        label: 'Section Title'
      },
      testimonials: {
        type: 'array',
        label: 'Testimonials',
        titleField: 'customerName',
        fields: {
          add: {
            customerName: {
              type: 'string',
              label: 'Customer Name',
              required: true
            },
            customerTitle: {
              type: 'string',
              label: 'Customer Title/Company'
            },
            testimonial: {
              type: 'string',
              label: 'Testimonial',
              textarea: true,
              required: true
            },
            rating: {
              type: 'integer',
              label: 'Rating (1-5)',
              min: 1,
              max: 5,
              def: 5
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
