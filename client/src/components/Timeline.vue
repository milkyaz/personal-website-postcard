<script setup lang="ts">
import { computed, ref } from "vue";
import { loveData } from "@/data/love";
import { useReveal } from "@/composables/useReveal";

type Item = { date: string; title: string; text: string; photos?: string[], tags?: string[] };

const { el, isVisible } = useReveal<HTMLElement>({ threshold: 0.15, once: true });

const items = computed<Item[]>(() => loveData.timeline ?? []);
const selectedPhoto = ref<string | null>(null);
const selectedTitle = ref<string>("");

function openPhoto(photo: string, title: string) {
  selectedPhoto.value = photo;
  selectedTitle.value = title;
  (document.getElementById("timeline_photo_modal") as HTMLDialogElement | null)?.showModal();
}

function closePhoto() {
  (document.getElementById("timeline_photo_modal") as HTMLDialogElement | null)?.close();
  selectedPhoto.value = null;
  selectedTitle.value = "";
}

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

              <div v-if="it.photos?.length" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <button
                  v-for="(photo, photoIdx) in it.photos"
                  :key="`${it.date}-${photoIdx}`"
                  type="button"
                  class="group overflow-hidden rounded-xl shadow-md"
                  @click="openPhoto(photo, `${it.title} ${photoIdx + 1}`)"
                >
                  <img
                    :src="photo"
                    :alt="`${it.title} ${photoIdx + 1}`"
                    class="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-44"
                    loading="lazy"
                  />
                </button>
              </div>
              <div class="mt-3 flex flex-row flex-wrap gap-2 opacity-70">
                <span v-for="el in it.tags" class="badge badge-ghost">{{el}}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="alert bg-base-200/60">
          <span class="opacity-80">
            Таймлайн пока пустой — добавь события в <b>loveData.timeline</b>.
          </span>
        </div>
        <dialog id="timeline_photo_modal" class="modal" @close="closePhoto">
          <div class="modal-box p-3 sm:p-4 max-w-4xl">
            <div class="flex items-center justify-between gap-2 px-1 pb-2">
              <span class="badge badge-primary">Фото</span>
              <form method="dialog">
                <button class="btn btn-ghost btn-sm" aria-label="close" @click="closePhoto">✕</button>
              </form>
            </div>
            <div class="rounded-2xl overflow-hidden bg-base-200">
              <img
                v-if="selectedPhoto"
                :src="selectedPhoto"
                :alt="selectedTitle || 'selected timeline photo'"
                class="w-full max-h-[70svh] object-contain"
              />
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button aria-label="backdrop" @click="closePhoto">close</button>
          </form>
        </dialog>
      </div>
    </div>
  </section>
</template>
