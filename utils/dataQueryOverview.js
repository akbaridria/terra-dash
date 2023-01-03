export const queryTotalTransactions = `
  select
  count(distinct tx_id) as total
  from
  terra.core.fact_transactions
`;

export const queryRateSuccess = `
select
  (
    sum(
      case
        when tx_succeeded = true then 1
        else 0
      end
    ) / count(*)
  ) * 100 as rate
from
  terra.core.fact_transactions
`;

export const queryAverageFee = `
select
  avg(tx:auth_info:fee:amount[0]:amount / 1e6) as fee
from
  terra.core.fact_transactions
`;

export const queryBlockTime = `
select
  avg(dd) as avdd
from
  (
    select
      timestampdiff(
        'second',
        lag(block_timestamp) over (
          order by
            block_id
        ),
        block_timestamp
      ) as dd
    from
      terra.core.fact_blocks
  )
`;

export const queryDailyTx = (time) => `
select
  date_trunc('${time}', block_timestamp::date) as date,
  count(*) as total
from
  terra.core.fact_transactions
group by
  1
order by
  1
`;

export const queryCumulativeTx = `
with
  data_all as (
    select
      date_trunc('day', block_timestamp::date) as date,
      count(*) as total
    from
      terra.core.fact_transactions
    group by
      1
    order by
      1
  )
select
  date,
  sum(total) over (
    order by
      date
  ) as total
from
  data_all
order by
  1 asc
`;

export const queryDailySuccessRate = (time) => `
select
  date_trunc('${time}', block_timestamp::date) as date,
  sum(
    case
      when tx_succeeded = true then 1
      else 0
    end
  ) / count(*) as dd
from
  terra.core.fact_transactions
group by
  1
order by
  1
`;

export const queryDailyAvgFee = (time) => `
select
  date_trunc('${time}', block_timestamp::date) as date,
  avg(tx:auth_info:fee:amount[0]:amount / 1e6) as fee1
from
  terra.core.fact_transactions
group by
  1
order by
  1
`;

export const queryDailyBlockTime = (time) => `
select
  date,
  avg(dd) as avdd
from
  (
    select
      date_trunc('${time}', block_timestamp::date) as date,
      timestampdiff(
        'second',
        lag(block_timestamp) over (
          order by
            block_id
        ),
        block_timestamp
      ) as dd
    from
      terra.core.fact_blocks
  ) ee
group by
  1
order by
  1
`;
