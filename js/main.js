import { shell } from './templates.js';
import { renderRoute } from './router.js';
import { initUi } from './ui.js';
import { initForms } from './forms.js';

document.getElementById('app').innerHTML = shell();
initUi();
initForms();
window.addEventListener('hashchange', renderRoute);
renderRoute();
