class FormStatus {
    constructor(form) {
        this.form = form
        this.fields = {}
        this.submitting = false
        this.submitted = false
        this.listeners = {}

        this.init()
    }

    // === Event system ===
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(callback)
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data))
        }
    }

    // === Setup ===
    init() {
        const inputs = this.form.querySelectorAll("input, textarea, select")

        inputs.forEach(input => {
            this.fields[input.name] = {
                el: input,
                touched: false,
                dirty: false,
                valid: input.checkValidity(),
                initialValue: input.value,
            }

            // touched
            input.addEventListener("blur", () => {
                const field = this.fields[input.name]
                if (!field.touched) {
                    field.touched = true
                    this.emit("field:touched", { name: input.name, field })
                }
            })

            // dirty + valid
            input.addEventListener("input", () => {
                const field = this.fields[input.name]
                const wasDirty = field.dirty
                const wasValid = field.valid

                field.dirty = input.value !== field.initialValue
                field.valid = input.checkValidity()

                if (field.dirty && !wasDirty) {
                    this.emit("field:dirty", { name: input.name, field })
                }
                if (field.valid !== wasValid) {
                    this.emit("field:validate", { name: input.name, field })
                }
            })
        })

        // submitting
        this.form.addEventListener("submit", e => {
            this.submitting = true
            this.emit("form:submit:start", this.status)

            Object.values(this.fields).forEach(field => {
                field.touched = true
                field.valid = field.el.checkValidity()
            })

            if (!this.form.checkValidity()) {
                e.preventDefault()
                this.submitting = false
                this.emit("form:submit:invalid", this.status)
            } else {
                this.submitted = true
                this.emit("form:submit:success", this.status)

                // Exempel: sätt submitting=false efter en timeout
                // (kan bytas ut mot AJAX/async-hantering)
                setTimeout(() => {
                    this.submitting = false
                    this.emit("form:submit:end", this.status)
                }, 500)
            }
        })
    }

    // === Public API ===
    get status() {
        return {
            submitting: this.submitting,
            submitted: this.submitted,
            valid: this.form.checkValidity(),
            invalid: !this.form.checkValidity(),
            fields: this.fields,
        }
    }
}

export default FormStatus
