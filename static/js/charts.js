const universeId = "8263709207"; // id du jeu Roblox

fetch(`/stats/${universeId}`)
  .then(res => res.json())
  .then(data => {
    console.log("Réponse API :", data); // Debug

    // Vérification si l'API renvoie bien les stats
    if (data && !data.error && data.name) {
      document.getElementById("game-name").textContent = data.name || "Nom indisponible";
      document.getElementById("visits").textContent = data.visits?.toLocaleString() || "0";
      document.getElementById("favorites").textContent = data.favorites?.toLocaleString() || "0";
      document.getElementById("players").textContent = data.players?.toLocaleString() || "0";

      // Exemple graphique (visits vs favorites)
      const ctx = document.getElementById("statsChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Visites", "Favoris", "Joueurs en ligne"],
          datasets: [{
            label: "Statistiques du jeu",
            data: [data.visits, data.favorites, data.players],
            backgroundColor: ["#4F46E5", "#06B6D4", "#22C55E"],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#333",
                font: { size: 14 }
              }
            }
          },
          animation: {
            duration: 1200,
            easing: "easeOutBounce"
          }
        }
      });
    } else {
      // Si pas de data correcte
      document.getElementById("game-name").textContent = "❌ Impossible de charger les stats.";
      console.warn("Pas de données valides :", data);
    }
  })
  .catch(err => {
    console.error("Erreur de récupération :", err);
    document.getElementById("game-name").textContent = "⚠️ Erreur de chargement des stats.";
  });
