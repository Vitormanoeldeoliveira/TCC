import { useMutation, gql } from '@apollo/client';

//users query
export const GET_USERS = gql `
  query GetAllUsers ($filters: UserFilterInput!) {
    getAllUsers (filters: $filters){
      id
      nome
      email
      senha
    }
  }
`

export const LOGIN_USER = gql `
  query Login($filters: UserFilterInput!) {
    login(filters: $filters) {
      token
    }
  }
`

export const REAL_EMAIL = gql `
  query Query($filters: EmailValidateCreateInput!) {
    getByCode(filters: $filters) {
      id
      codigo
      valido
    }
  }
`

export const CREATEVALIDATECODE = gql `
  mutation CreateEmailValidCode($data: UserValidateEmailInput!) {
    createEmailValidCode(data: $data) {
      id
      codigo
      valido
    }
  }
`

export const UPDATE_EMAIL = gql `
  mutation Mutation($data: EmailValidateUpdateInput!, $updateEmailValidCodeId: Float!) {
    updateEmailValidCode(data: $data, id: $updateEmailValidCodeId) {
      id
      codigo
      valido
    }
  }
`

export const ADD_USER = gql`
  mutation Mutation($user: UserCreateInput!) {
    createUser(user: $user) {
      id
      nome
      email
      senha
    }
  }
`

//plantations query
export const GET_PLANTATIONS = gql`
  query Query($filters: PlantationFilterInput!) {
    getAllPlantations(filters: $filters) {
      id
      descricao
      produto
      area
      tipo
      id_usuario
      id_cidade
      id_planta
    }
  }
`