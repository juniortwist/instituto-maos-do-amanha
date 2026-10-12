import { saveForm } from './storage.js';
import { toast } from './ui.js';

function validate(form) {
  let firstInvalid = null;
  const fields = [...form.querySelectorAll('input,select,textarea')];
  for (const input of fields) {
    const error = document.getElementById(`${input.id}-error`);
    const invalid = !input.checkValidity();
    input.classList.toggle('invalid', invalid);
    if (invalid) input.setAttribute('aria-invalid','true'); else input.removeAttribute('aria-invalid');
    if (error) {
      if (invalid) {
        const v = input.validity;
        error.textContent = v.valueMissing ? 'Este campo é obrigatório.' : v.typeMismatch ? 'Informe um e-mail válido.' : v.tooShort ? `Digite pelo menos ${input.minLength} caracteres.` : 'Verifique o valor informado.';
      } else error.textContent = '';
    }
    if (invalid && !firstInvalid) firstInvalid = input;
  }
  firstInvalid?.focus();
  return !firstInvalid;
}
function clearError(input) {
  if (input.checkValidity()) {
    input.classList.remove('invalid'); input.removeAttribute('aria-invalid');
    const error = document.getElementById(`${input.id}-error`);
    if (error) error.textContent = '';
  }
}
export function initForms() {
  document.addEventListener('input', event => {
    if (event.target.closest('form')) clearError(event.target);
  });
  document.addEventListener('change', event => {
    if (event.target.closest('form')) clearError(event.target);
  });
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!['volunteer-form','contact-form'].includes(form.id)) return;
    event.preventDefault();
    if (!validate(form)) { toast('Confira os campos destacados no formulário.'); return; }
    const data = Object.fromEntries(new FormData(form));
    const kind = form.id === 'volunteer-form' ? 'voluntarios' : 'mensagens';
    const ok = saveForm(kind, data);
    const feedback = document.getElementById(kind === 'voluntarios' ? 'volunteer-feedback' : 'contact-feedback');
    if (ok) {
      feedback.textContent = 'Registro salvo neste navegador. Nenhuma informação foi enviada à ONG.';
      form.reset();
      toast('Registro salvo com sucesso neste navegador.');
    } else {
      feedback.textContent = 'Não foi possível salvar. Verifique as permissões de armazenamento do navegador.';
      toast('Falha ao salvar os dados localmente.');
    }
  });
}
