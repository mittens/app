export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
};


export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResult;
  signIn: AuthResult;
  signOut: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  code: Scalars['String'];
};


export type MutationSignInArgs = {
  data: SignInInput;
};


export type MutationSignOutArgs = {
  data: SignOutInput;
};

export type ProfileResult = {
  __typename?: 'ProfileResult';
  id: Scalars['Int'];
  fetchedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  profile: ProfileResult;
};

export type SignInInput = {
  githubToken: Scalars['String'];
  deviceId: Scalars['String'];
  pushToken: Scalars['String'];
};

export type SignOutInput = {
  deviceId: Scalars['String'];
};
