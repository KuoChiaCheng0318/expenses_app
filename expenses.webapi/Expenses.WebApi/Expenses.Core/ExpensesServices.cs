using Expenses.DB;
using System.Collections.Generic;
using System.Linq;

namespace Expenses.Core
{
    public class ExpensesServices : IExpensesServices
    {
        private AppDbContext _context;
        public ExpensesServices(AppDbContext context)
        {
            _context = context;
        }

        public Expense CreateExpense(Expense expense)
        {
            _context.Add(expense);
            _context.SaveChanges();

            return expense;

        }

        public Expense GetExpense(int id)
        {
            return _context.Expenses.First(e => e.Id == id);
        }

        public List<Expense> GetExpenses() 
        { 
            return _context.Expenses.ToList();
        }
    }
}
