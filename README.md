# Product Catalog Starter Kit for ApostropheCMS + Astro

**Build flexible product and category systems with the editing experience your content team actually wants to use.**

A production-ready template combining [ApostropheCMS](https://docs.apostrophecms.org/) as a headless backend with [Astro](https://astro.build/) as a modern frontend framework. This template includes a flexible product and category system with composable widgets, enabling content editors to create rich, dynamic product pages.

## ✨ What Makes This Special

- **🛍️ Flexible Product System** - Rich product data with variants, specifications, and custom information tables
- **📂 Hierarchical Categories** - Two-level category hierarchy with parent-child relationships
- **🧩 Composable Widgets** - 9 section widgets for building custom product and category pages
- **🚀 Headless CMS with Frontend Integration** - Full ApostropheCMS Admin UI with in-context editing
- **⚡ Modern Frontend** - Astro for optimal performance and developer experience
- **📱 Fully Responsive** - Mobile-first approach with modern web standards
- **💰 Completely Free** - No license fees, perfect for any project size

## Table of Contents

- [Introduction](#introduction)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
- [📦 Product & Category System](#-product--category-system)
  - [Creating Products](#creating-products)
  - [Creating Categories](#creating-categories)
  - [Using Product Variants](#using-product-variants)
  - [Adding Dynamic Sections](#adding-dynamic-sections)
- [🎨 Creating Templates](#-creating-templates)
  - [Understanding Templates](#understanding-templates)
  - [Creating a Product Template](#creating-a-product-template)
  - [Creating a Category Template](#creating-a-category-template)
  - [Linking Templates to Content](#linking-templates-to-content)
- [🧩 Widget System](#-widget-system)
  - [Available Widgets](#available-widgets)
  - [Creating Custom Widgets](#creating-custom-widgets)
- [🏗️ Project Architecture](#️-project-architecture)
- [🖼️ Image Helper Functions](#️-image-helper-functions)
- [⚙️ Package Scripts](#️-package-scripts)
- [🚀 Deploying to Production](#-deploying-to-production)

## Introduction

This project utilizes ApostropheCMS as a headless backend with Astro as a frontend, featuring the [apostrophe-astro](https://github.com/apostrophecms/apostrophe-astro) package. This enables full use of the ApostropheCMS Admin UI, including in-context editing, while providing a flexible product and category system for building e-commerce and catalog sites.

## 🚀 Getting Started

### Prerequisites

**Required:**
- Node.js v20 or later (v22 recommended)
- MongoDB v6.0 or later (local server or Atlas). See the [ApostropheCMS documentation](https://docs.apostrophecms.org/guide/development-setup.html) for setup.

**Windows Users:**
- Windows Subsystem for Linux 2 (WSL2) required for Apostrophe development. Learn more from [Microsoft](https://learn.microsoft.com/en-us/windows/wsl/install) and in our [documentation](https://docs.apostrophecms.org/cookbook/windows-development.html).

### Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development servers**
   Open two terminals:

   ```bash
   # Terminal 1 - Backend (use WSL on Windows)
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

Your site will be available at `http://localhost:4321` (Astro frontend). The ApostropheCMS admin is accessible at `http://localhost:3000/login`.

## 📦 Product & Category System

### Creating Products

Products are the main content type for your catalog. Each product can have rich data including images, variants, specifications, and dynamic sections.

**To create a product:**

1. Log in to the ApostropheCMS admin at `http://localhost:3000/login`
2. Click **Products** in the admin bar
3. Click **New Product**
4. Fill in the product information:

#### Basic Information
- **Title**: Product name (required)
- **Description**: Rich-text description of the product
- **Category**: Select one category (required)

#### Images
- Click **Add Item** to add product images (max 15)
- For each image:
  - Upload the image via the image widget
  - Add **Alt Text** (required for accessibility)
  - Check **Primary Image** for the main product image
- The first image with `isPrimary` checked will be the featured image
- Other images display as thumbnails in the gallery

#### Product Details

**Specifications**: Key-value pairs for product specs
- Click **Add Item** to add a specification row
- **Specification Name**: e.g., "Material", "Weight", "Dimensions"
- **Value**: e.g., "Cotton", "2.5 lbs", "10 x 8 x 6 inches"

**Information Table**: Complex data table with custom rows and columns
- **Table Title**: Name for your table (e.g., "Size Chart", "Compatibility Matrix")
- **Column Names**: Click **Add Item** for each column header
- **Row Names**: Click **Add Item** for each row header
- **Cell Values**: Click **Add Item** for each cell
  - **Row Number**: Zero-indexed (0 = first row)
  - **Column Number**: Zero-indexed (0 = first column)
  - **Cell Value**: The data for this cell
  - **Label**: Description for admin UI (e.g., "Row 2, Column 3")

**Features**: Rich-text area for bullet points or feature descriptions

#### Options & Variants

The flexible variant system uses a two-step process inspired by Shopify:

**Step 1: Define Product Options**
- Click **Add Item** to define an option type (e.g., Size, Color, Material)
- **Option Name**: The type of option (e.g., "Size", "Color", "Material")
- **Option Values**: Comma-separated list of valid values
  - Example for Size: "Small, Medium, Large, X-Large"
  - Example for Color: "Red, Blue, Green, Black, White"
  - Max 3 option types per product

**Step 2: Create Variants**
- Click **Add Item** to create each variant
- **Option Values**: Add an option value for each option type
  - **Option**: Must match a defined option name (e.g., "Size")
  - **Value**: Must match a value from the option's list (e.g., "Small")
  - Example: Size=Small + Color=Red
- **Price**: Selling price for this variant (required)
- **Compare At Price**: Original price (for showing discounts)
- **SKU**: Stock Keeping Unit (required, must be unique)
- **Barcode**: ISBN, UPC, GTIN for inventory management
- **Stock Quantity**: Current inventory level
- **Available for Purchase**: Uncheck to hide from customers
- **Weight**: Weight in lbs for shipping calculations
- **Requires Shipping**: Uncheck for digital products

#### Page Sections
- Add dynamic content widgets (Hero, CTA, Testimonials, FAQ, etc.)
- Widgets are rendered below the product information
- Use the **Show this section** checkbox to hide/show widgets without deleting

5. Click **Save Draft** to save without publishing, or **Publish** to make it live

### Creating Categories

Categories organize products into hierarchical groups (max 2 levels: parent → child).

**To create a category:**

1. Go to **Categories** in the admin bar
2. Click **New Category**
3. Fill in the category information:

#### Basic Information
- **Title**: Category name (required)
- **URL Slug**: Auto-generated from title, editable
- **Description**: Rich-text description of the category
- **Category Image**: Single image for the category hero

#### Category Hierarchy
- **Parent Category**: Select a parent (leave empty for top-level)
  - Top-level: No parent (e.g., "Furniture")
  - Child level: Has a parent (e.g., "Chairs" under "Furniture")
  - Max 2 levels supported

#### Page Sections
- **Global Sections**: CTA and Testimonials widgets
- **Category-Specific**: Product Grid, Hero Section, Featured Content
- The Product Grid widget automatically shows products from this category

4. Click **Save Draft** or **Publish**

### Using Product Variants

The variant system follows a two-step process to make it easy for content editors to manage product options.

#### Example: T-Shirt with Sizes and Colors

**Step 1: Define Product Options**

Option 1:
- Option Name: "Size"
- Option Values: "Small, Medium, Large, X-Large"

Option 2:
- Option Name: "Color"
- Option Values: "Red, Blue, Green, Black, White"

**Step 2: Create Variants**

Variant 1:
- Option Values:
  - Size: Small
  - Color: Red
- Price: $19.99
- Compare At Price: $24.99 (20% discount)
- SKU: "TSHIRT-SM-RED"
- Stock Quantity: 50
- Available: Yes
- Weight: 0.5 lbs

Variant 2:
- Option Values:
  - Size: Large
  - Color: Blue
- Price: $22.99
- SKU: "TSHIRT-LG-BLUE"
- Stock Quantity: 0
- Available: Yes
- Weight: 0.6 lbs

#### What Displays on the Product Page

1. **Available Options Section**: Shows "Size: Small, Medium, Large, X-Large" and "Color: Red, Blue, Green, Black, White"

2. **Product Variants Section**:
   - "Starting at $19.99" (lowest variant price)
   - Each variant displays:
     - Option badges (e.g., "Size: Small", "Color: Red")
     - Pricing with strikethrough for discounts
     - Discount percentage badge
     - SKU, barcode, and weight
     - Stock status ("50 in stock", "Out of Stock", "Unavailable")
     - Digital product badge if shipping not required

This system provides content editors with clear guidance on what values are valid, while maintaining flexibility for different product types.

### Adding Dynamic Sections

Both products and categories support dynamic sections for flexible page layouts.

**Product Section Widgets:**
- Hero Section
- Testimonials Section
- FAQ Section
- Specifications Display
- Image Gallery Section
- CTA Section
- Related Products

**Category Section Widgets (additional):**
- Product Grid (shows products from the category)
- Featured Content

**To add a section:**
1. Scroll to **Page Sections** in the product/category editor
2. Click the **+** button
3. Select a widget from the groups
4. Configure the widget fields
5. Use the **Show this section** checkbox to control visibility

## 🎨 Creating Templates

### Understanding Templates

Templates in this project are Astro components that render specific page types from ApostropheCMS. Each template corresponds to a piece type or page type.

**Template Types:**

1. **Show Templates**: Display individual items (e.g., single product)
   - File naming: `ProductShowPage.astro`, `CategoryShowPage.astro`
   - Template key: `'product-page:show'`, `'category-page:show'`

2. **Index Templates**: Display lists of items (e.g., all products)
   - File naming: `ProductIndexPage.astro`, `CategoryIndexPage.astro`
   - Template key: `'product-page:index'`, `'category-page:index'`

### Creating a Product Template

Product templates display individual product information.

**File: `frontend/src/templates/ProductShowPage.astro`**

```astro
---
import AposLayout from '@apostrophecms/apostrophe-astro/components/layouts/AposLayout.astro';
import AposArea from '@apostrophecms/apostrophe-astro/components/AposArea.astro';
import { getAttachmentUrl } from '../lib/attachments.js';

// Access the product data
const { piece } = Astro.props.aposData;

// Get the primary image
const primaryImage = piece.images?.find(img => img.isPrimary) || piece.images?.[0];

// Calculate starting price from variants
const startingPrice = piece.variants?.length > 0
  ? Math.min(...piece.variants.map(v => v.price))
  : null;
---

<AposLayout title={piece.title} {...Astro.props}>
  <Fragment slot="main">
    <article class="product-page">
      <h1>{piece.title}</h1>

      <!-- Product Image -->
      {primaryImage && (
        <img
          src={getAttachmentUrl(primaryImage.image?.items?.[0]?._image?.[0], { size: 'full' })}
          alt={primaryImage.altText || piece.title}
        />
      )}

      <!-- Description -->
      {piece.description && <AposArea area={piece.description} />}

      <!-- Specifications -->
      {piece.specifications?.length > 0 && (
        <dl>
          {piece.specifications.map(spec => (
            <>
              <dt>{spec.key}</dt>
              <dd>{spec.value}</dd>
            </>
          ))}
        </dl>
      )}

      <!-- Product Options -->
      {piece.productOptions?.length > 0 && (
        <div class="options">
          {piece.productOptions.map(option => {
            const values = option.values?.split(',').map(v => v.trim()) || [];
            return (
              <p><strong>{option.name}:</strong> {values.join(', ')}</p>
            );
          })}
        </div>
      )}

      <!-- Variants -->
      {piece.variants?.length > 0 && (
        <div class="variants">
          {startingPrice && <p>Starting at ${startingPrice.toFixed(2)}</p>}
          {piece.variants.map(variant => {
            const inStock = variant.quantity > 0;
            return (
              <div class="variant">
                <div>
                  {variant.optionValues?.map(opt => (
                    <span>{opt.optionName}: {opt.value}</span>
                  ))}
                </div>
                <span>${variant.price.toFixed(2)}</span>
                <span>{inStock ? `${variant.quantity} in stock` : 'Out of Stock'}</span>
              </div>
            );
          })}
        </div>
      )}

      <!-- Dynamic Sections -->
      {piece.sections && <AposArea area={piece.sections} />}
    </article>
  </Fragment>
</AposLayout>
```

### Creating a Category Template

Category templates display category information and fetch products.

**File: `frontend/src/templates/CategoryShowPage.astro`**

```astro
---
import AposLayout from '@apostrophecms/apostrophe-astro/components/layouts/AposLayout.astro';
import AposArea from '@apostrophecms/apostrophe-astro/components/AposArea.astro';
import { getAttachmentUrl } from '../lib/attachments.js';

const { piece } = Astro.props.aposData;
const categoryImage = piece.image?.items?.[0]?._image?.[0];

// Fetch products for this category (max 8)
const aposHost = import.meta.env.APOS_HOST || 'http://localhost:3000';
const productsResponse = await fetch(
  `${aposHost}/api/v1/product?_category=${piece._id}&perPage=8`
);
const productsData = await productsResponse.json();
const products = productsData.results || [];
---

<AposLayout title={piece.title} {...Astro.props}>
  <Fragment slot="main">
    <article class="category-page">
      <h1>{piece.title}</h1>

      <!-- Category Image -->
      {categoryImage && (
        <img
          src={getAttachmentUrl(categoryImage, { size: 'full' })}
          alt={piece.title}
        />
      )}

      <!-- Description -->
      {piece.description && <AposArea area={piece.description} />}

      <!-- Products Grid -->
      {products.length > 0 && (
        <div class="products-grid">
          {products.map(product => (
            <article class="product-card">
              <a href={product._url}>
                <h3>{product.title}</h3>
                <!-- Add product image and pricing here -->
              </a>
            </article>
          ))}
        </div>
      )}

      <!-- Dynamic Sections -->
      {piece.sections && <AposArea area={piece.sections} />}
    </article>
  </Fragment>
</AposLayout>
```

### Linking Templates to Content

Templates are automatically linked to content types through the template mapping file.

**File: `frontend/src/templates/index.js`**

```javascript
import HomePage from './HomePage.astro';
import ProductShowPage from './ProductShowPage.astro';
import ProductIndexPage from './ProductIndexPage.astro';
import CategoryShowPage from './CategoryShowPage.astro';
import CategoryIndexPage from './CategoryIndexPage.astro';

const templateComponents = {
  '@apostrophecms/home-page': HomePage,
  'product-page:show': ProductShowPage,    // Individual product
  'product-page:index': ProductIndexPage,  // All products
  'category-page:show': CategoryShowPage,  // Individual category
  'category-page:index': CategoryIndexPage // All categories
};

export default templateComponents;
```

**How linking works:**

1. **Backend Module Name**: `product` (piece type)
2. **Page Type Module**: `product-page` (piece-page-type)
3. **Template Keys**:
   - `'product-page:show'` → Shows individual product
   - `'product-page:index'` → Shows list of all products
4. **URL Routing**: ApostropheCMS automatically handles routing
   - `/products` → Index page (all products)
   - `/products/my-product` → Show page (individual product)

**Key Points:**

- The template key format is `'{page-module-name}:{view-type}'`
- `show` view is for individual items
- `index` view is for lists
- The module name must match the `pieceModuleName` in the page type
- Templates are mapped in `frontend/src/templates/index.js`
- No additional configuration needed - routing is automatic

## 🧩 Widget System

### Available Widgets

This project includes 9 composable section widgets for building dynamic pages:

**Content Widgets:**
1. **Hero Section** - Large banner with background image, heading, and CTA
2. **CTA Section** - Call-to-action block with message and button
3. **Testimonials Section** - Customer testimonials with star ratings
4. **FAQ Section** - Accordion-style frequently asked questions
5. **Featured Content** - Content block with image and CTA

**Product-Specific Widgets:**
6. **Specifications Display** - Product specs in table/list/grid format
7. **Image Gallery Section** - Image gallery with configurable columns
8. **Related Products** - Show related products (auto or manual)
9. **Product Grid** - Display products from current category

### Creating Custom Widgets

To create a new widget:

#### 1. Create Backend Widget Module

**File: `backend/modules/my-widget/index.js`**

```javascript
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'My Widget',
    icon: 'star-icon',
    description: 'Description of what this widget does'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title',
        required: true
      },
      content: {
        type: 'area',
        label: 'Content',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {}
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
```

#### 2. Register the Widget Module

**File: `backend/app.js`**

```javascript
export default apostrophe({
  modules: {
    // ... other modules
    'my-widget': {}
  }
});
```

#### 3. Create Frontend Widget Component

**File: `frontend/src/widgets/MyWidget.astro`**

```astro
---
import AposArea from '@apostrophecms/apostrophe-astro/components/AposArea.astro';

const { widget } = Astro.props;

// Check visibility
if (widget.visible === false) {
  return null;
}
---

<section class="my-widget">
  <h2>{widget.title}</h2>
  {widget.content && <AposArea area={widget.content} />}
</section>

<style>
  .my-widget {
    padding: 2rem;
    margin-bottom: 2rem;
  }
</style>
```

#### 4. Register the Frontend Widget

**File: `frontend/src/widgets/index.js`**

```javascript
import MyWidget from './MyWidget.astro';

const widgetComponents = {
  // ... other widgets
  'my-widget': MyWidget  // Key must match backend module name (without -widget suffix)
};

export default widgetComponents;
```

#### 5. Add to Product/Category Sections

**File: `backend/modules/product/index.js`** (or `category/index.js`)

```javascript
sections: {
  type: 'area',
  label: 'Page Sections',
  options: {
    expanded: true,
    groups: {
      content: {
        label: 'Content Sections',
        widgets: {
          'my-widget': {},  // Add your widget here
          // ... other widgets
        }
      }
    }
  }
}
```

Now your widget will be available in the sections area for products and categories!

## 🏗️ Project Architecture

### Project Structure

```
├── backend/               # ApostropheCMS application
│   ├── modules/
│   │   ├── product/           # Product piece type
│   │   ├── category/          # Category piece type
│   │   ├── product-page/      # Product page type
│   │   ├── category-page/     # Category page type
│   │   └── *-widget/          # Widget modules (9 total)
│   ├── app.js             # Main configuration
│   └── package.json
├── frontend/              # Astro application
│   ├── src/
│   │   ├── pages/
│   │   │   └── [...slug].astro    # Single catch-all route
│   │   ├── templates/
│   │   │   ├── index.js           # Template mapping
│   │   │   ├── ProductShowPage.astro
│   │   │   ├── CategoryShowPage.astro
│   │   │   └── ...
│   │   ├── widgets/
│   │   │   ├── index.js           # Widget mapping
│   │   │   └── *.astro            # Widget components (9 total)
│   │   └── lib/
│   │       └── attachments.js     # Image helper functions
│   ├── astro.config.mjs
│   └── package.json
└── package.json           # Root package management
```

### Data Flow

1. **Backend**: ApostropheCMS stores products and categories in MongoDB
2. **API**: REST API exposes content via `publicApiProjection`
3. **Frontend**: Astro SSR fetches data via `aposPageFetch()` and direct API calls
4. **Templates**: Page templates render product/category data
5. **Widgets**: Composable widgets render dynamic sections
6. **Editors**: Content editors use Admin UI to create and manage content

### Key Concepts

**Draft/Publish Workflow:**
- All changes are saved as drafts by default
- Click **Publish** to make content live
- Use **Save Draft** to save without publishing
- Products and categories have `localized: true`, `autopublish: false`

**Routing:**
- Single `[...slug].astro` file handles all routes
- ApostropheCMS manages URLs and routing automatically
- Templates map to page types via `templates/index.js`
- Product URLs: `/products/product-slug`
- Category URLs: `/categories/category-slug`

**API Endpoints:**
- Get products by category: `/api/v1/product?_category={categoryId}&perPage=8`
- Get single product: `/api/v1/product/{productId}`
- Get categories: `/api/v1/category`
- All endpoints support filtering, sorting, and projection

## 🖼️ Image Helper Functions

### Core Functions

**`getAttachmentUrl(imageObject, options)`**
- Get URL for an image with optional size
- Sizes: 'one-sixth', 'one-third', 'one-half', 'two-thirds', 'full', 'max', 'original'
- Example: `getAttachmentUrl(image, { size: 'full' })`

**`getAttachmentSrcset(imageObject, options)`**
- Generate responsive srcset string
- Automatically includes all available sizes
- Example: `getAttachmentSrcset(image)`

**`getFocalPoint(imageObject, defaultValue)`**
- Get focal point coordinates for CSS
- Returns format: "X% Y%" (e.g., "50% 50%")
- Default: "center center"

**`getWidth(imageObject)` / `getHeight(imageObject)`**
- Get image dimensions, respecting crops
- Returns pixel values

### Usage Example

```astro
---
import { getAttachmentUrl, getAttachmentSrcset, getFocalPoint } from '../lib/attachments.js';

// From product images array
const image = product.images[0].image?.items?.[0]?._image?.[0];
---

<img
  src={getAttachmentUrl(image, { size: 'full' })}
  srcset={getAttachmentSrcset(image)}
  sizes="(max-width: 800px) 100vw, 800px"
  alt={product.images[0].altText}
  style={`object-position: ${getFocalPoint(image)};`}
/>
```

## ⚙️ Package Scripts

### Root `package.json` scripts

- `npm install` - Installs dependencies for both frontend and backend
- `npm run update` - Updates dependencies for both projects
- `npm run load-starter-content` - Loads sample data (optional)

### Frontend scripts (`cd frontend`)

- `npm run dev` - Start Astro development server (port 4321)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend scripts (`cd backend`)

- `npm run dev` - Start ApostropheCMS development server (port 3000)
- `npm run build` - Build assets for production

## 🚀 Deploying to Production

### Using ApostropheCMS Hosting (Recommended)

ApostropheCMS hosting automatically handles:
- Database provisioning and management
- Asset storage and delivery
- SSL certificate management
- Automatic backups
- Security updates

[Learn more and contact us](https://apostrophecms.com/hosting) to get your hosting set up.

### Using 3rd-Party Hosting

Third-party hosting requires separate servers for backend and frontend.

**Backend Requirements:**
- Node.js environment (v20+)
- MongoDB database
- Asset storage (S3, etc.)
- Environment variables:
  ```bash
  NODE_ENV=production
  APOS_MONGODB_URI=your_connection_string
  APOS_EXTERNAL_FRONT_KEY=random_string
  APOS_S3_BUCKET=your-bucket
  APOS_S3_SECRET=your-secret
  APOS_S3_KEY=your-key
  APOS_S3_REGION=your-region
  ```

**Frontend Requirements:**
- SSR-capable hosting (Netlify, Vercel, Cloudflare Pages)
- Environment variables:
  ```bash
  APOS_HOST=your-backend-url
  APOS_EXTERNAL_FRONT_KEY=same_random_string_as_backend
  ```

See the [ApostropheCMS hosting documentation](https://docs.apostrophecms.org/guide/hosting.html) and [Astro deployment guides](https://docs.astro.build/en/guides/deploy/) for detailed instructions.

## 🚑 Need Help?

- **Documentation**: [ApostropheCMS Docs](https://docs.apostrophecms.org/) | [Astro Docs](https://docs.astro.build/)
- **Community Support**: Join our [Discord community](https://discord.com/invite/HwntQpADJr)
- **Professional Support**: [Contact us](https://apostrophecms.com/contact-us) for dedicated support packages
- **Tutorials**: [Building a Site with Apollo](https://docs.apostrophecms.org/tutorials/astro/apostrophecms-and-astro.html)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

*Built with ❤️ by the ApostropheCMS team. [Star us on GitHub](https://github.com/apostrophecms) if this helps your project!*
