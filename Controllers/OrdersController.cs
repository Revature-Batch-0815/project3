using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project3.Models.EF;
using Microsoft.AspNetCore.Authorization;
using NuGet.Protocol.Plugins;
using NuGet.Protocol;
using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace project3.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly P3_shoppingDBContext _context = new P3_shoppingDBContext();

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserOrders>>> GetOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //return await _context.Orders.Where(o => o.UserId.ToUpper() == userId.ToUpper()).ToListAsync();
            try
            {
                return await (from a in _context.Orders
                              join b in _context.AspNetUsers
                              on a.UserId equals b.Id
                              join c in _context.OrderDetails
                              on a.OrdersId equals c.OrderId
                              join d in _context.Products
                              on c.ProductId equals d.ProductId
                              where a.UserId == userId
                              select new UserOrders
                              {
                                  userId = a.UserId,
                                  orderId = a.OrdersId,
                                  orderAmount = a.OrderAmount,
                                  orderDate = a.OrderDate,
                                  productId = d.ProductId,
                                  productName = d.ProductName,
                                  productDescription = d.ProductDescription,
                                  productPrice = d.ProductPrice,
                                  orderStatus = c.orderStatus
                              }).ToListAsync();
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                return NotFound();
            }
            
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrdersId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrdersId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrdersId == id);
        }
    }
}
