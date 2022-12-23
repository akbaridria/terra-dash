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

export const queryDailySupplyIBC = (path, denom, decimal) => `
with
  data_from as (
    select
      block_timestamp::date as date,
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'send_packet'
      and attribute_key = 'packet_data'
      and parse_json(attribute_value):denom = '${path}'
    group by
      1
  ),
  data_to as (
    select
      block_timestamp::date as date,
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'write_acknowledgement'
      and attribute_key = 'packet_data'
      and try_parse_json(attribute_value):denom = '${denom}'
    group by
      1
  ),
  data_all as (
    select
      case
        when a.date is null then b.date
        else a.date
      end as date,
      sum(
        case
          when a.amount is null then 0
          else a.amount
        end - case
          when b.amount is null then 0
          else b.amount
        end
      ) as total_supply
    from
      data_to a
      full join data_from b on a.date = b.date
    group by
      1
  )
select
  date,
  sum(total_supply) over (
    order by
      date asc
  ) as total
from
  data_all
order by
  1
`;

export const queryOutflowIBC = (path, decimal) => `
with
  data_from as (
    select
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'send_packet'
      and attribute_key = 'packet_data'
      and parse_json(attribute_value):denom = '${path}'
      and block_timestamp::date >= CURRENT_DATE - 7
  )
select
  case
    when amount is null then 0
    else amount
  end as total
from
  data_from
`;

export const queryInflowIBC = (denom, decimal) => `
with
  data_to as (
    select
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'write_acknowledgement'
      and attribute_key = 'packet_data'
      and try_parse_json(attribute_value):denom = '${denom}'
      and block_timestamp::date >= CURRENT_DATE - 7
  )
select
  case
    when amount is null then 0
    else amount
  end as total
from
  data_to
`;

export const queryDailyNetFlowIBC = (path, denom, decimal, time) => `
with
  data_from as (
    select
      date_trunc('${time}', block_timestamp::date) as date,
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'send_packet'
      and attribute_key = 'packet_data'
      and parse_json(attribute_value):denom = '${path}'
    group by
      1
  ),
  data_to as (
    select
      date_trunc('${time}', block_timestamp::date) as date,
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'write_acknowledgement'
      and attribute_key = 'packet_data'
      and try_parse_json(attribute_value):denom = '${denom}'
    group by
      1
  ),
  data_all as (
    select
      case
        when a.date is null then b.date
        else a.date
      end as date,
      sum(
        case
          when a.amount is null then 0
          else a.amount
        end - case
          when b.amount is null then 0
          else b.amount
        end
      ) as total_supply
    from
      data_to a
      full join data_from b on a.date = b.date
    group by
      1
  )
select
  *
from
  data_all
order by
  date asc
`;

export const queryCurrentSupplyIBC = (path, denom, decimal) => `
with
  data_from as (
    select
      block_timestamp::date as date,
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'send_packet'
      and attribute_key = 'packet_data'
      and parse_json(attribute_value):denom = '${path}'
    group by
      1
  ),
  data_to as (
    select
      block_timestamp::date as date,
      sum(
        to_number(try_parse_json(attribute_value):amount) / pow(10, ${decimal})
      ) as amount
    from
      terra.core.fact_msg_attributes
    where
      msg_type = 'write_acknowledgement'
      and attribute_key = 'packet_data'
      and try_parse_json(attribute_value):denom = '${denom}'
    group by
      1
  ),
  data_all as (
    select
      case
        when a.date is null then b.date
        else a.date
      end as date,
      sum(
        case
          when a.amount is null then 0
          else a.amount
        end - case
          when b.amount is null then 0
          else b.amount
        end
      ) as total_supply
    from
      data_to a
      full join data_from b on a.date = b.date
    group by
      1
  )
select
  date,
  sum(total_supply) over (
    order by
      date asc
  ) as total
from
  data_all
order by
  1 desc
limit
  1
`;