<template>
  <div class="all-gallery">
    <!-- Hero -->
    <div class="all-gallery__hero">
      <div class="all-gallery__hero-bg"></div>
      <div class="all-gallery__hero-content">
        <h1 class="all-gallery__hero-title">Art Gallery</h1>
        <p class="all-gallery__hero-sub">Explore {{ artworkStore.artworks.length }} extraordinary works</p>
        <!-- Search -->
        <div class="all-gallery__search">
          <i class="fas fa-search"></i>
          <input v-model="search" type="text" placeholder="Search by title, artist or category…" />
          <button v-if="search" @click="search = ''" class="all-gallery__search-clear"><i class="fas fa-times"></i></button>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="all-gallery__toolbar">
      <div class="all-gallery__toolbar-inner">
        <div class="all-gallery__cats">
          <button
            v-for="cat in categories"
            :key="cat"
            class="all-gallery__cat"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>
        <div class="all-gallery__toolbar-right">
          <span class="all-gallery__count">{{ filteredArtworks.length }} works</span>
          <select v-model="sortBy" class="all-gallery__sort">
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Masonry Grid -->
    <div class="all-gallery__masonry">
      <article
        v-for="artwork in filteredArtworks"
        :key="artwork.id"
        class="mcard"
        @click="openModal(artwork)"
      >
        <div class="mcard__img-wrap">
          <img :src="artwork.imageUrl" :alt="artwork.artworkName" class="mcard__img" loading="lazy" />
          <div class="mcard__overlay">
            <div class="mcard__overlay-content">
              <span class="mcard__overlay-cat">{{ artwork.artworkCategory }}</span>
              <h3 class="mcard__overlay-title">{{ artwork.artworkName }}</h3>
              <p class="mcard__overlay-artist">by {{ artwork.artist }}</p>
              <div class="mcard__overlay-actions">
                <span class="mcard__overlay-price">{{ artwork.price }}</span>
                <button class="mcard__overlay-btn" @click.stop="addToCart(artwork)">
                  <i class="fas fa-shopping-bag"></i>
                </button>
                <button class="mcard__overlay-btn mcard__overlay-btn--wish" @click.stop>
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
          <span v-if="artwork.isNew" class="mcard__new">New</span>
        </div>
      </article>
    </div>

    <!-- Empty -->
    <div v-if="filteredArtworks.length === 0" class="all-gallery__empty">
      <i class="fas fa-search"></i>
      <p>No artworks match your search.</p>
      <button @click="search = ''; activeCategory = 'All'" class="all-gallery__reset">Clear filters</button>
    </div>

    <!-- Modal -->
    <transition name="modal-fade">
      <div v-if="selectedArtwork" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-box">
          <button class="modal-box__close" @click="closeModal"><i class="fas fa-times"></i></button>
          <div class="modal-box__grid">
            <div class="modal-box__img-wrap">
              <img :src="selectedArtwork.imageUrl" :alt="selectedArtwork.artworkName" />
            </div>
            <div class="modal-box__info">
              <span class="modal-box__cat">{{ selectedArtwork.artworkCategory }}</span>
              <h2 class="modal-box__title">{{ selectedArtwork.artworkName }}</h2>
              <p class="modal-box__artist"><i class="fas fa-user-circle"></i> {{ selectedArtwork.artist }} · {{ selectedArtwork.year }}</p>
              <p class="modal-box__desc">{{ selectedArtwork.artworkDescription }}</p>
              <div class="modal-box__specs">
                <div class="spec"><i class="fas fa-ruler-combined"></i><span>{{ selectedArtwork.size }}</span></div>
                <div class="spec"><i class="fas fa-star" style="color:#f59e0b"></i><span>{{ selectedArtwork.averageRating }} / 5</span></div>
              </div>
              <div class="modal-box__price">{{ selectedArtwork.price }}</div>
              <div class="modal-box__actions">
                <button class="modal-btn modal-btn--primary" @click="addToCart(selectedArtwork); closeModal()">
                  <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
                <button class="modal-btn modal-btn--ghost"><i class="fas fa-heart"></i> Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <FooterView />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useArtworkStore } from '@/stores/artwork';
import FooterView from '@/components/FooterView.vue';

const artworkStore = useArtworkStore();
const categories = ['All', ...new Set(artworkStore.artworks.map(a => a.artworkCategory))];
const activeCategory = ref('All');
const sortBy = ref('default');
const search = ref('');
const selectedArtwork = ref(null);

const filteredArtworks = computed(() => {
  let list = activeCategory.value === 'All'
    ? [...artworkStore.artworks]
    : artworkStore.artworks.filter(a => a.artworkCategory === activeCategory.value);

  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    list = list.filter(a =>
      a.artworkName.toLowerCase().includes(q) ||
      a.artist.toLowerCase().includes(q) ||
      a.artworkCategory.toLowerCase().includes(q)
    );
  }

  if (sortBy.value === 'price-asc') list.sort((a, b) => parseFloat(a.price.replace(/\D/g,'')) - parseFloat(b.price.replace(/\D/g,'')));
  else if (sortBy.value === 'price-desc') list.sort((a, b) => parseFloat(b.price.replace(/\D/g,'')) - parseFloat(a.price.replace(/\D/g,'')));
  else if (sortBy.value === 'rating') list.sort((a, b) => b.averageRating - a.averageRating);
  else if (sortBy.value === 'newest') list.sort((a, b) => b.year - a.year);
  return list;
});

function openModal(artwork) {
  selectedArtwork.value = artwork;
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  selectedArtwork.value = null;
  document.body.style.overflow = '';
}
function addToCart(artwork) {
  alert(`"${artwork.artworkName}" added to cart!`);
}
</script>

