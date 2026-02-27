<script setup lang="ts">
import Hero from "@/components/Hero.vue";
import Reasons from "@/components/Reasons.vue";
import Gallery from "@/components/Gallery.vue";
import Timeline from "@/components/Timeline.vue";
import FinalLetter from "@/components/FinalLetter.vue";
</script>

<template>
  <main class="min-h-screen">
    <Hero />

    <section id="content">
      <Reasons />
      <Gallery />
      <Timeline />
      <FinalLetter />
    </section>
  </main>
</template>
