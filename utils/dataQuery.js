export const queryTotalContracts = `
  with
  data_contract as (
    select
      block_timestamp::date as date,
      try_parse_json(msg):attributes[0]:value as contract_address
    from
      terra.core.fact_msgs
    where
      -- tx_id = 'A20681626156DFADE7AA6FDB906E0A58964D21ED9AE7226252A219FFBE67DD3D'
      msg_type = 'instantiate'
      and try_parse_json(msg):attributes[0]:key = '_contract_address'
  )
  select
  count(contract_address) as total
  from
  data_contract
`;

export const queryTotalContracts7d = `
  with
  data_contract as (
    select
      block_timestamp::date as date,
      try_parse_json(msg):attributes[0]:value as contract_address
    from
      terra.core.fact_msgs
    where
      -- tx_id = 'A20681626156DFADE7AA6FDB906E0A58964D21ED9AE7226252A219FFBE67DD3D'
      msg_type = 'instantiate'
      and try_parse_json(msg):attributes[0]:key = '_contract_address'
  )
  select
  count(contract_address) as total
  from
  data_contract
  where
    date >= CURRENT_DATE - 7
`;

export const queryTotalContractsPrev7d = `
with
  data_contract as (
    select
      block_timestamp::date as date,
      try_parse_json(msg):attributes[0]:value as contract_address
    from
      terra.core.fact_msgs
    where
      -- tx_id = 'A20681626156DFADE7AA6FDB906E0A58964D21ED9AE7226252A219FFBE67DD3D'
      msg_type = 'instantiate'
      and try_parse_json(msg):attributes[0]:key = '_contract_address'
  )
select
  count(contract_address) as total
from
  data_contract
where
  date >= CURRENT_DATE - 14
  and date < CURRENT_DATE - 7
`;

export const queryTotalContractCreator = `
with
  data_creator as (
    select
      block_timestamp::date as date,
      try_parse_json(msg):attributes[2]:value as creator
    from
      terra.core.fact_msgs
    where
      -- tx_id = 'CFE2673567892E5044CA9D1855F296AB92D2FEC355C70EE77A27A06683FD3439'
      msg_type = 'message'
      and try_parse_json(msg):attributes[0]:value = '/cosmwasm.wasm.v1.MsgInstantiateContract'
  )
select
  count(distinct creator) as total
from
  data_creator
`;

export const queryDailyContract = `
with
  data_contract as (
    select
      block_timestamp::date as date,
      try_parse_json(msg):attributes[0]:value as contract_address
    from
      terra.core.fact_msgs
    where
      -- tx_id = 'A20681626156DFADE7AA6FDB906E0A58964D21ED9AE7226252A219FFBE67DD3D'
      msg_type = 'instantiate'
      and try_parse_json(msg):attributes[0]:key = '_contract_address'
  )
select
  date,
  count(contract_address) as total
from
  data_contract
group by
  1
order by 
  1
`;
