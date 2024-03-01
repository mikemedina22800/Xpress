export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  photo: URL;
  file: File[];
};

export type INewPost = {
  name: string;
  username: string;
  text: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  loggedIn: boolean,
  email: string, 
  name: string, 
  id: string, 
  username: string, 
  photo: string, 
  bio: string, 
  posts: string, 
  liked: string
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};