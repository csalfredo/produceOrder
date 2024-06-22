<!DOCTYPE html>
<html>
<head>
    <title>Produce Order</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 60%;
            margin: 20px auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h1 {
            text-align: center;
            color: #4CAF50;
        }
        ul {
            list-style-type: none;
            padding: 0;
            width: 80%;
        }
        li {
            background: #f4f4f4;
            margin: 5px 0;
            padding: 10px;
            border-radius: 4px;
            display: flex;
        }
        li:nth-child(odd) {
            background: #e9e9e9;
        }
        .item{
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .item-name {
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .item-quantity, .item-cost {
            font-style: italic;
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .quantityName{
            text-align: center;
            font-weight: bold;
            width: 25%;
            
        }
        .caseCostName{
            font-weight: bold;
            text-align: center;
            width: 40%;
          
        }
        .item-cost{
            width: 50%;
        }
        .name{
            width: 20%;
            font-weight: bold;
            text-align: center;
        }
        .titleHeader{
            display: flex;
            justify-content: space-between;
        }
        .titleHeader {
            color: #28A2F7; /* Optional: Change text color for better contrast */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Produce Order</h1>
        <ul>
            <li class="titleHeader">
                <div class="name">NAME</div>
                <div class="quantityName">QTY</div>
                <div class="caseCostName">COST</div>
            </li>
            @foreach ($order['items'] as $item)
                <li>
                    <div class="item-name">{{ $item['name'] }}</div> 
                    <div class="item-quantity">{{ $item['quantity'] }}</div> 
                    <div class="item-cost">${{ $item['case_cost'] }}</div>
                </li>
            @endforeach
        </ul>
            <div>
    
                    <div class=""total>
                      Total:${{ $total }}
                    </div> 

            </div>
    </div>
</body>
</html>