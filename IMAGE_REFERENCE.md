# 🖼️ Image Reference Guide

## Overview
All images are sourced from Unsplash, a free high-quality image platform. Images are loaded via CDN for optimal performance.

## 🎨 Hero Slider Images (3 total)

### Slide 1: Discover Extraordinary Art
```
URL: https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600
Description: Abstract colorful art gallery
Theme: Contemporary art exhibition
Size: 1600px width (optimized)
```

### Slide 2: Where Art Meets Passion
```
URL: https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1600
Description: Delicate floral artwork
Theme: Soft, artistic photography
Size: 1600px width (optimized)
```

### Slide 3: Elevate Your Space
```
URL: https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600
Description: Art gallery interior
Theme: Museum/gallery space
Size: 1600px width (optimized)
```

## 🎭 Category Images (3 total)

### Paintings Category
```
URL: https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800
Description: Abstract painting with vibrant colors
Theme: Contemporary painting
Size: 800px width (optimized)
```

### Sculptures Category
```
URL: https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800
Description: Modern sculpture
Theme: Contemporary sculpture art
Size: 800px width (optimized)
```

### Mixed Media Category
```
URL: https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800
Description: Abstract mixed media art
Theme: Contemporary mixed media
Size: 800px width (optimized)
```

## 🖼️ Artwork Gallery Images (8 total)

### Artwork 1: Starry Night Dreams
```
ID: 1
URL: https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800
Category: Painting
Price: $2,500
Rating: 4.8
```

### Artwork 2: Urban Symphony
```
ID: 2
URL: https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800
Category: Painting
Price: $3,200
Rating: 4.9
```

### Artwork 3: Ethereal Bloom
```
ID: 3
URL: https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800
Category: Painting
Price: $1,800
Rating: 4.7
```

### Artwork 4: Modern Sculpture
```
ID: 4
URL: https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800
Category: Sculpture
Price: $4,500
Rating: 4.6
```

### Artwork 5: Ocean Whispers
```
ID: 5
URL: https://images.unsplash.com/photo-1549887534-1541e9326642?w=800
Category: Painting
Price: $2,800
Rating: 4.9
```

### Artwork 6: Abstract Fusion
```
ID: 6
URL: https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800
Category: Mixed Art
Price: $3,500
Rating: 4.8
```

### Artwork 7: Golden Hour
```
ID: 7
URL: https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800
Category: Painting
Price: $2,200
Rating: 4.7
```

### Artwork 8: Minimalist Form
```
ID: 8
URL: https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800
Category: Sculpture
Price: $3,800
Rating: 4.5
```

## 📊 Image Statistics

### Total Images: 14
- Hero Slides: 3
- Categories: 3
- Artworks: 8

### Image Sizes
- Hero: 1600px width
- Category: 800px width
- Artwork: 800px width

### Loading Strategy
- CDN delivery (Unsplash)
- Lazy loading ready
- Responsive sizing
- Optimized compression

## 🔄 How to Replace Images

### Option 1: Use Different Unsplash Images
1. Visit https://unsplash.com
2. Search for art/gallery images
3. Copy image URL
4. Add `?w=800` or `?w=1600` for size
5. Replace in code

### Option 2: Use Your Own Images
1. Upload to image hosting service
2. Get direct image URL
3. Replace URLs in code
4. Ensure proper sizing

## 📝 Image URL Format

### Unsplash URL Structure
```
https://images.unsplash.com/photo-[ID]?w=[WIDTH]
```

### Parameters
- `w` = width (800, 1600, etc.)
- `h` = height (optional)
- `q` = quality (optional, 1-100)
- `fit` = crop/fill (optional)

### Examples
```
// Standard
https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800

// With quality
https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80

// With height
https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600
```

## 🎨 Image Selection Criteria

### Hero Slider
- High resolution (1600px+)
- Landscape orientation
- Art gallery/exhibition theme
- Good contrast for text overlay
- Professional quality

### Categories
- Representative of category
- Clear subject matter
- Good composition
- 800px width minimum
- Square or landscape

### Artworks
- High quality
- Clear details
- Good lighting
- Diverse styles
- Professional photography

## 🔍 Finding Similar Images

### Unsplash Search Terms
- "abstract art"
- "contemporary painting"
- "modern sculpture"
- "art gallery"
- "museum exhibition"
- "colorful artwork"
- "minimalist art"
- "mixed media art"

### Alternative Sources
- Pexels (https://pexels.com)
- Pixabay (https://pixabay.com)
- Unsplash (https://unsplash.com)
- Your own photography

## ⚡ Performance Tips

### Optimization
1. Use appropriate sizes (w parameter)
2. Enable lazy loading
3. Use CDN delivery
4. Cache images
5. Compress if needed

### Best Practices
- Don't use full resolution
- Match size to display
- Use responsive images
- Optimize for mobile
- Test load times

## 🛠️ Updating Images in Code

### Hero Slider
**File**: `src/components/CardSlider.vue`
```javascript
const slides = [
  {
    image: 'YOUR_IMAGE_URL_HERE',
    // ... other properties
  }
];
```

### Categories
**File**: `src/components/ArtworkCategory.vue`
```javascript
const categories = [
  {
    image: 'YOUR_IMAGE_URL_HERE',
    // ... other properties
  }
];
```

### Artworks
**File**: `src/stores/artwork.js`
```javascript
const DUMMY_ARTWORKS = [
  {
    imageUrl: 'YOUR_IMAGE_URL_HERE',
    // ... other properties
  }
];
```

## 📱 Responsive Images

### Current Implementation
- Desktop: Full size (800px/1600px)
- Tablet: Scaled down
- Mobile: Scaled down

### Future Enhancement
```html
<!-- Responsive image example -->
<img 
  :src="artwork.imageUrl" 
  :srcset="`
    ${artwork.imageUrl}?w=400 400w,
    ${artwork.imageUrl}?w=800 800w,
    ${artwork.imageUrl}?w=1200 1200w
  `"
  sizes="(max-width: 768px) 100vw, 800px"
  :alt="artwork.artworkName"
/>
```

## 🎯 Image Attribution

### Unsplash License
- Free to use
- No attribution required (but appreciated)
- Commercial use allowed
- Modification allowed

### Best Practice
Consider adding attribution in footer:
```html
<p>Images from Unsplash</p>
```

## 📚 Resources

- Unsplash: https://unsplash.com
- Unsplash API: https://unsplash.com/developers
- Image Optimization: https://web.dev/fast/#optimize-your-images
- Responsive Images: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

---

**Note**: All images are loaded from external CDN. Ensure internet connection for images to display properly.
