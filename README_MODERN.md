# 🎨 Modern Online Art Gallery - Frontend

> A contemporary, fully-functional art gallery application built with Vue 3, featuring stunning visuals and smooth interactions. Currently running with dummy data in preparation for Phase 3 backend integration.

## ✨ Features

### 🖼️ Modern Design
- Full-screen hero slider with auto-play
- Responsive grid layouts
- Smooth animations and transitions
- Professional card designs
- Contemporary color scheme

### 🎯 User Experience
- Intuitive navigation
- Quick view modals
- Wishlist functionality
- Rating system
- Mobile-responsive design
- Touch-friendly interactions

### 🚀 Performance
- No backend dependency
- Fast page loads
- Optimized images from CDN
- Smooth 60fps animations
- Minimal bundle size

## 📸 Screenshots

### Home Page
- **Hero Slider**: Full-screen rotating slides with art images
- **Categories**: Grid of 3 art categories (Paintings, Sculptures, Mixed Media)
- **Gallery**: Responsive grid of 8 featured artworks

### Features
- **Quick View**: Modal with detailed artwork information
- **Wishlist**: Heart icon to save favorites
- **Ratings**: Star ratings for each artwork
- **Responsive**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Custom CSS (Modern practices)
- **Images**: Unsplash CDN
- **Build Tool**: Vue CLI

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd vue-oag-frontend

# Install dependencies
npm install

# Start development server
npm run serve
```

The application will be available at `http://localhost:8080`

## 🎮 Usage

### Development
```bash
# Start dev server with hot-reload
npm run serve

# Build for production
npm run build

# Lint and fix files
npm run lint
```

### Testing
```bash
# Run unit tests (if configured)
npm run test

# Run e2e tests (if configured)
npm run test:e2e
```

## 📁 Project Structure

```
vue-oag-frontend/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   │   ├── CardSlider.vue       # Hero slider
│   │   ├── ArtworkCategory.vue  # Category section
│   │   └── ...
│   ├── views/           # Page components
│   │   ├── HomeView.vue         # Home page
│   │   └── Artwork/
│   │       └── ArtworkList.vue  # Gallery grid
│   ├── stores/          # Pinia stores
│   │   └── artwork.js           # Artwork store with dummy data
│   ├── router/          # Vue Router config
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── public/              # Public assets
├── .env.development     # Dev environment variables
├── .env.production      # Prod environment variables
└── package.json         # Dependencies
```

## 🎨 Dummy Data

The application currently uses dummy data with 8 artworks:

1. **Starry Night Dreams** - $2,500 (Painting)
2. **Urban Symphony** - $3,200 (Painting)
3. **Ethereal Bloom** - $1,800 (Painting)
4. **Modern Sculpture** - $4,500 (Sculpture)
5. **Ocean Whispers** - $2,800 (Painting)
6. **Abstract Fusion** - $3,500 (Mixed Art)
7. **Golden Hour** - $2,200 (Painting)
8. **Minimalist Form** - $3,800 (Sculpture)

All images are sourced from Unsplash for high-quality, professional appearance.

## 🔧 Configuration

### Environment Variables

Backend integration is currently disabled. To enable in Phase 3:

```env
# Uncomment these in .env.development
VUE_APP_API_BASE_URL=http://localhost:8082/api
VUE_APP_SOCKET_URL=http://localhost:8082
VUE_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Customization

#### Change Artworks
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

#### Change Hero Slides
Edit `src/components/CardSlider.vue`:
```javascript
const slides = [
  {
    image: 'https://your-image-url.com',
    title: 'Your Title',
    subtitle: 'Your Subtitle',
    link: '/your-link',
    btnText: 'Your Button'
  }
];
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎯 Key Components

### CardSlider (Hero)
- Auto-play slider with 5-second intervals
- Manual navigation (prev/next buttons)
- Dot indicators
- Smooth fade-in animations

### ArtworkCategory
- Grid layout with 3 categories
- Hover overlay effects
- Direct links to collections

### ArtworkList (Gallery)
- Responsive grid (auto-fit)
- Hover effects (lift + zoom)
- Quick view modal
- Wishlist functionality

## 📚 Documentation

Comprehensive documentation is available:

- **[QUICKSTART_MODERN.md](QUICKSTART_MODERN.md)** - Quick start guide
- **[PHASE3_PREPARATION.md](PHASE3_PREPARATION.md)** - Technical details
- **[MODERNIZATION_SUMMARY.md](MODERNIZATION_SUMMARY.md)** - Feature overview
- **[DESIGN_COMPARISON.md](DESIGN_COMPARISON.md)** - Before/after comparison
- **[IMAGE_REFERENCE.md](IMAGE_REFERENCE.md)** - Image URLs and sources
- **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Testing guide
- **[MODERNIZATION_COMPLETE.md](MODERNIZATION_COMPLETE.md)** - Complete summary

## 🚀 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Output will be in dist/ folder
```

### Deploy to Hosting

The `dist/` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

## 🔄 Phase 3 Integration

When ready to integrate backend:

1. Uncomment backend URLs in `.env` files
2. Update `src/stores/artwork.js` to use API calls
3. Replace dummy data with real backend responses
4. Implement authentication
5. Add image upload functionality
6. Connect payment system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

[Your License Here]

## 👥 Team

[Your Team Information]

## 📞 Support

For issues or questions:
- Check documentation files
- Review code comments
- Open an issue on GitHub
- Contact the development team

## 🎉 Acknowledgments

- **Images**: [Unsplash](https://unsplash.com)
- **Framework**: [Vue.js](https://vuejs.org)
- **State Management**: [Pinia](https://pinia.vuejs.org)

## 📊 Status

- ✅ **Phase 1**: Setup Complete
- ✅ **Phase 2**: Frontend Development Complete
- 🔄 **Phase 3**: Backend Integration (Pending)

## 🔗 Links

- [Vue 3 Documentation](https://vuejs.org)
- [Pinia Documentation](https://pinia.vuejs.org)
- [Vue Router Documentation](https://router.vuejs.org)
- [Unsplash](https://unsplash.com)

---

**Version**: 3.0.0 (Modernized)  
**Last Updated**: 2024  
**Status**: ✅ Ready for Development & Testing
