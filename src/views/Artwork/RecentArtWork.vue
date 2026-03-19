<template>
  <div class="recent-page">
    <!-- Hero Banner -->
    <div class="recent-hero">
      <div class="recent-hero__bg"></div>
      <div class="recent-hero__content">
        <span class="recent-hero__badge"><i class="fas fa-fire"></i> Just Arrived</span>
        <h1 class="recent-hero__title">New Arts</h1>
        <p class="recent-hero__sub">Fresh works from our artists — added this month</p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-bar__inner">
        <div class="filter-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-tab"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>
        <div class="filter-bar__right">
          <span class="filter-count">{{ filteredArtworks.length }} works</span>
          <select v-model="sortBy" class="filter-select">
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="recent-grid">
      <article
        v-for="(artwork, i) in filteredArtworks"
        :key="artwork.id"
        class="art-card"
        :class="{ 'art-card--featured': i === 0 }"
        @click="openModal(artwork)"
      >
        <div class="art-card__img-wrap">
          <img :src="artwork.imageUrl" :alt="artwork.artworkName" class="art-card__img" loading="lazy" />
          <div class="art-card__overlay">
            <button class="art-card__view-btn"><i class="fas fa-expand-alt"></i> View</button>
          </div>
          <span class="art-card__badge">New</span>
          <span class="art-card__category">{{ artwork.artworkCategory }}</span>
        </div>
        <div class="art-card__body">
          <div class="art-card__meta">
            <span class="art-card__artist"><i class="fas fa-user-circle"></i> {{ artwork.artist }}</span>
            <div class="art-card__stars">
              <i v-for="s in 5" :key="s" class="fas fa-star" :class="{ dim: s > Math.round(artwork.averageRating) }"></i>
              <span>{{ artwork.averageRating }}</span>
            </div>
          </div>
          <h3 class="art-card__title">{{ artwork.artworkName }}</h3>
          <div class="art-card__footer">
            <span class="art-card__price">{{ artwork.price }}</span>
            <button class="art-card__cart-btn" @click.stop="addToCart(artwork)">
              <i class="fas fa-shopping-bag"></i>
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty state -->
    <div v-if="filteredArtworks.length === 0" class="empty-state">
      <i class="fas fa-palette"></i>
      <p>No artworks in this category yet.</p>
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
                <div class="spec">
                  <i class="fas fa-star" style="color:#f59e0b"></i>
                  <span>{{ selectedArtwork.averageRating }} / 5</span>
                </div>
              </div>
              <div class="modal-box__price">{{ selectedArtwork.price }}</div>
              <div class="modal-box__actions">
                <button class="modal-btn modal-btn--primary" @click="addToCart(selectedArtwork); closeModal()">
                  <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
                <button class="modal-btn modal-btn--ghost">
                  <i class="fas fa-heart"></i> Wishlist
                </button>
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

// Only show artworks marked as new
const allNew = artworkStore.artworks.filter(a => a.isNew);

const categories = ['All', ...new Set(allNew.map(a => a.artworkCategory))];
const activeCategory = ref('All');
const sortBy = ref('newest');
const selectedArtwork = ref(null);

const filteredArtworks = computed(() => {
  let list = activeCategory.value === 'All'
    ? [...allNew]
    : allNew.filter(a => a.artworkCategory === activeCategory.value);

  if (sortBy.value === 'price-asc') list.sort((a, b) => parseFloat(a.price.replace(/\D/g,'')) - parseFloat(b.price.replace(/\D/g,'')));
  else if (sortBy.value === 'price-desc') list.sort((a, b) => parseFloat(b.price.replace(/\D/g,'')) - parseFloat(a.price.replace(/\D/g,'')));
  else if (sortBy.value === 'rating') list.sort((a, b) => b.averageRating - a.averageRating);
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
.recent-hero {
  position: relative;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
}
.recent-hero__bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=80') center/cover no-repeat;
}
.recent-hero__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99,102,241,0.85), rgba(17,24,39,0.8));
}
.recent-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.recent-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  backdrop-filter: blur(8px);
}
.recent-hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  letter-spacing: -1px;
}
.recent-hero__sub {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  margin: 0;
}

/* ── Filter Bar ── */
.filter-bar {
  background: #fff;
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 72px;
  z-index: 100;
}
.filter-bar__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.filter-tabs {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.filter-tabs::-webkit-scrollbar { display: none; }
.filter-tab {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1.5px solid #e5e7eb;
  background: none;
  font-size: 0.85rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}
.filter-tab.active, .filter-tab:hover {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: transparent;
  color: #fff;
}
.filter-bar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}
.filter-count {
  font-size: 0.85rem;
  color: #9ca3af;
  white-space: nowrap;
}
.filter-select {
  padding: 0.4rem 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #374151;
  background: #fff;
  outline: none;
  cursor: pointer;
}

/* ── Grid ── */
.recent-grid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
}

/* ── Art Card ── */
.art-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.art-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.13);
}
.art-card--featured {
  grid-column: span 2;
}
.art-card__img-wrap {
  position: relative;
  height: 260px;
  overflow: hidden;
}
.art-card--featured .art-card__img-wrap { height: 380px; }
.art-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.art-card:hover .art-card__img { transform: scale(1.06); }

.art-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.art-card:hover .art-card__overlay { opacity: 1; }
.art-card__view-btn {
  padding: 0.6rem 1.5rem;
  background: #fff;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
}
.art-card__view-btn:hover { background: #f3f4f6; }

.art-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.art-card__category {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0,0,0,0.55);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}

.art-card__body { padding: 1.1rem 1.25rem 1.25rem; }
.art-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.art-card__artist {
  font-size: 0.8rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.art-card__stars {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.7rem;
  color: #f59e0b;
}
.art-card__stars .dim { color: #d1d5db; }
.art-card__stars span { color: #6b7280; font-size: 0.75rem; margin-left: 3px; }
.art-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.85rem;
  line-height: 1.3;
}
.art-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.art-card__price {
  font-size: 1.15rem;
  font-weight: 800;
  color: #6366f1;
}
.art-card__cart-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.art-card__cart-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(99,102,241,0.4);
}

/* ── Empty ── */
.empty-state {
  text-align: center;
  padding: 5rem 1rem;
  color: #9ca3af;
}
.empty-state i { font-size: 3rem; margin-bottom: 1rem; display: block; }

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
.modal-box__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.modal-box__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  display: block;
  min-height: 400px;
}
.modal-box__info {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.modal-box__cat {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6366f1;
}
.modal-box__title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}
.modal-box__artist {
  font-size: 0.875rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
}
.modal-box__desc {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
}
.modal-box__specs {
  display: flex;
  gap: 1.5rem;
}
.spec {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}
.spec i { color: #6366f1; }
.modal-box__price {
  font-size: 2rem;
  font-weight: 900;
  color: #111827;
}
.modal-box__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}
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
.modal-btn--ghost {
  background: #f3f4f6;
  color: #374151;
}
.modal-btn--ghost:hover { background: #e5e7eb; }

/* ── Transitions ── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .art-card--featured { grid-column: span 1; }
  .modal-box__grid { grid-template-columns: 1fr; }
  .modal-box__img-wrap img { border-radius: 20px 20px 0 0; min-height: 260px; }
}
@media (max-width: 640px) {
  .recent-grid { grid-template-columns: 1fr; padding: 1.5rem 1rem 3rem; }
  .filter-bar__inner { flex-wrap: wrap; height: auto; padding: 0.75rem 1rem; }
  .modal-box__info { padding: 1.5rem; }
}
</style>
