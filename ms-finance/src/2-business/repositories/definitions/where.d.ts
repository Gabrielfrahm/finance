type IWhere<c extends string, v> = {
  [key in c]: v;
};

export { IWhere };
