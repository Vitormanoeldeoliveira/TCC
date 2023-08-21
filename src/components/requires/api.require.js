import { gql } from '@apollo/client';

//users requests
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

export const VALIDATE_PASSWORD = gql `
  query ChangePassword($filters: UserFilterInput!) {
    changePassword(filters: $filters) {
      id
      nome
      senha
      avatar
      email
    }
  }
`

export const UPDATE_TOKEN = gql `
  query UpdateLogin($filters: UserFilterInput!) {
    updateLogin(filters: $filters) {
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

export const UPDATE_USER = gql `
  mutation UpdateUser($user: UserUpdateInput!, $updateUserId: Float!) {
    updateUser(user: $user, id: $updateUserId) {
      id
      nome
      email
      senha
      avatar
    }
}
`

//plantations request
export const GET_PLANTATIONS = gql`
  query Query($filters: PlantationFilterInput!) {
    getAllPlantations(filters: $filters) {
      id
      descricao
      area
      tipo
      id_usuario
      id_cidade
      id_planta
      created_at
      planta {
        id
        descricao
      }
    }
  }
`

export const GET_ONE_PLANTATION = gql`
  query Query($getOnePlantationId: Float!) {
    getOnePlantation(id: $getOnePlantationId) {
      id
      descricao
      area
      tipo
      id_usuario
      planta {
        id
        nome
      }
    }
  }
`

export const CREATE_PLANTATIONS = gql`
  mutation CreatePlantation($plantations: PlantationCreateInput!) {
    createPlantation(plantations: $plantations) {
      id
      descricao
      area
      tipo
      id_usuario
      id_planta
    }
  }
`

export const UPDATE_PLANTATIONS = gql`
  mutation UpdatePlantation($updatePlantationId: Float!, $plantations: PlantationUpdateInput!) {
    updatePlantation(id: $updatePlantationId, plantations: $plantations) {
      id
      descricao
      area
      tipo
      id_usuario
      id_cidade
      id_planta
      created_at
    }
  }
`