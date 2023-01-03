export const queryDailyNewWallet = (time) => `
with
  data_grouped as (
    select
      tx_sender,
      min(date_trunc('${time}', block_timestamp::date)) as date
    from
      terra.core.fact_transactions
    group by
      1
  )
select
  date,
  count(*) as total
from
  data_grouped
group by
  1
order by
  1
`;

export const queryCumulativeWallets = `
with
  data_grouped as (
    select
      tx_sender,
      min(date_trunc('day', block_timestamp::date)) as date
    from
      terra.core.fact_transactions
    group by
      1
  )
select
  date,
  sum(count(*)) over (order by date) as total
from
  data_grouped
group by
  1
order by
  1
`;

export const queryAllWallets = `
select
  count(distinct tx_sender) as total
from
  terra.core.fact_transactions
`;

export const queryNewWallet = `
with
  data_grouped as (
    select
      tx_sender,
      min(date_trunc('day', block_timestamp::date)) as date
    from
      terra.core.fact_transactions
    group by
      1
  ),
  data_now as (
    select
      'asd' as label,
      count(*) as total
    from
      data_grouped
    where
      date >= CURRENT_DATE - 7
  ),
  data_prev as (
    select
      'asd' as label,
      count(*) as total
    from
      data_grouped
    where
      date < CURRENT_DATE - 7
      and date >= CURRENT_DATE - 14
  )
select
  a.total,
  ((a.total - b.total) / b.total) * 100 as percentage
from
  data_now a
  join data_prev b on a.label = b.label
`;

export const queryActiveWallet = `
with
  data_now as (
    select
      'active' as label,
      count(distinct tx_sender) as total
    from
      terra.core.fact_transactions
    where
      block_timestamp::date >= CURRENT_DATE - 7
  ),
  data_prev as (
    select
      'active' as label,
      count(distinct tx_sender) as total
    from
      terra.core.fact_transactions
    where
      block_timestamp::date < CURRENT_DATE - 7
      and block_timestamp::date >= CURRENT_DATE - 14
  )
select
  a.total,
  ((a.total - b.total) / b.total) * 100 as percentage
from
  data_now a
  join data_prev b on a.label = b.label
`;

export const queryDailyActiveWallets = (time) => `
select
  date_trunc('${time}', block_timestamp::date) as date,
  count(distinct tx_sender) as total
from
  terra.core.fact_transactions
group by
  1
order by
  1
`