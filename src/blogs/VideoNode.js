import { Node, mergeAttributes } from "@tiptap/core";

export const VideoNode = Node.create({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  addAttributes() {
    return {
      src: { default: "" },
      title: { default: "" },
      mimeType: { default: "" },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-blog-video]", getAttrs: (element) => ({ src: element.getAttribute("data-src"), title: element.getAttribute("data-title") || "", mimeType: element.getAttribute("data-mime") || "" }) }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-blog-video": "", "data-src": HTMLAttributes.src, "data-title": HTMLAttributes.title, "data-mime": HTMLAttributes.mimeType })];
  },
  addCommands() {
    return {
      setVideo: (attributes) => ({ commands }) => commands.insertContent({ type: this.name, attrs: attributes }),
    };
  },
});
