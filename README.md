# Widget Areas & Groups Guide

## How It Works

**Widget Areas** are editable regions where content creators add widgets. Each area specifies which widget groups are allowed.

**Widget Groups** organize widgets by context (e.g., home page widgets, category widgets, content widgets).

**Key Files:**
- `backend/lib/helpers/area-widgets.js` - Widget group definitions
- `backend/app.js` - Widget registration
- `frontend/src/widgets/index.js` - Frontend widget mapping

## Add a New Widget

### 1. Create Backend Module
`backend/modules/my-widget/index.js`:
```javascript
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'My Widget'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title',
        required: true
      }
    }
  }
};
```

### 2. Create Frontend Component
`frontend/src/widgets/MyWidget.astro`:
```astro
---
const { widget } = Astro.props;
---
<div class="my-widget">
  <h2>{widget.title}</h2>
</div>
```

### 3. Register in Backend
`backend/app.js`:
```javascript
modules: {
  'my-widget': {},  // Add this line
}
```

### 4. Map Frontend Component
`frontend/src/widgets/index.js`:
```javascript
import MyWidget from './MyWidget.astro';

const widgetComponents = {
  'my': MyWidget,  // Add this line (name without '-widget' suffix)
};
```

### 5. Add to Widget Group
`backend/lib/helpers/area-widgets.js`:
```javascript
export const widgetGroups = {
  homeWidgets: {
    label: 'Home Page Sections',
    columns: 2,
    widgets: {
      'test': {},
      'my': {}  // Add this line
    }
  }
};
```

**Or create a new group:**
```javascript
export const widgetGroups = {
  myGroup: {
    label: 'My Custom Group',
    columns: 2,
    widgets: {
      'my': {}
    }
  }
};
```

## Add a New Area/Region

### 1. Add Field to Page/Piece Module
Example for product page (`backend/modules/product-page/index.js`):
```javascript
fields: {
  add: {
    myRegion: {
      type: 'area',
      label: 'My Custom Region',
      options: getWidgetGroups({
        only: ['homeWidgets']  // Restrict to specific group(s)
      })
    }
  },
  group: {
    basics: {
      fields: ['myRegion']
    }
  }
}
```

**Widget Group Options:**
- `getWidgetGroups()` - Default content widgets
- `getWidgetGroups({ only: ['homeWidgets'] })` - Only home widgets
- `getWidgetGroups({ only: ['homeWidgets', 'categoryWidgets'] })` - Multiple groups
- `getWidgetGroups({ exclude: ['test'] })` - Exclude specific widgets

### 2. Render in Template
`frontend/src/templates/ProductIndexPage.astro`:
```astro
---
const { page } = Astro.props.aposData;
const { myRegion } = page;
---
{myRegion && <AposArea area={myRegion} />}
```

### 3. Add to API Projection (For Pieces)
If adding area to a piece type (`backend/modules/product/index.js`):
```javascript
options: {
  publicApiProjection: {
    title: 1,
    myRegion: 1  // Add this line
  }
}
```

## Quick Reference

**Widget naming:** Backend module `my-widget` → Frontend key `'my'`

**Area restrictions:**
- Home page: `only: ['homeWidgets']`
- Category: `only: ['categoryWidgets']`
- Multiple: `only: ['homeWidgets', 'categoryWidgets']`
- Default: `getWidgetGroups()` (content widgets)
