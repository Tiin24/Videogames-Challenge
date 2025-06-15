import axios from "axios";

const api = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});

// 🎮 Obtener juegos con paginación
export const getGames = async (page = 1) => {
  const { data } = await api.get("/games", {
    params: {
      page,
      page_size: 20,
    },
  });
  return data;
};

// 🌟 Obtener juegos populares (ordenados por rating)
export const getPopularGames = async () => {
  const { data } = await api.get("/games", {
    params: {
      ordering: "-rating",
      page_size: 5,
    },
  });
  return data;
};

// 📄 Obtener detalle completo de un juego por ID
export const getGameDetail = async (id) => {
  const { data } = await api.get(`/games/${id}`);
  return data;
};

// 🖼️ Obtener screenshots del juego
export const getGameScreenshots = async (id) => {
  const { data } = await api.get(`/games/${id}/screenshots`);
  return data.results;
};
