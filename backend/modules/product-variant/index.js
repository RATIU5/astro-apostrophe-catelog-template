export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product Variant',
    pluralLabel: 'Product Variants',
    alias: 'productVariant',
    localized: true,
    autopublish: false,
    searchable: true,
    quickCreate: true,
    sort: { sku: 1 }
  },
  fields: {
    add: {
      sku: {
        type: 'string',
        label: 'SKU',
        help: 'Stock Keeping Unit - must be unique across all variants',
        required: true
      },
      // Option values for this variant
      optionValues: {
        type: 'array',
        label: 'Option Values',
        help: 'Define the option combinations for this variant (e.g., Size: Small, Color: Red)',
        titleField: 'label',
        inline: true,
        style: 'table',
        fields: {
          add: {
            optionName: {
              type: 'string',
              label: 'Option Type',
              help: 'e.g., "Size", "Color", "Material"',
              required: true
            },
            value: {
              type: 'string',
              label: 'Value',
              help: 'e.g., "Small", "Red", "Cotton"',
              required: true
            },
            label: {
              type: 'string',
              label: 'Display Label',
              help: 'Optional custom display label (e.g., "S" for Small)'
            }
          }
        }
      },
      // Pricing
      price: {
        type: 'float',
        label: 'Price',
        help: 'Selling price for this variant',
        required: true,
        min: 0
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'sku', 'optionValues']
      },
      pricing: {
        label: 'Pricing',
        fields: ['price']
      }
    }
  },

  methods(self) {
    return {
      // Get display name for variant (e.g., "Small / Red")
      getDisplayName(variant) {
        if (!variant.optionValues || variant.optionValues.length === 0) {
          return variant.title || variant.sku;
        }
        return variant.optionValues
          .map(opt => opt.value)
          .join(' / ');
      },

      // Get option value by option name
      getOptionValue(variant, optionName) {
        if (!variant.optionValues) {
          return null;
        }
        const option = variant.optionValues.find(
          opt => opt.optionName.toLowerCase() === optionName.toLowerCase()
        );
        return option ? option.value : null;
      }
    };
  }
};
