import _ from "lodash";

export const svgString2svgBlob = (svgString: string) =>
  new Blob([svgString], { type: "image/svg+xml" });

export function svgBlob2pngBlob(svgBlob: Blob, ppi = 320): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const scale = ppi / 72; // Default PPI for SVG is 72
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      console.log({
        image: _.pick(img, ["width", "height"]),
        canvas: _.pick(img, ["height", "width"]),
        scale: scale,
      });

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        resolve(blob!);
      }, "image/png");
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}