<style scoped>
/* ── Hero ── */
.all-gallery__hero {
  position: relative;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}
.all-gallery__hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80') center/cover no-repeat;
}
.all-gallery__hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(17,24,39,0.85) 0%, rgba(99,102,241,0.7) 100%);
}
.all-gallery__hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem;
  width: 100%;
  max-width: 700px;
}
.all-gallery__hero-title {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  letter-spacing: -1px;
}
.all-gallery__hero-sub { color: rgba(255,255,255,0.75); font-size: 1.05rem; margin: 0; }

/* Search */
.all-gallery__search {
  position: relative;
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
}
.all-gallery__search i {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  font-size: 0.9rem;
}
.all-gallery__search input {
  width: 100%;
  padding: 0.85rem 3rem 0.85rem 2.75rem;
  border-radius: 14px;
  border: none;
  font-size: 0.95rem;
  background: rgba(255,255,255,0.95);
  color: #111827;
  outline: none;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.all-gallery__search-clear {
  position: absolute;
  right: 0.85rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 0.9rem;
}

/* ── Toolbar ── */
.all-gallery__toolbar {
  background: #fff;
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 72px;
  z-index: 100;
}
.all-gallery__toolbar-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.all-gallery__cats {
  display: flex;
  gap: 0.3rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.all-gallery__cats::-webkit-scrollbar { display: none; }
.all-gallery__cat {
  padding: 0.38rem 1rem;
  border-radius: 999px;
  border: 1.5px solid #e5e7eb;
  background: none;
  font-size: 0.82rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}
.all-gallery__cat.active, .all-gallery__cat:hover {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: transparent;
  color: #fff;
}
.all-gallery__toolbar-right { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
.all-gallery__count { font-size: 0.85rem; color: #9ca3af; white-space: nowrap; }
.all-gallery__sort {
  padding: 0.4rem 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #374151;
  background: #fff;
  outline: none;
  cursor: pointer;
}

/* ── Masonry Grid ── */
.all-gallery__masonry {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
  columns: 4;
  column-gap: 1.25rem;
}

/* ── Masonry Card ── */
.mcard {
  break-inside: avoid;
  margin-bottom: 1.25rem;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.mcard__img-wrap {
  position: relative;
  overflow: hidden;
}
.mcard__img {
  width: 100%;
  display: block;
  transition: transform 0.5s ease;
}
.mcard:hover .mcard__img { transform: scale(1.05); }

.mcard__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.35s ease;
  display: flex;
  align-items: flex-end;
}
.mcard:hover .mcard__overlay { opacity: 1; }
.mcard__overlay-content {
  padding: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.mcard__overlay-cat {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a5b4fc;
}
.mcard__overlay-title {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.3;
}
.mcard__overlay-artist { font-size: 0.78rem; color: rgba(255,255,255,0.65); margin: 0; }
.mcard__overlay-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.mcard__overlay-price {
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  flex: 1;
}
.mcard__overlay-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.15);
  color: #fff;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}
.mcard__overlay-btn:hover { background: rgba(255,255,255,0.3); }
.mcard__overlay-btn--wish:hover { background: #ef4444; }

.mcard__new {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ── Empty ── */
.all-gallery__empty {
  text-align: center;
  padding: 5rem 1rem;
  color: #9ca3af;
}
.all-gallery__empty i { font-size: 3rem; margin-bottom: 1rem; display: block; }
.all-gallery__reset {
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

/* ── Modal ── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;
  backdrop-filter: blur(4px);
}
.modal-box {
  background: #fff;
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.modal-box__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
  font-size: 1rem;
  z-index: 10;
  transition: all 0.2s;
}
.modal-box__close:hover { background: #111827; color: #fff; transform: rotate(90deg); }
.modal-box__grid { display: grid; grid-template-columns: 1fr 1fr; }
.modal-box__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  display: block;
  min-height: 400px;
}
.modal-box__info { padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.modal-box__cat { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6366f1; }
.modal-box__title { font-size: 1.75rem; font-weight: 800; color: #111827; margin: 0; line-height: 1.2; }
.modal-box__artist { font-size: 0.875rem; color: #9ca3af; display: flex; align-items: center; gap: 0.4rem; margin: 0; }
.modal-box__desc { font-size: 0.95rem; color: #6b7280; line-height: 1.7; margin: 0; }
.modal-box__specs { display: flex; gap: 1.5rem; }
.spec { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280; }
.spec i { color: #6366f1; }
.modal-box__price { font-size: 2rem; font-weight: 900; color: #111827; }
.modal-box__actions { display: flex; gap: 0.75rem; margin-top: auto; }
.modal-btn {
  flex: 1;
  padding: 0.8rem;
  border-radius: 12px;
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}
.modal-btn--primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  box-shadow: 0 4px 14px rgba(99,102,241,0.35);
}
.modal-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(99,102,241,0.45); }
.modal-btn--ghost { background: #f3f4f6; color: #374151; }
.modal-btn--ghost:hover { background: #e5e7eb; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 1200px) { .all-gallery__masonry { columns: 3; } }
@media (max-width: 900px) {
  .all-gallery__masonry { columns: 2; }
  .modal-box__grid { grid-template-columns: 1fr; }
  .modal-box__img-wrap img { border-radius: 20px 20px 0 0; min-height: 260px; }
}
@media (max-width: 600px) {
  .all-gallery__masonry { columns: 1; padding: 1.5rem 1rem 3rem; }
  .all-gallery__toolbar-inner { flex-wrap: wrap; height: auto; padding: 0.75rem 1rem; }
  .modal-box__info { padding: 1.5rem; }
}
</style>
