using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace project3.Models.EF
{
    public partial class OrderDetail
    {
        public int OrderDetailsId { get; set; }
        public int? OrderId { get; set; }
        public int? ProductId { get; set; }
        public decimal? OrderAmount { get; set; }
        public int? orderQty { get; set; }
        public string? orderStatus { get; set; }

        public virtual Order? Order { get; set; }
        public virtual Product? Product { get; set; }
    }
}
