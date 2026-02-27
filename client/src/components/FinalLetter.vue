<script setup lang="ts">
import { loveData } from "@/data/love";
import { useReveal } from "@/composables/useReveal";
import { shootConfetti } from "@/utils/confetti";

const { el, isVisible } = useReveal<HTMLElement>({ threshold: 0.15, once: true });

function openLetter() {
  const dialog = document.getElementById("letter_modal") as HTMLDialogElement | null;
  dialog?.showModal();

  // лёгкий “вау” эффект
  shootConfetti({ durationMs: 1500, count: 160 });
}
</script>

<template>
  <section class="py-20">
    <div class="mx-auto max-w-5xl px-4">
      <div
        ref="el"
        class="transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body gap-6">
            <div class="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold">И напоследок…</h2>
                <p class="opacity-70 mt-2">У меня есть кое-что важное для тебя 💌</p>
              </div>

              <div class="flex gap-2">
                <span class="badge badge-primary">финал</span>
                <span class="badge badge-secondary">❤️</span>
              </div>
            </div>

            <div class="alert bg-base-100/70">
              <span class="opacity-80">
                Нажми кнопку — откроется письмо. Его можно читать сколько угодно раз 🙂
              </span>
            </div>

            <div class="card-actions justify-center">
              <button class="btn btn-primary btn-wide" @click="openLetter">
                Открыть письмо
              </button>
            </div>

            <div class="text-center opacity-60 text-sm">
              P.S. Можно отправить ссылку и добавить QR-код к букету 🌸
            </div>
          </div>
        </div>

        <!-- Modal -->
        <dialog id="letter_modal" class="modal">
          <div class="modal-box max-w-2xl">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-xl sm:text-2xl font-bold">{{ loveData.letterTitle }}</h3>
                <p class="opacity-70 mt-1">для: {{ loveData.name }}</p>
              </div>

              <form method="dialog">
                <button class="btn btn-ghost btn-sm" aria-label="close">✕</button>
              </form>
            </div>

            <div class="divider my-4"></div>

            <div class="prose max-w-none">
              <!-- preserve new lines -->
              <p class="whitespace-pre-line leading-relaxed">
                {{ loveData.letterText }}
              </p>
            </div>

            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Закрыть</button>
              </form>
            </div>
          </div>

          <form method="dialog" class="modal-backdrop">
            <button aria-label="backdrop">close</button>
          </form>
        </dialog>
      </div>
    </div>
  </section>
</template>
