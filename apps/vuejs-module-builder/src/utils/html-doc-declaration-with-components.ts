// eslint-disable-next-line
// @ts-nocheck
import tailwindCSS from '../style.css?inline';

const fullHTMLContent = function (HTML: any) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${tailwindCSS}</style></head><body>${HTML}</body></html>`;
};

export default fullHTMLContent;
