using backend.Models;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class BillService
{
    private readonly ApplicationContext _context;

    public BillService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Bill> AddBillAsync(AddBillDto dto, Guid userId)
    {
        var bill = new Bill
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            BillingMonth = dto.BillingMonth,
            DueDate = dto.DueDate,
            GenerationAmount = dto.GenerationAmount,
            TransmissionAmount = dto.TransmissionAmount,
            DistributionAmount = dto.DistributionAmount,
            GovernmentTaxAmount = dto.GovernmentTaxAmount,
            EnergyKwh = dto.EnergyKwh,
            TotalAmount = dto.TotalAmount,
            Status = dto.Status
        };

        await _context.Bills.AddAsync(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<List<Bill>> GetUserBillsAsync(Guid userId)
    {
        return await _context.Bills
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.BillingMonth)
            .ToListAsync();
    }
}