<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import QRCode from "qrcode";

const props = defineProps<{
  url?: string;        // если не передашь, возьмём текущий location.href
  title?: string;
}>();

const dataUrl = ref<string>("");

async function generate() {
  const value = props.url || window.location.href;

  dataUrl.value = await QRCode.toDataURL(value, {
    margin: 1,
    width: 220,
    errorCorrectionLevel: "M",
  });
}

onMounted(generate);
watch(() => props.url, generate);
</script>

<template>
  <div class="card bg-base-200/70 backdrop-blur shadow-xl">
    <div class="card-body gap-4">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-lg font-semibold">{{ title ?? "QR-код" }}</h3>
        <span class="badge badge-primary">scan</span>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-4">
        <div class="rounded-2xl bg-base-100 p-3 shadow">
          <img v-if="dataUrl" :src="dataUrl" alt="QR Code" class="w-[220px] h-[220px]" />
          <div v-else class="w-[220px] h-[220px] grid place-items-center opacity-70">
            Генерируем…
          </div>
        </div>

        <div class="space-y-3">
          <p class="opacity-80">
            Отсканируй камерой телефона — откроется сайт-открытка.
          </p>

          <div class="mockup-code text-xs">
            <pre><code>{{ props.url || (typeof window !== 'undefined' ? window.location.href : '') }}</code></pre>
          </div>

          <div class="flex flex-wrap gap-2">
            <a
              class="btn btn-outline btn-sm"
              :href="props.url || (typeof window !== 'undefined' ? window.location.href : '')"
              target="_blank"
              rel="noreferrer"
            >
              Открыть ссылку
            </a>

            <button class="btn btn-primary btn-sm" type="button" @click="generate">
              Обновить QR
            </button>
          </div>

          <p class="text-xs opacity-60">
            Совет: после деплоя QR лучше генерировать на финальный домен (Vercel/Netlify).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
