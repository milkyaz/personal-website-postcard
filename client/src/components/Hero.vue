<script setup lang="ts">
import { computed } from "vue";
import { loveData } from "@/data/love";
import { daysBetween } from "@/utils/date";

const daysTogether = computed(() => daysBetween(loveData.togetherSince));

function scrollToContent() {
  const el = document.querySelector("#content");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <section class="mt-10">
    <div class="w-full flex flex-row justify-center">
      <div class="mx-auto max-w-3xl px-4">
        <div class="card bg-base-200/70 backdrop-blur shadow-xl">
          <div class="card-body gap-6">
            <div class="flex items-center justify-between gap-4">
              <div class="badge badge-primary badge-lg">8 марта</div>
              <div class="opacity-70 text-sm">для: {{ loveData.name }}</div>
            </div>

            <div class="space-y-3">
              <h1 class="text-3xl sm:text-5xl font-bold leading-tight">
                {{ loveData.title }}
              </h1>
              <p class="text-base sm:text-lg opacity-80">
                {{ loveData.subtitle }}
              </p>
            </div>

            <div class="stats stats-vertical sm:stats-horizontal shadow bg-base-100">
              <div class="stat">
                <div class="stat-title">Мы вместе</div>
                <div class="stat-value text-3xl sm:text-4xl">
                  {{ daysTogether }}
                </div>
                <div class="stat-desc">дней</div>
              </div>

              <div class="stat">
                <div class="stat-title">Сегодня</div>
                <div class="stat-value text-3xl sm:text-4xl">❤️</div>
                <div class="stat-desc">только для тебя</div>
              </div>
            </div>

            <div class="card-actions justify-between items-center">
              <button class="btn btn-primary" @click="scrollToContent">
                Открыть
              </button>

              <div class="flex items-center gap-2 opacity-70">
                <span class="loading loading-dots loading-sm"></span>
                <span class="text-sm">листай ниже</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 text-center opacity-60 text-sm">
          Сделано с любовью и фронтендом ✨
        </div>
      </div>
    </div>
  </section>
</template>
