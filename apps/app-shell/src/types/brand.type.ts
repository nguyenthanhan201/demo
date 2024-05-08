export interface Brand {
  _id: string;
  name: string;
  logo: string;
  createdByUserId: string;
  createdAt: string;
  design?: string;
  preview?: string;
}

export interface ICreateBrandResponse {
  name: string;
  createdByUserId: string;
  logo: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
