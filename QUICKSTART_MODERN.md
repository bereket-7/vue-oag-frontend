# Quick Start Guide - Modernized Art Gallery

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd vue-oag-frontend

# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm run serve
```

The application will be available at: **http://localhost:8080**

## ✨ What You'll See

### Home Page Features

1. **Hero Slider** (Top Section)
   - 3 rotating slides with art images
   - Auto-plays every 5 seconds
   - Click arrows to navigate manually
   - Click dots to jump to specific slide

2. **Category Section** (Middle)
   - 3 art categories displayed
   - Hover over cards to see details
   - Click "View Collection" to browse

3. **Featured Artworks** (Bottom)
   - 8 artworks in responsive grid
   - Hover to see quick view button
   - Click heart icon to add to wishlist
   - Click "Quick View" for details modal

## 🎨 Interactive Features

### Artwork Cards
- **Hover Effect**: Card lifts and image zooms
- **Wishlist**: Click heart icon (shows alert)
- **Quick View**: Opens detailed modal
- **Rating**: Displays star rating

### Modal (Quick View)
- Large artwork image
- Full description
- Size and rating information
- Price display
- "Add to Cart" button
- Click X or outside to close

## 📱 Test Responsive Design

1. **Desktop View** (1200px+)
   - Full grid layouts
   - Multiple columns
   - Large images

2. **Tablet View** (768px - 1199px)
   - Adjusted columns
   - Medium images
   - Optimized spacing

3. **Mobile View** (< 768px)
   - Single column
   - Stacked layout
   - Touch-friendly buttons

### How to Test
- Resize browser window
- Use browser DevTools (F12)
- Select device emulation

## 🔍 Explore the Code

### Key Files

```
src/
├── stores/
│   └── artwork.js          # Dummy data store
├── components/
│   ├── CardSlider.vue      # Hero slider
│   └── ArtworkCategory.vue # Category section
├── views/
│   ├── HomeView.vue        # Home page
│   └── Artwork/
│       └── ArtworkList.vue # Gallery grid
```

### Dummy Data Location
- **File**: `src/stores/artwork.js`
- **Constant**: `DUMMY_ARTWORKS`
- **Count**: 8 artworks

## 🎯 Features to Try

1. **Navigate Slider**
   - Wait for auto-play
   - Click navigation arrows
   - Click dot indicators

2. **Browse Categories**
   - Hover over category cards
   - See overlay effects
   - Click "View Collection"

3. **Explore Artworks**
   - Scroll to artwork grid
   - Hover over cards
   - Click wishlist heart
   - Open quick view modal

4. **View Details**
   - Click "Quick View" button
   - See full artwork information
   - Close modal (X or click outside)

## 🛠️ Customization

### Change Dummy Data
Edit `src/stores/artwork.js`:
```javascript
const DUMMY_ARTWORKS = [
  {
    id: 1,
    artworkName: 'Your Artwork',
    price: '$1,000',
    imageUrl: 'https://your-image-url.com',
    // ... other fields
  }
];
```

### Change Hero Slides
Edit `src/components/CardSlider.vue`:
```javascript
const slides = [
  {
    image: 'https://your-image-url.com',
    title: 'Your Title',
    subtitle: 'Your Subtitle',
    // ... other fields
  }
];
```

### Change Categories
Edit `src/components/ArtworkCategory.vue`:
```javascript
const categories = [
  {
    name: 'Your Category',
    description: 'Your Description',
    image: 'https://your-image-url.com'
  }
];
```

## 📦 Build for Production

```bash
# Create production build
npm run build

# Output will be in dist/ folder
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run serve -- --port 8081
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading
- Check internet connection (images from Unsplash)
- Verify image URLs in code
- Check browser console for errors

## 📚 Additional Commands

```bash
# Lint and fix files
npm run lint

# Run tests (if configured)
npm run test

# Build and preview production
npm run build
npm run preview
```

## 🎉 Enjoy!

Your modernized online art gallery is ready to explore. The application is fully functional with dummy data and requires no backend setup.

For questions or issues, refer to:
- `PHASE3_PREPARATION.md` - Detailed changes
- `MODERNIZATION_SUMMARY.md` - Visual overview
- `README.md` - Project documentation
