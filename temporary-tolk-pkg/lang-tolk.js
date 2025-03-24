import { LRLanguage, foldNodeProp, foldInside, indentNodeProp, LanguageSupport } from "@codemirror/language";
import { styleTags, tags } from "@lezer/highlight"
import { parser } from "./parser-tolk.js";

const parserWithMetadata = parser.configure({
    props: [
        styleTags({
            LineComment: tags.lineComment,
            BlockComment: tags.blockComment,
            String: tags.string,
            Number: tags.number,
            TypeName: tags.typeName,
            Self: tags.self,
            Identifier: tags.variableName,
            Operator: tags.operator,
            ControlKeyword: tags.controlKeyword,
            OtherKeyword: tags.keyword,
            TypeKeyword: tags.typeName,
            ModifierKeyword: tags.modifier,
            FunctionSignature: tags.function(tags.definition(tags.variableName)),
        }),
        indentNodeProp.add({
            Block: ctx => ctx.baseIndent + ctx.unit,
        }),
    ],
});

const tolkLang = LRLanguage.define({
    parser: parserWithMetadata,
});

export function tolk() {
    return new LanguageSupport(tolkLang);
}
