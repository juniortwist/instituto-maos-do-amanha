import { home, projectsPage, volunteerPage, transparencyPage, contactPage, notFoundPage } from './templates.js';
const routes = { '/': [home, 'Início'], '/projetos': [projectsPage, 'Projetos'], '/voluntariado': [volunteerPage, 'Voluntariado'], '/transparencia': [transparencyPage, 'Transparência'], '/contato': [contactPage, 'Contato'] };
export function currentRoute() { return (location.hash.slice(1).split('?')[0] || '/').replace(/\/$/, '') || '/'; }
export function renderRoute() {
  const route = currentRoute();
  const [render, title] = routes[route] || [notFoundPage, 'Página não encontrada'];
  document.getElementById('conteudo').innerHTML = render();
  document.title = `${title} | Instituto Mãos do Amanhã`;
  document.querySelectorAll('[data-nav]').forEach(link => {
    const active = link.dataset.nav === route;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  const nav = document.getElementById('nav-principal');
  const menu = document.querySelector('[data-action="menu"]');
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu');
  window.scrollTo({top: 0, behavior: 'instant'});
  // Announce the changed view for keyboard and assistive-technology users.
  document.getElementById('conteudo').focus({preventScroll:true});
}
