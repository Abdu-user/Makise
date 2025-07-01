import type { RouterConfig } from "@nuxt/schema";

const routerOptions = {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return false;
  },
} satisfies RouterConfig;

export default routerOptions;
