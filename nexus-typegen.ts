/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/config/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.
     */
    email<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "EmailAddress";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.
     */
    email<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "EmailAddress";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AssetAllocationInput: { // input type
    symbol: string; // String!
    total: number; // Float!
  }
  LoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  PortfolioInput: { // input type
    assetAllocation: NexusGenInputs['AssetAllocationInput'][]; // [AssetAllocationInput!]!
    buyingPower: number; // Float!
  }
  SignupInput: { // input type
    email: string; // String!
    name: string; // String!
    password: string; // String!
  }
  UserUpdateInput: { // input type
    email: NexusGenScalars['EmailAddress']; // EmailAddress!
    name: string; // String!
    password: string; // String!
  }
}

export interface NexusGenEnums {
  Role: "ADMIN" | "USER"
  TransactionType: "BUY" | "DEPOSIT" | "SELL" | "WITHDRAW"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  EmailAddress: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  Transaction: { // root type
    amount: number; // Float!
    id: string; // ID!
    timestamp: NexusGenScalars['DateTime']; // DateTime!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    userId: string; // String!
  }
  User: { // root type
    email: NexusGenScalars['EmailAddress']; // EmailAddress!
    id: string; // ID!
    name: string; // String!
    role: NexusGenEnums['Role']; // Role!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    buy: NexusGenRootTypes['Transaction'] | null; // Transaction
    deleteUser: NexusGenRootTypes['User'] | null; // User
    deposit: NexusGenRootTypes['Transaction'] | null; // Transaction
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    sell: NexusGenRootTypes['Transaction'] | null; // Transaction
    signup: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    updateUser: NexusGenRootTypes['User'] | null; // User
    withdraw: NexusGenRootTypes['Transaction'] | null; // Transaction
  }
  Query: { // field return type
    getMyUser: NexusGenRootTypes['User'] | null; // User
    getUser: NexusGenRootTypes['User'] | null; // User
    getUsers: NexusGenRootTypes['User'][]; // [User!]!
    logout: boolean | null; // Boolean
    refreshToken: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    transactions: NexusGenRootTypes['Transaction'][]; // [Transaction!]!
  }
  Transaction: { // field return type
    amount: number; // Float!
    id: string; // ID!
    timestamp: NexusGenScalars['DateTime']; // DateTime!
    type: NexusGenEnums['TransactionType']; // TransactionType!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  User: { // field return type
    email: NexusGenScalars['EmailAddress']; // EmailAddress!
    id: string; // ID!
    name: string; // String!
    role: NexusGenEnums['Role']; // Role!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    buy: 'Transaction'
    deleteUser: 'User'
    deposit: 'Transaction'
    login: 'AuthPayload'
    sell: 'Transaction'
    signup: 'AuthPayload'
    updateUser: 'User'
    withdraw: 'Transaction'
  }
  Query: { // field return type name
    getMyUser: 'User'
    getUser: 'User'
    getUsers: 'User'
    logout: 'Boolean'
    refreshToken: 'AuthPayload'
    transactions: 'Transaction'
  }
  Transaction: { // field return type name
    amount: 'Float'
    id: 'ID'
    timestamp: 'DateTime'
    type: 'TransactionType'
    user: 'User'
    userId: 'String'
  }
  User: { // field return type name
    email: 'EmailAddress'
    id: 'ID'
    name: 'String'
    role: 'Role'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    buy: { // args
      amount: number; // Float!
      symbol: string; // String!
    }
    deleteUser: { // args
      id: string; // ID!
    }
    deposit: { // args
      amount: number; // Float!
    }
    login: { // args
      data: NexusGenInputs['LoginInput']; // LoginInput!
    }
    sell: { // args
      amount: number; // Float!
      symbol: string; // String!
    }
    signup: { // args
      data: NexusGenInputs['SignupInput']; // SignupInput!
    }
    updateUser: { // args
      data: NexusGenInputs['UserUpdateInput']; // UserUpdateInput!
      id: string; // ID!
    }
    withdraw: { // args
      amount: number; // Float!
    }
  }
  Query: {
    getUser: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}