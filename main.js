var form = document.getElementById("addForm");
var items = document.getElementById("items");
var totalworth=0;
form.addEventListener('submit',addItem);

items.addEventListener('click',removeItem);

function addItem(e){
        e.preventDefault();
        var SellPrice = document.getElementById("sellprice").value;
        var Product = document.getElementById("product").value;
        var worth = document.getElementById("totalworth");
       


        var myobj = {
            SellPrice : SellPrice,
            Product: Product
        };
        console.log(typeof(SellPrice));
        totalworth=totalworth+Number(SellPrice);
        worth.textContent="Rs "+totalworth;

            var li =document.createElement("li");
            li.className="list-group-item";
            li.appendChild(document.createTextNode(SellPrice +"-"+Product  ));
            axios.post("https://crudcrud.com/api/453d4f5056d849d3992751e5e7ab616c/product",myobj)
            .then((res)=>{
                li.id = res.data._id;
                console.log(li.id);
            } )
            .catch(err =>console.log(err));

            var deletebtn = document.createElement("button");
            deletebtn.className="btn btn-danger btn-sm btn-space delete";
            deletebtn.appendChild(document.createTextNode("Del"));

            li.appendChild(deletebtn);
            items.appendChild(li);
}

function showDataToScreen(data){
    var SellPrice = data.SellPrice;
    var Product = data.Product;
    var worth = document.getElementById("totalworth");
    totalworth=totalworth+Number(SellPrice);
    worth.textContent="Rs "+totalworth;

    var li =document.createElement("li");
    li.id = data._id;
    li.className="list-group-item";
    li.appendChild(document.createTextNode(SellPrice +"-"+Product  ));
    var deletebtn = document.createElement("button");
    deletebtn.className="btn btn-danger btn-sm btn-space delete";
    deletebtn.appendChild(document.createTextNode("Del"));

    li.appendChild(deletebtn);
    items.appendChild(li);
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/453d4f5056d849d3992751e5e7ab616c/product")
    .then((res)=>{
        console.log(res.data)
        for( var i=0;i<res.data.length;i++){
            showDataToScreen(res.data[i]);
        }
    
    }).catch(err=>console.log(err));


})

function removeItem(e){
    if(e.target.classList.contains("delete")){
        var li = e.target.parentElement;
        let itemList = li.firstChild.textContent.split("-");
        var worth = document.getElementById("totalworth");
        totalworth=totalworth-Number(itemList[0]);
        worth.textContent="Rs "+totalworth;

       
        axios.delete("https://crudcrud.com/api/453d4f5056d849d3992751e5e7ab616c/product/"+li.id)
        .then((res)=>{

        }).catch(err=>console.log(err));
        items.removeChild(li);
    }
    
}