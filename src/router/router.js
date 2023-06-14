import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from './utils/auth'; 

const routes = [
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = getToken();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next('/userLogin');
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router;
