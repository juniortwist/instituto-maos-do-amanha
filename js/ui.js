import { getStored, setStored, clearFormData } from './storage.js';
import { projects } from './data.js';
import { projectCard } from './templates.js';
const themes = new Set(['light','dark','contrast']);
export function setTheme(theme) {
  const value = themes.has(theme) ? theme : 'light';
  document.documentElement.dataset.theme = value;
  document.querySelectorAll('input[name="appearance"]').forEach(el => { el.checked = el.value === value; });
  setStored('theme', value);
}
export function restoreTheme() { setTheme(getStored('theme','light')); }
export function toast(message) {
  const region = document.getElementById('toast-region');
  region.textContent = message;
  region.classList.add('visible');
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => region.classList.remove('visible'), 5000);
}
export function initUi() {
  document.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'menu') {
      const nav = document.getElementById('nav-principal');
      const open = nav.classList.toggle('open');
      const button = document.querySelector('[data-action="menu"]');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    if (action === 'preferences') {
      const dialog = document.getElementById('preferences-dialog');
      document.querySelector(`input[name="appearance"][value="${document.documentElement.dataset.theme}"]`).checked = true;
      dialog.showModal();
    }
    if (action === 'close-preferences') document.getElementById('preferences-dialog').close();
    if (action === 'clear-data') {
      if (window.confirm('Apagar os dados dos formulários salvos neste navegador?')) {
        toast(clearFormData() ? 'Dados dos formulários apagados neste navegador.' : 'Não foi possível apagar os dados.');
      }
    }
    const chip = event.target.closest('[data-filter]');
    if (chip) {
      const filter = chip.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(el => { const selected = el === chip; el.classList.toggle('active', selected); el.setAttribute('aria-pressed', String(selected)); });
      const selected = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);
      document.getElementById('projects-grid').innerHTML = selected.map(projectCard).join('');
      document.getElementById('project-count').textContent = `${selected.length} ${selected.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}`;
    }
  });
  document.addEventListener('change', event => {
    if (event.target.matches('input[name="appearance"]')) setTheme(event.target.value);
  });
  document.getElementById('preferences-dialog').addEventListener('click', event => {
    if (event.target.id === 'preferences-dialog') event.target.close();
  });
  restoreTheme();
}
