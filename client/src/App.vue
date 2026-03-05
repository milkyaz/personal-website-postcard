<script setup lang="ts">
import Hero from "@/components/Hero.vue";
import LoveReasons from "@/components/LoveReasons.vue";
import Gallery from "@/components/Gallery.vue";
import Timeline from "@/components/Timeline.vue";
import FinalLetter from "@/components/FinalLetter.vue";


</script>

<template>
  <div data-theme="march" class="min-h-screen text-base-content relative overflow-hidden app-bg">
    <!-- виньетка (затемнение краёв) -->
    <div class="pointer-events-none fixed inset-0
             bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />


    <main class="relative">
      <Hero />
      <section id="content">
        <LoveReasons />
        <Gallery />
        <Timeline />
        <FinalLetter />
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
