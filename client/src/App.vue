<script setup lang="ts">
import { ref } from "vue";
import Hero from "@/components/Hero.vue";
import LoveReasons from "@/components/LoveReasons.vue";
import Gallery from "@/components/Gallery.vue";
import Timeline from "@/components/Timeline.vue";
import FinalLetter from "@/components/FinalLetter.vue";

const PASSCODE = "1309";
const enteredCode = ref("");
const isUnlocked = ref(false);
const hasError = ref(false);

function onCodeInput() {
  enteredCode.value = enteredCode.value.replace(/\D/g, "").slice(0, 4);
  if (hasError.value) hasError.value = false;
}

function unlock() {
  if (enteredCode.value === PASSCODE) {
    isUnlocked.value = true;
    hasError.value = false;
    return;
  }
  hasError.value = true;
  enteredCode.value = "";
}
</script>

<template>
  <div data-theme="march" class="min-h-screen text-base-content relative overflow-hidden app-bg">
    <!-- виньетка (затемнение краёв) -->
    <div class="pointer-events-none fixed inset-0
             bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    <main v-if="isUnlocked" class="relative">
      <Hero />
      <section id="content">
        <LoveReasons />
        <Gallery />
        <Timeline />
        <FinalLetter />
      </section>
    </main>
    <main v-else class="relative min-h-screen grid place-items-center px-4">
      <section class="w-full max-w-sm rounded-2xl bg-base-200/80 backdrop-blur p-6 shadow-xl border border-base-100/20">
        <h1 class="text-2xl font-bold">Введи код</h1>
        <p class="mt-2 mb-2 opacity-80">Чтобы открыть сайт, введи пароль из 4 цифр.</p>
        <label class="form-control mt-5 w-full">
          <input
            v-model="enteredCode"
            type="password"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="4"
            placeholder="введите пароль"
            class="input input-bordered w-full text-center tracking-[0.4em] text-lg"
            @input="onCodeInput"
            @keyup.enter="unlock"
          />
        </label>
        <p v-if="hasError" class="mt-2 text-sm text-error">Неверный код</p>
        <button type="button" class="btn btn-primary w-full mt-4" @click="unlock">
          Открыть
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped>
  @reference "./assets/main.css";

   .app-bg {
    @apply  bg-[radial-gradient(circle_at_center,#2f4f3e_0%,#244233_55%,#1b3328_100%)];
   }

</style>
