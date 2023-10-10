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

export const DEL_PLANTATIONS = gql `
  mutation DeletePlantation($deletePlantationId: Float!) {
    deletePlantation(id: $deletePlantationId) {
      id
    }
  }
`

//Harvast requests

export const GET_ALL_HARVESTS = gql`
  query GetAllHarvests($filters: HarvestFilterInput!) {
    getAllHarvests(filters: $filters) {
      id
      descricao
      data_safra
      id_plantacao
      plantacao {
        id
        descricao
        area
        tipo
        cep
        cidade
        uf
        id_usuario
        id_planta
        planta {
          id
          descricao
          area
          nome
          qtd_agua
          qtd_calcario
          qtd_adubo
          qtd_insumos
          id_usuario
        }
      }
    }
  }
`

export const GET_ONE_HARVEST = gql `
  query GetOneHarvest($getOneHarvestId: Float!) {
    getOneHarvest(id: $getOneHarvestId) {
      id
      descricao
      data_safra
      id_plantacao
      plantacao {
        id
        descricao
        area
        tipo
        cidade
        uf
        cep
        id_usuario
        id_planta
        created_at
        usuario {
          id
          nome
          email
          senha
          avatar
        }
        planta {
          id
          descricao
          area
          nome
          qtd_agua
          qtd_calcario
          qtd_adubo
          qtd_insumos
          id_usuario
        }
      }
    }
  }
`

export const CREATE_HARVEST = gql`
  mutation CreateHarvest($harvest: HarvestCreateInput!) {
    createHarvest(harvest: $harvest) {
      id
      descricao
      data_safra
      id_plantacao
    }
  }
`

export const UPDATE_HARVEST = gql`
  mutation UpdateHarvest($updateHarvestId: Float!, $harvest: HarvestUpdateInput!) {
    updateHarvest(id: $updateHarvestId, harvest: $harvest) {
      id
      descricao
      data_safra
      id_plantacao
    }
  }
`

export const DEL_HARVEST = gql`
  mutation DeleteHarvest($deleteHarvestId: Float!) {
    deleteHarvest(id: $deleteHarvestId) {
      id
      descricao
    }
  }
`
//gastos
export const GET_HARVEST_EXPENSE = gql `
query GetAllHarvestExpense($filters: HarvestExpenseFilterInput!) {
  getAllHarvestExpense(filters: $filters) {
    id
    preco_adubo
    preco_insumos
    preco_calcario
    valor_inicial
    hora_trabalho
    hora_trabalhada
    id_safra
    custoSafra {
      id
      descricao
      data_safra
      id_plantacao
      plantacao {
        id
        descricao
        area
        tipo
        cep
        cidade
        uf
        id_usuario
        id_planta
        created_at
      }
    }
  }
}
`

export const CREATE_HARVEST_EXPENSE = gql `
  mutation CreateHarvestExpense($harvestExpense: HarvestExpenseCreateInput!) {
    createHarvestExpense(harvestExpense: $harvestExpense) {
      id
      preco_adubo
      preco_insumos
      preco_calcario
      valor_inicial
      id_safra
      custoSafra {
        id
        descricao
        data_safra
        id_plantacao
      }
    }
  }
`

export const UPDATE_HARVEST_EXPENSE = gql `
  mutation UpdateHarvestExpense($updateHarvestExpenseId: Float!, $harvestExpense: HarvestExpenseUpdateInput!) {
    updateHarvestExpense(id: $updateHarvestExpenseId, harvestExpense: $harvestExpense) {
      id
      preco_adubo
      preco_insumos
      preco_calcario
      valor_inicial
      hora_trabalho
      hora_trabalhada
    }
  }
`

//lucros
export const GET_PROFIT = gql `
  query GetAllProfit($filters: ProfitFilterInput!) {
    getAllProfit(filters: $filters) {
      id
      qtd_venda
      valor_venda
      periodo_venda
      id_gasto
      id_safra
      id_usuario
      lucroSafra {
        id
        descricao
        data_safra
        id_plantacao
        excluido
        plantacao {
          id
          descricao
          area
          tipo
          cep
          cidade
          uf
          id_usuario
          id_planta
          created_at
          excluido
        }
      }
      lucroGasto {
        id
        preco_adubo
        preco_insumos
        preco_calcario
        valor_inicial
        hora_trabalho
        hora_trabalhada
        id_safra
      }
    }
  }
`

export const CREATE_PROFIT = gql `
  mutation CreateProfit($profit: ProfitCreateInput!) {
    createProfit(Profit: $profit) {
      id
      qtd_venda
      valor_venda
      periodo_venda
      id_gasto
      id_safra
    }
  }
`

export const UPDATE_PROFIT = gql `
  mutation UpdateProfit($updateProfitId: Float!, $profit: ProfitUpdateInput!) {
    updateProfit(id: $updateProfitId, Profit: $profit) {
      id
      qtd_venda
      valor_venda
      periodo_venda
      id_gasto
      id_safra
    }
  }
`