type TModel = {
  id: string;
  object: string;
  owned_by: string;
  parent?: null;
  permission: TPermission[];
  root: string;
  created: number;
};

type TPermission = {
  allow_create_engine: boolean;
  allow_fine_tuning: boolean;
  allow_logprobs: boolean;
  allow_searh_indices: boolean;
  allow_view: boolean;
  created: number;
  group?: null;
  is_blocking: boolean;
  object: string;
  organization: string;
};

type TOutput = {
  guest: {
    messages: any[];
  };
  openAI: {
    messages: any[];
  };
};

export type { TModel, TOutput };
