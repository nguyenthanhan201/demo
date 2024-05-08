export type DesignerProps = {
  design: string;
  handleUpdateDataBrand: (design: string, preview: never[]) => Promise<void>;
  brandId: string | undefined;
};

export type PreviewProps = {
  initPreview: string;
};
