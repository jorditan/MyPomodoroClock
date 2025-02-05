<template>
  <div class="mt-2">
    <p class="text-[18px]">
      {{ props.genre }}
    </p>
    <hr />

    <ul id="songs" class="flex gap-1 mt-2 flex-col w-full rounded-sm">
      <div class="containerSong flex gap-2 rounded-sm justify-between items-center p-1 px-3">
        <li>Nombre de la canción</li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#cacaca"
          class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
          />
        </svg>
      </div>
      <div class="containerSong flex gap-2 rounded-sm justify-between items-center p-1 px-3">
        <li>Nombre de la canción</li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#cacaca"
          class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
          />
        </svg>
      </div>
      <div class="containerSong flex gap-2 rounded-sm justify-between items-center p-1 px-3">
        <li>Nombre de la canción</li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#cacaca"
          class="icon icon-tabler icons-tabler-filled icon-tabler-player-play"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
          />
        </svg>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ genre: String, songs: Array });
</script>

<style lang="css" scoped>
li {
  text-shadow: none;
  color: #cacaca;
}

.containerSong:hover {
  background-color: #1a7c1a78;
}
hr {
  border-color: #1a7c1a;
}
</style>
