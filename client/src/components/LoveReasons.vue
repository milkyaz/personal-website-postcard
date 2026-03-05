<script setup lang="ts">
import { computed } from "vue";
import { loveData } from "@/data/love";
import { useReveal } from "@/composables/useReveal";

type ReasonItem = {
  title: string;
  tags?: string[];
};

const { el, isVisible } = useReveal<HTMLElement>({ threshold: 0.15, once: true });

const reasons = computed(() =>
  Object.values(loveData.reasons as Record<string, ReasonItem>).map((reason) => ({
    title: reason.title,
    tags: reason.tags ?? [],
  })),
);
</script>

<template>
  <section class="py-16">
    <div class="mx-auto max-w-5xl px-4">
      <div
        ref="el"
        class="transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div class="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold">За что я тебя люблю</h2>
            <p class="opacity-70 mt-2">На самом деле список бесконечный 😊</p>
          </div>

          <div class="hidden sm:flex gap-2">
            <span class="badge badge-ghost">frontend edition</span>
            <span class="badge badge-primary">❤️</span>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(reason, idx) in reasons"
            :key="reason.title"
            class="card bg-base-200/70 backdrop-blur hover:shadow-xl transition-shadow"
          >
            <div class="card-body">
              <div class="flex items-center justify-between">
                <div class="badge badge-secondary">#{{ idx + 1 }}</div>
                <div class="opacity-60 text-sm">100%</div>
              </div>
              <p class="text-base leading-relaxed mt-2">
                {{ reason.title }}
              </p>
              <div class="mt-3 flex gap-2 flex-wrap opacity-70">
                <span v-for="tag in reason.tags" :key="`${reason.title}-${tag}`" class="badge badge-outline">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <div class="alert bg-base-200/60">
            <span class="opacity-80"
            >Если коротко: ты — мой любимый человек. Если длинно — это весь сайт 💌</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
