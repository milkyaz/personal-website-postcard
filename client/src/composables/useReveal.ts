import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

type Options = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useReveal<T extends HTMLElement>(options: Options = {}) {
  const el = ref<T | null>(null) as Ref<T | null>;
  const isVisible = ref(false);

  const {
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.1,
    once = true,
  } = options;

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          isVisible.value = true;
          if (once) observer?.disconnect();
        } else if (!once) {
          isVisible.value = false;
        }
      },
      { rootMargin, threshold }
    );

    if (el.value) observer.observe(el.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
  });

  return { el, isVisible };
}
