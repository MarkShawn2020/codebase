import { SEPARATOR_BOX, SEPARATOR_LINE } from "@cs-magic/common/const";
import { CommandStyle } from "../schema/bot.preference";
/**
 * 可用于微信的回复
 *
 */
export const formatQuery = (content, options) => {
    const lines = [];
    if (options?.commandStyle === CommandStyle.standard && options?.title)
        lines.push("  " + options.title);
    lines.push(content);
    if (options?.tips)
        lines.push(["TIPS: ", options.tips].join("\n"));
    if (options?.commandStyle === CommandStyle.standard && options?.footer)
        lines.push("  " + options.footer);
    let s = lines.join(`\n${SEPARATOR_LINE}\n`);
    if (options?.commandStyle === CommandStyle.standard)
        s = [SEPARATOR_BOX, s, SEPARATOR_BOX].join("\n");
    return s;
};
