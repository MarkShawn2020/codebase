import { log } from '../config.js';
import { MessageType, } from '../schemas/message.js';
import { sayablePayloads, } from '../schemas/sayable.js';
const sayableMixin = (mixinBase) => {
    class SayableMixin extends mixinBase {
        constructor(...args) {
            super(...args);
            log.verbose('PuppetSayableMixin', 'constructor()');
        }
        async sayablePayload(sayableId) {
            log.verbose('PuppetMessageMixin', 'sayablePayload(%s)', sayableId);
            const payload = await this.messagePayload(sayableId);
            switch (payload.type) {
                case MessageType.Text:
                    return sayablePayloads.text(payload.text || '');
                case MessageType.Image:
                case MessageType.Attachment:
                case MessageType.Audio:
                case MessageType.Video:
                case MessageType.Emoticon: {
                    const fileBox = await this.messageFile(sayableId);
                    return sayablePayloads.attatchment(fileBox);
                }
                case MessageType.Contact: {
                    const contactId = await this.messageContact(sayableId);
                    return sayablePayloads.contact(contactId);
                }
                case MessageType.Url: {
                    const urlLinkPayload = await this.messageUrl(sayableId);
                    return sayablePayloads.url(urlLinkPayload);
                }
                case MessageType.MiniProgram: {
                    const miniProgramPayload = await this.messageMiniProgram(sayableId);
                    return sayablePayloads.miniProgram(miniProgramPayload);
                }
                case MessageType.Location: {
                    const locationPayload = await this.messageLocation(sayableId);
                    return sayablePayloads.location(locationPayload);
                }
                case MessageType.Post: {
                    const postPayload = await this.postPayload(sayableId);
                    return sayablePayloads.post(postPayload);
                }
                default:
                    log.warn('PuppetSayableMixin', 'sayablePayload() can not convert not re-sayable type: %s(%s) for %s\n%s', MessageType[payload.type], payload.type, sayableId, new Error().stack);
                    return undefined;
            }
        }
    }
    return SayableMixin;
};
export { sayableMixin };
