const gameId = "8263709207"; // Universe ID

fetch(`/stats/${gameId}`)
.then(res => res.json())
.then(data => {
    const current = data.current;
    const history = data.history;

    document.getElementById("name").innerText = current.name;
    document.getElementById("playing").innerText = current.playing;
    document.getElementById("visits").innerText = current.visits;
    document.getElementById("favorites").innerText = current.favoritedCount;

    const labels = history.map(e => e.date);
    const playingData = history.map(e => e.playing);
    const visitsData = history.map(e => e.visits);
    const favoritesData = history.map(e => e.favorites);

    new Chart(document.getElementById("playersChart"), {
        type: 'line',
        data: { labels, datasets:[{label:'Joueurs actifs', data: playingData, borderColor:'rgb(75,192,192)', fill:false}] }
    });

    new Chart(document.getElementById("visitsChart"), {
        type: 'line',
        data: { labels, datasets:[{label:'Visites', data: visitsData, borderColor:'rgb(192,75,192)', fill:false}] }
    });

    new Chart(document.getElementById("favoritesChart"), {
        type: 'line',
        data: { labels, datasets:[{label:'Favoris', data: favoritesData, borderColor:'rgb(192,192,75)', fill:false}] }
    });
})
.catch(e => { console.error(e); alert("Impossible de charger les stats"); });
