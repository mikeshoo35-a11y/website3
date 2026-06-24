export type DocFileNode = {
  kind: "file";
  name: string;
  path: string;
};

export type DocFolderNode = {
  kind: "folder";
  name: string;
  path: string;
  children: DocTreeNode[];
};

export type DocTreeNode = DocFileNode | DocFolderNode;

export type DocIndex = {
  tree: DocTreeNode[];
  content: Record<string, string>;
  assets: {
    svg: string[];
  };
};
