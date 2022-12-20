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

export const queryDailyContract = (time) => `
with
  data_contract as (
    select
      date_trunc('${time}', block_timestamp::date) as date,
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

export const queryCumulativeContract = (time) => `
with
  data_contract as (
    select
      date_trunc('${time}', block_timestamp::date) as date,
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
  sum(total) over (
    order by
      date asc
  ) as cumulative
from
  (
    select
      date,
      count(contract_address) as total
    from
      data_contract
    group by
      1
  )
  order by 1 asc
`

export const queryTopCreatorContract = `
with
  data_contract as (
    select
      block_timestamp::date as date,
      try_parse_json(msg):attributes[2]:value as address
    from
      terra.core.fact_msgs
    where
      -- tx_id = 'A20681626156DFADE7AA6FDB906E0A58964D21ED9AE7226252A219FFBE67DD3D'
      msg_type = 'message'
      and try_parse_json(msg):attributes[0]:key = 'action'
      and try_parse_json(msg):attributes[0]:value = '/cosmwasm.wasm.v1.MsgInstantiateContract'
  )
select
  address,
  count(*) as total
from
  data_contract
group by
  1
order by
  2 desc
limit
  10
`

export const queryTrendinContract = `
with
  data_contract as (
    select
      block_timestamp::date as date,
      try_parse_json(msg):attributes[0]:value as contract_address
    from
      terra.core.fact_msgs
    where
      msg_type = 'execute'
      and try_parse_json(msg):attributes[0]:key = '_contract_address'
      and block_timestamp::date >= CURRENT_DATE - 7
  ),
  data_trending_contract as (
    select
      contract_address,
      count(*) as total
    from
      data_contract
    group by
      1
    order by
      2 desc
    limit
      10
  )
select
  a.contract_address,
  case
    when b.label is null then 'unknown'
    else b.label
  end as label,
  a.total
from
  data_trending_contract a
  left join terra.core.dim_address_labels b on a.contract_address = b.address
order by
  3 desc
`