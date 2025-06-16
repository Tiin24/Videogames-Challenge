// stores/useGamesStore.js
import { defineStore } from "pinia";
import { getGames, getPopularGames } from "@/services/gameServices";
import { toast } from 'vue-sonner'

export const useGamesStore = defineStore("games", {
  state: () => ({
    games: [],
    popularGames: [],
    page: 1,
    loading: false,
    hasMore: true,
    error: null,
  }),
  actions: {
    async fetchGames() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;
      try {
        const data = await getGames(this.page);
        if (data.results.length === 0) {
          this.hasMore = false;
        } else {
          this.games.push(...data.results);
          this.page++;
        }
      } catch (err) {
        toast.error('Error al cargar los juegos.')
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async fetchPopularGames() {
      try {
        const data = await getPopularGames();
        this.popularGames = data.results;
      } catch (err) {
        toast.error('Error al cargar juegos populares.')
        this.error = err;
      }
    },
    resetGames() {
      this.games = [];
      this.page = 1;
      this.hasMore = true;
    },
  },
});
