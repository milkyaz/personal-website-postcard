<script setup lang="ts">
import { computed } from "vue";
import { loveData } from "@/data/love";
import { useReveal } from "@/composables/useReveal";

type Item = { date: string; title: string; text: string };

const { el, isVisible } = useReveal<HTMLElement>({ threshold: 0.15, once: true });

const items = computed<Item[]>(() => loveData.timeline ?? []);

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  // "12 июня 2021"
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
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
            <h2 class="text-2xl sm:text-3xl font-bold">Наша история</h2>
            <p class="opacity-70 mt-2">Несколько важных точек, которые я люблю вспоминать</p>
          </div>
          <div class="hidden sm:flex gap-2">
            <span class="badge badge-ghost">timeline</span>
            <span class="badge badge-primary">✨</span>
          </div>
        </div>

        <div v-if="items.length" class="space-y-4">
          <div
            v-for="(it, idx) in items"
            :key="it.date + idx"
            class="card bg-base-200/70 backdrop-blur shadow-lg"
          >
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <div class="badge badge-secondary">#{{ idx + 1 }}</div>
                  <h3 class="text-lg sm:text-xl font-semibold">{{ it.title }}</h3>
                </div>

                <div class="badge badge-outline opacity-80">
                  {{ formatDate(it.date) }}
                </div>
              </div>

              <p class="mt-2 leading-relaxed opacity-90">
                {{ it.text }}
              </p>

              <div class="mt-3 flex flex-wrap gap-2 opacity-70">
                <span class="badge badge-ghost">память</span>
                <span class="badge badge-ghost">тепло</span>
                <span class="badge badge-ghost">мы</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="alert bg-base-200/60">
          <span class="opacity-80">
            Таймлайн пока пустой — добавь события в <b>loveData.timeline</b>.
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
