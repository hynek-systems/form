class h {
  constructor(s) {
    this.form = s, this.fields = {}, this.submitting = !1, this.submitted = !1, this.listeners = {}, this.init();
  }
  // === Event system ===
  on(s, t) {
    this.listeners[s] || (this.listeners[s] = []), this.listeners[s].push(t);
  }
  emit(s, t) {
    this.listeners[s] && this.listeners[s].forEach((i) => i(t));
  }
  // === Setup ===
  init() {
    this.form.querySelectorAll("input, textarea, select").forEach((t) => {
      this.fields[t.name] = {
        el: t,
        touched: !1,
        dirty: !1,
        valid: t.checkValidity(),
        initialValue: t.value
      }, t.addEventListener("blur", () => {
        const i = this.fields[t.name];
        i.touched || (i.touched = !0, this.emit("field:touched", { name: t.name, field: i }));
      }), t.addEventListener("input", () => {
        const i = this.fields[t.name], e = i.dirty, a = i.valid;
        i.dirty = t.value !== i.initialValue, i.valid = t.checkValidity(), i.dirty && !e && this.emit("field:dirty", { name: t.name, field: i }), i.valid !== a && this.emit("field:validate", { name: t.name, field: i });
      });
    }), this.form.addEventListener("submit", (t) => {
      this.submitting = !0, this.emit("form:submit:start", this.status), Object.values(this.fields).forEach((i) => {
        i.touched = !0, i.valid = i.el.checkValidity();
      }), this.form.checkValidity() ? (this.submitted = !0, this.emit("form:submit:success", this.status), setTimeout(() => {
        this.submitting = !1, this.emit("form:submit:end", this.status);
      }, 500)) : (t.preventDefault(), this.submitting = !1, this.emit("form:submit:invalid", this.status));
    });
  }
  // === Public API ===
  get status() {
    return {
      submitting: this.submitting,
      submitted: this.submitted,
      valid: this.form.checkValidity(),
      invalid: !this.form.checkValidity(),
      fields: this.fields
    };
  }
}
class m {
  constructor(s, t = {}) {
    this.form = s, this.options = t, this.formState = new h(s), this.init();
  }
  // === Setup ===
  init() {
    this.form.addEventListener("submit", async (s) => {
      s.preventDefault(), await this.submit();
    });
  }
  async submit() {
    const s = new FormData(), t = this.form.querySelectorAll("input, textarea, select");
    this.formState.emit("form:submit:start", { formData: s, inputs: t }), t.forEach((a) => {
      s.append(a.name, a.value);
    });
    const i = await fetch(this.form.action, {
      method: this.form.method.toUpperCase(),
      body: s
    });
    if (!i.ok)
      throw new Error(i.error);
    const e = i.json();
    this.options.handleResponse?.(e), this.formState.emit("form:submit:end", e);
  }
}
export {
  m as AjaxSubmission,
  h as Formstatus
};
