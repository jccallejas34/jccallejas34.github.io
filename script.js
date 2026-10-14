const GITHUB_USER = "jccallejas34";

document.getElementById("year").textContent = new Date().getFullYear();

// Carga los repositorios públicos desde la API de GitHub y los muestra como tarjetas
async function loadRepos() {
  const container = document.getElementById("repos");
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error(res.status);
    const repos = (await res.json()).filter((r) => !r.fork);

    if (repos.length === 0) {
      container.innerHTML = '<p class="muted">Aún no hay proyectos públicos.</p>';
      return;
    }

    container.innerHTML = "";
    for (const repo of repos) {
      const card = document.createElement("a");
      card.className = "card";
      card.href = repo.homepage || repo.html_url;
      card.target = "_blank";
      card.rel = "noopener";

      const title = document.createElement("h3");
      title.textContent = repo.name;

      const desc = document.createElement("p");
      desc.textContent = repo.description || "Sin descripción todavía.";

      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = [repo.language, `★ ${repo.stargazers_count}`].filter(Boolean).join(" · ");

      card.append(title, desc, meta);
      container.append(card);
    }
  } catch (err) {
    container.innerHTML = `<p class="muted">No se pudieron cargar los proyectos. <a href="https://github.com/${GITHUB_USER}?tab=repositories">Verlos en GitHub</a>.</p>`;
  }
}

loadRepos();
