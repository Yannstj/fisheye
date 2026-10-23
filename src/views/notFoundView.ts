export function renderNotFoundPage(): void {
  const main = document.querySelector("#main");
  if (!main) {
    throw new Error("Container #main introuvable");
  }
  document.title = "Fisheye - Photographe introuvable";
  main.innerHTML = notFoundContent();
}

function notFoundContent(): string {
  return /*html*/ `
  <section class="error_page" aria-labelledby="error_title">
    <p class="error_code" aria-hidden="true">404</p>
    <h1 id="error_title">Photographe introuvable</h1>
    <p class="error_message">Le photographe que vous cherchez n'existe pas.</p>
    <a href="index.html" class="error_link">Retour à l'accueil</a>
  </section>`;
}
