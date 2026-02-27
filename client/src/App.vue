<script setup lang="ts">
import Hero from "@/components/Hero.vue";
import Reasons from "@/components/Reasons.vue";
import Gallery from "@/components/Gallery.vue";
</script>

<template>
  <main class="min-h-screen">
    <Hero />

    <section id="content">
      <Reasons />
      <Gallery />

      <section class="py-16">
        <div class="mx-auto max-w-5xl px-4">
          <div class="alert alert-info">
            <span>Дальше добавим: таймлайн и финальное письмо 💌</span>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
