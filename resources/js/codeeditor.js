import {basicSetup, EditorView} from "codemirror"
import {javascript} from "@codemirror/lang-javascript";
import {css} from "@codemirror/lang-css";
import {html} from "@codemirror/lang-html";
import {oneDark} from "@codemirror/theme-one-dark";
import {abbreviationTracker} from "@emmetio/codemirror6-plugin";
import {twig} from "@ssddanbrown/codemirror-lang-twig";
import {json} from "@codemirror/lang-json";
import {xml} from "@codemirror/lang-xml";

window.Hynek ??= {}

const languages = {
    javascript: javascript(),
    css: css(),
    html: html({
        extensions: [twig(), javascript(), css()]
    }),
    twig: twig(),
    json: json(),
    xml: xml()
};

/**
 *
 * @param {HTMLElement} el
 * @param {{content: string, lang: string, autofocus?: boolean}} options
 * @constructor
 */
window.Hynek.CodeEditor = function(el, options = {}) {
    return new EditorView({
        doc: options.content ?? '',
        parent: el,
        autofocus: options.autofocus ?? false,
        extensions: [
            basicSetup,
            oneDark,
            languages[lang],
            abbreviationTracker(),
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    el.parentElement.querySelector('> input[data-editor-content]').value = update.state.doc.toString();
                }
            }),
        ]
    })
}
