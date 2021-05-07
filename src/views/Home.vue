<template>
  <div class="home container mt-4">
    <invoice />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    invoice: () => import("@/components/invoice/Index.vue"),
  },
};
</script>
