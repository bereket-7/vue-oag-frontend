<template>
  <div class="gallery">
    <!-- Section Header -->
    <div class="gallery__header">
      <div class="gallery__header-inner">
        <div>
          <h2 class="gallery__title">
            Our <span class="gallery__title-accent">Collection</span>
          </h2>
          <p class="gallery__subtitle">{{ filteredArtworks.length }} curated works from world-class artists</p>
        </div>
        <div class="gallery__controls">
          <!-- Category pills -->
          <div class="gallery__cats">
            <button
              v-for="cat in categories"
              :key="cat"
              class="gallery__cat-btn"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >{{ cat }}</button>
          </div>
          <!-- View toggle -->
          <div class="gallery__view-toggle">
            <button :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'" title="Grid view">
              <i class="fas fa-th"></i>
            </button>
            <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'" title="List view">
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="gallery__grid">
      <article
        v-for="artwork in filteredArtworks"
        :key="artwork.id"
        class="gcard"
        @click="openModal(artwork)"
      >
        <div class="gcard__img-wrap">
          <img :src="artwork.imageUrl" :alt="artwork.artworkName" class="gcard__img" loading="lazy" />
          <div class="gcard__overlay">
            <button class="gcard__quick-btn"><i class="fas fa-eye"></i> Quick View</button>
            <button class="gcard__wish-btn" @click.stop><i class="fas fa-heart"></i></button>
          </div>
          <span v-if="artwork.isNew" class="gcard__new-tag">New</span>
        </div>
        <div class="gcard__body">
          <p class="gcard__cat">{{ artwork.artworkCategory }}</p>
          <h3 class="gcard__name">{{ artwork.artworkName }}</h3>
          <p class="gcard__artist">by {{ artwork.artist }}</p>
          <div class="gcard__footer">
            <span class="gcard__price">{{ artwork.price }}</span>
            <div class="gcard__rating">
              <i class="fas fa-star"></i> {{ artwork.averageRating }}
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- List View -->
    <div v-else class="gallery__list">
      <article
        v-for="artwork in filteredArtworks"
        :key="artwork.id"
        class="lcard"
        @click="openModal(artwork)"
      >
        <div class="lcard__img-wrap">
          <img :src="artwork.imageUrl" :alt="artwork.artworkName" class="lcard__img" loading="lazy" />
          <span v-if="artwork.isNew" class="gcard__new-tag">New</span>
        </div>
        <div class="lcard__body">
          <span class="lcard__cat">{{ artwork.artworkCategory }}</span>
          <h3 class="lcard__name">{{ artwork.artworkName }}</h3>
          <p class="lcard__desc">{{ artwork.artworkDescription }}</p>
          <p class="lcard__artist">by {{ artwork.artist }} · {{ artwork.year }}</p>
          <div class="lcard__footer">
            <span class="lcard__price">{{ artwork.price }}</span>
            <div class="lcard__rating"><i class="fas fa-star"></i> {{ artwork.averageRating }}</div>
            <button class="lcard__cart-btn" @click.stop="addToCart(artwork)">
              <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty -->
    <div v-if="filteredArtworks.length === 0" class="gallery__empty">
      <i class="fas fa-palette"></i>
      <p>No artworks found in this category.</p>
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
</template>

<script setup>
import { ref, computed } from 'vue';
import { useArtworkStore } from '@/stores/artwork';

const artworkStore = useArtworkStore();
const categories = ['All', ...new Set(artworkStore.artworks.map(a => a.artworkCategory))];
const activeCategory = ref('All');
const viewMode = ref('grid');
const selectedArtwork = ref(null);

