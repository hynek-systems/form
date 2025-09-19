import "./formstatus.js";

window.Hynek.AjaxSubmission = class {
    constructor(form, options = {}) {
        this.form = form;
        this.options = options;
        this.formState = new Hynek.FormStatus(form)

        this.init();
    }

    // === Setup ===
    init() {
        this.form.addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
                await this.submit();
            } catch (e) {
                console.error(e.message ?? e);
            }
        });
    }

    async submit() {
        const formData = new FormData();
        const inputs = this.form.querySelectorAll("input, textarea, select");

        this.formState.emit('form:submit:start', {formData, inputs})

        inputs.forEach(input => {
            formData.append(input.name, input.value);
        });

        const response = await fetch(this.form.action, {
            method: this.form.method.toUpperCase(),
            body: formData,
        });

        if (!response.ok) {
            this.formState.emit('form:submit:error', response);
            throw new Error(response.error);
        }

        const result = response.json();
        this.options.handleResponse?.(result);
        this.formState.emit('form:submit:end', result)
    }
}
