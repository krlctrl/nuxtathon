<script setup lang="ts">
// Site-wide SEO and social tags. `siteUrl` makes the OG/canonical URLs absolute
// once NUXT_PUBLIC_SITE_URL is set; without it the image falls back to a path.
const site = useRuntimeConfig().public.siteUrl || "";
const ogImage = `${site}/og.png`;
const title = "Nuxtathon - #1 Nuxt Community Hackathon";
const description =
  "Live leaderboard for the first Nuxt community hackathon. Two days, one mission: close as many open nuxt/nuxt issues as we can.";

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});

useSeoMeta({
  title,
  description,
  ogSiteName: "Nuxtathon",
  ogType: "website",
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Nuxtathon - #1 Nuxt Community Hackathon",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="#00DC82" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