const filteredArtworks = computed(() =>
  activeCategory.value === 'All'
    ? artworkStore.artworks
    : artworkStore.artworks.filter(a => a.artworkCategory === activeCategory.value)
);

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
/* ── Header ── */
.gallery__header {
  background: #fff;
  border-bottom: 1px solid #f3f4f6;
  padding: 2.5rem 0 0;
}
.gallery__header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem 1.25rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.gallery__title {
  font-size: 2.25rem;
  font-weight: 900;
  color: #111827;
  margin: 0 0 0.35rem;
  letter-spacing: -0.5px;
}
.gallery__title-accent {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gallery__subtitle { font-size: 0.9rem; color: #9ca3af; margin: 0; }

.gallery__controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.gallery__cats {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}
.gallery__cat-btn {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1.5px solid #e5e7eb;
  background: none;
  font-size: 0.82rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.gallery__cat-btn.active, .gallery__cat-btn:hover {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-color: transparent;
  color: #fff;
}
.gallery__view-toggle {
  display: flex;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}
.gallery__view-toggle button {
  padding: 0.4rem 0.75rem;
  border: none;
  background: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.gallery__view-toggle button.active { background: #6366f1; color: #fff; }

/* ── Grid ── */
.gallery__grid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* ── Grid Card ── */
.gcard {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.gcard:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.13); }
.gcard__img-wrap {
  position: relative;
  height: 240px;
  overflow: hidden;
}
.gcard__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.gcard:hover .gcard__img { transform: scale(1.06); }
.gcard__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.gcard:hover .gcard__overlay { opacity: 1; }
.gcard__quick-btn {
  padding: 0.55rem 1.4rem;
  background: #fff;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.gcard__wish-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 1.5px solid rgba(255,255,255,0.5);
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}
.gcard__wish-btn:hover { background: #ef4444; border-color: #ef4444; }
.gcard__new-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.gcard__body { padding: 1rem 1.1rem 1.2rem; }
.gcard__cat { font-size: 0.72rem; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 0.3rem; }
.gcard__name { font-size: 1rem; font-weight: 700; color: #111827; margin: 0 0 0.2rem; }
.gcard__artist { font-size: 0.8rem; color: #9ca3af; margin: 0 0 0.85rem; }
.gcard__footer { display: flex; justify-content: space-between; align-items: center; }
.gcard__price { font-size: 1.1rem; font-weight: 800; color: #6366f1; }
.gcard__rating { font-size: 0.8rem; color: #f59e0b; font-weight: 600; display: flex; align-items: center; gap: 3px; }

/* ── List View ── */
.gallery__list {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.lcard {
  display: grid;
  grid-template-columns: 200px 1fr;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.lcard:hover { transform: translateX(4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.lcard__img-wrap { position: relative; height: 160px; }
.lcard__img { width: 100%; height: 100%; object-fit: cover; }
.lcard__body { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.35rem; }
.lcard__cat { font-size: 0.72rem; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.08em; }
.lcard__name { font-size: 1.1rem; font-weight: 700; color: #111827; margin: 0; }
.lcard__desc { font-size: 0.875rem; color: #6b7280; line-height: 1.5; margin: 0; flex: 1; }
.lcard__artist { font-size: 0.8rem; color: #9ca3af; }
.lcard__footer { display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; }
.lcard__price { font-size: 1.15rem; font-weight: 800; color: #6366f1; }
.lcard__rating { font-size: 0.8rem; color: #f59e0b; font-weight: 600; display: flex; align-items: center; gap: 3px; }
.lcard__cart-btn {
  margin-left: auto;
  padding: 0.5rem 1.1rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
.lcard__cart-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,0.35); }

/* ── Empty ── */
.gallery__empty { text-align: center; padding: 5rem 1rem; color: #9ca3af; }
.gallery__empty i { font-size: 3rem; margin-bottom: 1rem; display: block; }

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
@media (max-width: 900px) {
  .modal-box__grid { grid-template-columns: 1fr; }
  .modal-box__img-wrap img { border-radius: 20px 20px 0 0; min-height: 260px; }
}
@media (max-width: 768px) {
  .gallery__header-inner { flex-direction: column; align-items: flex-start; }
  .gallery__grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); padding: 1.5rem 1rem 3rem; }
  .lcard { grid-template-columns: 140px 1fr; }
  .lcard__img-wrap { height: 130px; }
}
@media (max-width: 480px) {
  .gallery__grid { grid-template-columns: 1fr; }
  .lcard { grid-template-columns: 1fr; }
  .lcard__img-wrap { height: 200px; }
}
</style>
