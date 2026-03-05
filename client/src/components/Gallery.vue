<script setup lang="ts">
import { computed, ref } from "vue";
import { loveData } from "@/data/love";
import { useReveal } from "@/composables/useReveal";
import { toPublicUrl } from "@/utils/publicPath";

const { el, isVisible } = useReveal<HTMLElement>({ threshold: 0.15, once: true });

const photos = computed(() => loveData.photos ?? []);

const selectedIndex = ref<number | null>(null);

const selectedPhoto = computed(() => {
  if (selectedIndex.value === null) return null;
  return photos.value[selectedIndex.value] ?? null;
});

function photoUrl(src: string) {
  return toPublicUrl(src);
}

function open(index: number) {
  selectedIndex.value = index;
  (document.getElementById("photo_modal") as HTMLDialogElement | null)?.showModal();
}

function close() {
  (document.getElementById("photo_modal") as HTMLDialogElement | null)?.close();
  selectedIndex.value = null;
}

function prev() {
  if (selectedIndex.value === null) return;
  selectedIndex.value = (selectedIndex.value - 1 + photos.value.length) % photos.value.length;
}

function next() {
  if (selectedIndex.value === null) return;
  selectedIndex.value = (selectedIndex.value + 1) % photos.value.length;
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
            <h2 class="text-2xl sm:text-3xl font-bold">Наши моменты</h2>
            <p class="opacity-70 mt-2">Нажми на фото, чтобы открыть крупно ✨</p>
          </div>
          <div class="hidden sm:flex gap-2">
            <span class="badge badge-ghost">memories</span>
            <span class="badge badge-primary">📷</span>
          </div>
        </div>

        <div v-if="photos.length" class="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          <button
            v-for="(src, idx) in photos"
            :key="src + idx"
            class="group relative overflow-hidden rounded-2xl bg-base-200 shadow-lg"
            type="button"
            @click="open(idx)"
          >
            <img
              :src="photoUrl(src)"
              alt="photo"
              class="h-36 sm:h-44 lg:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              loading="lazy"
            />

            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-base-300/60 via-transparent to-transparent"
            />

            <div
              class="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <span class="badge badge-secondary">#{{ idx + 1 }}</span>
              <span class="badge badge-outline">открыть</span>
            </div>
          </button>
        </div>

        <div v-else class="alert bg-base-200/60">
          <span class="opacity-80">
            Фото пока не добавлены. Положи картинки в <b>public/photos</b> и пропиши пути в <b>loveData.photos</b>.
          </span>
        </div>

        <!-- Modal -->
        <dialog id="photo_modal" class="modal" @close="close">
          <div class="modal-box p-3 sm:p-4 max-w-4xl">
            <div class="flex items-center justify-between gap-2 px-1 pb-2">
              <div class="flex items-center gap-2">
                <span class="badge badge-primary">Фото</span>
                <span class="opacity-70 text-sm" v-if="selectedIndex !== null">
                  {{ selectedIndex + 1 }} / {{ photos.length }}
                </span>
              </div>

              <form method="dialog">
                <button class="btn btn-ghost btn-sm" aria-label="close" @click="close">✕</button>
              </form>
            </div>

            <div class="relative rounded-2xl overflow-hidden bg-base-200">
              <img
                v-if="selectedPhoto"
                :src="photoUrl(selectedPhoto)"
                alt="selected"
                class="w-full max-h-[70svh] object-contain"
              />

              <button
                v-if="photos.length > 1"
                type="button"
                class="btn btn-circle btn-ghost absolute left-2 top-1/2 -translate-y-1/2"
                @click="prev"
                aria-label="previous"
              >
                ❮
              </button>

              <button
                v-if="photos.length > 1"
                type="button"
                class="btn btn-circle btn-ghost absolute right-2 top-1/2 -translate-y-1/2"
                @click="next"
                aria-label="next"
              >
                ❯
              </button>
            </div>

            <div class="modal-action mt-3">
              <button class="btn btn-outline" type="button" @click="prev" :disabled="photos.length < 2">Назад</button>
              <button class="btn btn-primary" type="button" @click="next" :disabled="photos.length < 2">Дальше</button>
              <form method="dialog">
                <button class="btn" @click="close">Закрыть</button>
              </form>
            </div>
          </div>

          <!-- backdrop -->
          <form method="dialog" class="modal-backdrop">
            <button aria-label="backdrop" @click="close">close</button>
          </form>
        </dialog>
      </div>
    </div>
  </section>
</template>
