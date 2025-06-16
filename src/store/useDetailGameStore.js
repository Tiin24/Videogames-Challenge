import { defineStore } from "pinia";
import { ref } from "vue";
import { getGameDetail, getGameScreenshots } from "@/services/gameServices";
import { toast } from 'vue-sonner'

export const useDetailGameStore = defineStore("game", () => {
  const game = ref(null);
  const screenshots = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchGameDetail(id) {
    loading.value = true;
    error.value = null;
    try {
      const detail = await getGameDetail(id);
      const shots = await getGameScreenshots(id);
      game.value = detail;
      screenshots.value = shots;
    } catch (err) {
      error.value = "Error al cargar el juego";
      toast.error('Error al cargar el juego.')
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function clear() {
    game.value = null;
    screenshots.value = [];
    error.value = null;
    loading.value = false;
  }

  return {
    game,
    screenshots,
    loading,
    error,
    fetchGameDetail,
    clear,
  };
});
