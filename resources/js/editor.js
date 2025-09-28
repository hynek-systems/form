import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import EditorjsList from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';

window.Hynek ??= {};

/**
 *
 * @param {HTMLElement} el
 * @param {object} value
 * @param {object} tools
 * @param {{autofocus: boolean, placeholder: string, readOnly: boolean}} options https://editorjs.io/configuration/
 * @return {{editor: EditorJS, handleSubmit: (function(): void), handleHtmxSubmit: (function(): void)}}
 */
window.Hynek.Editor = function(el, value, tools, options) {
    const editor = new EditorJS({
        holder: elementId,
        data: value,
        readOnly: options.readOnly ?? false,
        placeholder: options.placeholder ?? undefined,
        autofocus: options.autofocus ?? false,
        tools,
    })

    return {
        editor,

        handleSubmit: () => {
            const form = el.closest('form');
            const input = form.querySelector('input[data-editor-content]');

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const output = await editor.save();
                input.value = JSON.stringify(output);

                e.target.submit();
            })
        },

        handleHtmxSubmit: () => {
            const form = el.closest('form');
            const input = form.querySelector('input[data-editor-content]');

            document.body.addEventListener('htmx:configRequest', async (evt) => {
                if (evt.detail.elt.id !== form.id) return;

                const output = await editor.save();
                input.value = JSON.stringify(output);

                htmx.ajax(evt.detail.verb, evt.detail.path, {
                    target: evt.detail.target,
                    swap: evt.detail.swap,
                    source: evt.detail.elt,
                    values: new FormData(evt.detail.elt)
                })
            })
        },
    }
}
