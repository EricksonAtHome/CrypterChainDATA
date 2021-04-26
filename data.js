<link rel="stylesheet" media="all" href="https://cdn.jsdelivr.net/gh/bitquery/widgets@v1.3.8/dist/assets/css/widgets.css">
<script src="https://cdn.jsdelivr.net/gh/bitquery/widgets@v1.3.8/dist/widgets.js"></script>
<div id="token_statistics"></div>
<script>
    (function(){
    widgets.init('https://graphql.bitquery.io', 'BQY8IPItkNCP0iK8BqvmhSWV1pxpFqrB', {locale: 'en', theme: 'light'});
    var query = new widgets.query(`query ($network: EthereumNetwork!,
                              $token: String!,
                              $from: ISO8601DateTime,
                              $till: ISO8601DateTime){
                          ethereum(network: $network){
                            transfers(currency: {is: $token}
                            amount: {gt: 0}
                            date: {since: $from till: $till}
                            ){

                              currency{
                                symbol
                              }

                              median: amount(calculate: median)
                              average: amount(calculate: average)

                              amount
                              count

                              days: count(uniq: dates)

                              sender_count: count(uniq: senders)
                              receiver_count: count(uniq: receivers)

                              min_date:minimum(of: date)
                              max_date:maximum(of: date)
                            }
                          }
                        }`);
    var wdts = new widgets.table('#token_statistics', query, 'ethereum.transfers', {
 "title": "Token transfer statistics",
 "renderData": function (data) {
            item = data[0];
            return !item ? [] : [
                {name: 'Transfer Count', value: item.count},

                {name: 'Uniq Senders', value: item.sender_count},
                {name: 'Uniq Receivers', value:item.receiver_count},

                {name: 'Total Amount', value: item.amount+' '+item.currency.symbol},

                {name: 'Median Transfer Amount', value: item.median+' '+item.currency.symbol},
                {name: 'Average Transfer Amount', value: item.average+' '+item.currency.symbol},


                {name: 'First transfer date', value: item.min_date},
                {name: 'Last transfer date', value: item.max_date},
                {name: 'Days token transfered', value: item.days},

            ];
        },
 "dataOptions": [
  {
   "title": "Metric",
   "type": "string-ellipsis",
   "path": "name",
   "html_class": "text-info font-weight-bold"
  },
  {
   "title": "Value",
   "type": "string-ellipsis",
   "path": "value",
   "urlCallbackName": "property_value_path"
  }
 ]
});
    query.request({"limit": 10, "offset": 0, "network": "bsc", "token": "0x84b2537ef5a872a7c67fb03c6cefc51dd4be3c68"});
    })()
</script>
