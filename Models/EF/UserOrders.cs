namespace project3.Models.EF
{
    public class UserOrders
    {
        public string? userId { get; set; }
        public int orderId { get; set; }
        public decimal orderAmount { get; set; }
        public DateTime orderDate { get; set; }
        public int productId { get; set; }
        public string? productName { get; set; }
        public string? productDescription { get; set; }
        public decimal productPrice { get; set; }
        public string? orderStatus { get; set; }
        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }

        //public List<UserOrders> GetUserOrders(string user)
        //{
        //    P3_shoppingDBContext DB = new P3_shoppingDBContext();

        //    var orders = (from a in DB.Orders
        //                  join b in DB.AspNetUsers
        //                  on a.UserId equals b.Id
        //                  join c in DB.OrderDetails
        //                  on a.OrdersId equals c.OrderId
        //                  join d in DB.Products
        //                  on c.ProductId equals d.ProductId
        //                  where b.Email == user
        //                  select new UserOrders()
        //                  {
        //                      userId = a.UserId,
        //                      orderId = a.OrdersId,
        //                      orderAmount = a.OrderAmount,
        //                      orderDate = a.OrderDate,
        //                      productId = d.ProductId,
        //                      productName = d.ProductName,
        //                      productDescription = d.ProductDescription,
        //                      productPrice = d.ProductPrice,
        //                      orderStatus = c.orderStatus
        //                  }).ToList();
        //    return orders;
        //}
    }
}
